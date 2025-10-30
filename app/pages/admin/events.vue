<script setup>
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
} from "date-fns";

definePageMeta({
  layout: "admin",
  middleware: "auth",
});

const route = useRoute();
const router = useRouter();

const view = ref("month");
const currentPage = ref(1);
const itemsPerPage = 10;
const events = ref([]);
const totalEvents = ref(0);
const showPastEvents = ref(false);
const calendarEvents = ref([]);

// Handle month parameter
const currentDate = computed(() => {
  const today = new Date();
  if (route.query.month) {
    const month = parseInt(route.query.month) - 1; // Months are 0-based in JS
    const year = route.query.year || today.getFullYear();
    return new Date(year, month, 1);
  }
  return today;
});

const calendarDays = computed(() => {
  const days = [];
  const start = startOfWeek(startOfMonth(currentDate.value));
  const end = endOfWeek(endOfMonth(currentDate.value));

  const currentDateIter = start;
  while (currentDateIter <= end) {
    const formattedDate = format(currentDateIter, "EEEE, MMMM d, yyyy");
    const dayData = calendarEvents.value.find((d) => d.day === formattedDate);

    days.push({
      date: new Date(currentDateIter),
      dayOfMonth: currentDateIter.getDate(),
      events: dayData ? dayData.events : [],
      isCurrentMonth:
        currentDateIter.getMonth() === currentDate.value.getMonth(),
    });
    currentDateIter.setDate(currentDateIter.getDate() + 1);
  }

  console.log("Calendar Days with Events:", days);
  return days;
});

// Watch for view changes to update URL
watch(view, (newView) => {
  if (newView === "month" && !route.query.month) {
    // Add current month to URL when switching to month view
    const date = new Date();
    router.replace({
      query: {
        ...route.query,
        month: date.getMonth() + 1, // Add 1 to make it 1-based for URL
        year: date.getFullYear(),
      },
    });
  }
});

// Watch for showPastEvents changes to reload events
watch(showPastEvents, () => {
  currentPage.value = 1; // Reset to first page
  loadEvents();
});

// Computed property for pagination
const totalPages = computed(() => Math.ceil(totalEvents.value / itemsPerPage));

// Function to load events
async function loadEvents(page = 1) {
  try {
    const offset = (page - 1) * itemsPerPage;
    const response = await $fetch("/api/events", {
      params: {
        limit: itemsPerPage,
        offset: offset,
        showPastEvents: showPastEvents.value,
      },
    });
    events.value = response.events;
    totalEvents.value = response.total;

    console.log(totalPages.value);
  } catch (error) {
    console.error("Failed to load events:", error);
  }
}

// Handle page changes
function changePage(page) {
  currentPage.value = page;
  loadEvents(page);
}

// Format date for display
function formatDate(date) {
  return format(new Date(date), "MMM d, yyyy h:mm a");
}

// Placeholder functions for CRUD operations
function addEvent() {
  console.log("Add event clicked");
}

function editEvent(id) {
  console.log("Edit event clicked:", id);
}

function deleteEvent(id) {
  console.log("Delete event clicked:", id);
}

// Function to load events for calendar view
async function loadCalendarEvents() {
  const start = startOfWeek(startOfMonth(currentDate.value));
  const end = endOfWeek(endOfMonth(currentDate.value));

  try {
    calendarEvents.value = await $fetch("/api/events/by-day", {
      params: {
        startsAt: format(start, "yyyy-MM-dd"),
        endsAt: format(end, "yyyy-MM-dd"),
      },
    });
    console.log(toRaw(calendarDays.value));
  } catch (error) {
    console.error("Failed to load calendar events:", error);
  }
}

// Watch for currentDate changes to reload calendar events
watch(currentDate, () => {
  if (view.value === "month") {
    loadCalendarEvents();
  }
});

// Load initial data
onMounted(() => {
  loadEvents();
  if (view.value === "month") {
    loadCalendarEvents();
  }
});
</script>

<template>
  <div class="container-fluid">
    <header class="page-header">
      <h1>Event Management</h1>
    </header>
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <button class="nav-link active" @click="view = 'month'">Month</button>
      </li>
      <li class="nav-item">
        <button class="nav-link" @click="view = 'list'">List</button>
      </li>
    </ul>
    <div v-if="view === 'month'" class="tab">
      <BaseCalMonth
        :month="currentDate"
        @previous-month="
          router.push({
            query: {
              ...route.query,
              month: currentDate.getMonth(),
              year:
                currentDate.getMonth() === 0
                  ? currentDate.getFullYear() - 1
                  : currentDate.getFullYear(),
            },
          })
        "
        @next-month="
          router.push({
            query: {
              ...route.query,
              month: currentDate.getMonth() + 2,
              year:
                currentDate.getMonth() === 11
                  ? currentDate.getFullYear() + 1
                  : currentDate.getFullYear(),
            },
          })
        "
      >
        <AdminCalDate v-for="day in calendarDays" :key="day.date" :day="day" />
      </BaseCalMonth>
    </div>
    <div v-if="view === 'list'" class="tab row mb-4">
      <div class="col text-end">
        <div class="d-flex justify-content-end align-items-center gap-3">
          <div class="form-check form-switch">
            <input
              id="showPastEvents"
              v-model="showPastEvents"
              class="form-check-input"
              type="checkbox"
              role="switch"
            />
            <label class="form-check-label" for="showPastEvents">
              Show Past Events
            </label>
          </div>
          <button class="btn btn-primary" @click="addEvent">
            Add New Event
          </button>
        </div>
      </div>
      <div class="table-responsive">
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="event in events" :key="event.id">
              <td>{{ event.name }}</td>
              <td>{{ formatDate(event.startsAt) }}</td>
              <td>{{ formatDate(event.endsAt) }}</td>
              <td>
                <span
                  class="badge"
                  :class="event.isActive ? 'text-bg-success' : 'text-bg-danger'"
                >
                  {{ event.isActive ? "Active" : "Inactive" }}
                </span>
              </td>
              <td>
                <div class="btn-group" role="group">
                  <button
                    class="btn btn-sm btn-outline-primary"
                    @click="editEvent(event.id)"
                  >
                    Edit
                  </button>
                  <button
                    class="btn btn-sm btn-danger"
                    @click="deleteEvent(event.id)"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="events.length === 0">
              <td colspan="5" class="text-center">No events found</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <BasePagination
        :current-page="currentPage"
        :total-pages="totalPages"
        label="Event pagination"
        @go-to-page="changePage"
      />
    </div>
  </div>
</template>
