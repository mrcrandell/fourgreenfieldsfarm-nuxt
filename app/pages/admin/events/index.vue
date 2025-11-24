<script setup>
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
} from "date-fns";

// Set the page title
useSeoMeta({
  title: "Events",
});

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
const isDeleteModalOpen = ref(false);
const eventToDelete = ref(null);

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

function deleteEvent(event) {
  eventToDelete.value = event;
  isDeleteModalOpen.value = true;
}

// Handle delete modal events
function handleDeleteResult(result) {
  if (!result.error) {
    loadEvents(currentPage.value);
  }
}

// Close delete modal
function closeDeleteModal() {
  isDeleteModalOpen.value = false;
  eventToDelete.value = null;
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
      <div class="header-actions">
        <routerLink
          class="btn btn-outline-primary me-2"
          to="/admin/events/import"
          >Import Events</routerLink
        >
        <routerLink class="btn btn-primary" to="/admin/events/add"
          >Add New Event</routerLink
        >
      </div>
    </header>

    <ul class="nav nav-tabs">
      <li class="nav-item">
        <button
          class="nav-link"
          :class="{ active: view === 'month' }"
          @click="view = 'month'"
        >
          Month
        </button>
      </li>
      <li class="nav-item">
        <button
          class="nav-link"
          :class="{ active: view === 'list' }"
          @click="view = 'list'"
        >
          List
        </button>
      </li>
    </ul>
    <div v-if="view === 'month'" class="tab">
      <BaseCalMonth
        :month="currentDate"
        :is-admin="true"
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
        @today="
          router.push({
            query: {
              ...route.query,
              month: new Date().getMonth() + 1,
              year: new Date().getFullYear(),
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
              <td>
                {{
                  event.isAllDay
                    ? format(new Date(event.startsAt), "MMM d, yyyy")
                    : formatDate(event.startsAt)
                }}
              </td>
              <td>
                {{ event.isHasEndsAt ? formatDate(event.endsAt) : "--" }}
              </td>
              <td>
                <span
                  class="badge"
                  :class="event.isActive ? 'text-bg-success' : 'text-bg-danger'"
                >
                  {{ event.isActive ? "Active" : "Inactive" }}
                </span>
              </td>
              <td>
                <div class="btn-container">
                  <router-link
                    :to="`/admin/events/${event.id}`"
                    class="btn btn-sm btn-outline-primary"
                  >
                    Edit
                  </router-link>
                  <button
                    class="btn btn-sm btn-danger"
                    @click="deleteEvent(event)"
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
        class="pagination-container"
        :current-page="currentPage"
        :total-pages="totalPages"
        label="Event pagination"
        @go-to-page="changePage"
      />
    </div>

    <!-- Delete Modal -->
    <AdminDeleteModal
      :event-id="eventToDelete?.id || ''"
      :is-recurring="!!eventToDelete?.recurrenceRule"
      :is-open="isDeleteModalOpen"
      @close="closeDeleteModal"
      @deleted="handleDeleteResult"
    />
  </div>
</template>

<style lang="scss" scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: rem(32);

  .header-actions {
    display: flex;
    gap: rem(8);
  }
}

.nav-tabs {
  --nav-tabs-border-width: #{rem(1)};
  --nav-tabs-border-color: var(--primary);
  --nav-link-padding-x: 1rem;
  --nav-link-padding-y: 0.5rem;
  --nav-link-color: var(--link-color);
  --nav-link-hover-color: var(--link-hover-color);
  --nav-link-disabled-color: var(--secondary-color);
  --nav-tabs-link-active-border-color: var(--primary) var(--primary)
    var(--body-bg);
  border-bottom: var(--nav-tabs-border-width) solid var(--nav-tabs-border-color);

  display: flex;
  flex-wrap: wrap;
  padding-left: 0;
  margin-bottom: rem(32);
  list-style: none;

  .nav-link {
    margin-bottom: calc(-1 * #{rem(1)});
    border: rem(1) solid transparent;
    border-top-left-radius: rem(6);
    border-top-right-radius: rem(6);
    display: block;
    padding: rem(8) rem(16);
    text-decoration: none;
    background: 0 0;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out;

    &.active {
      color: var(--nav-tabs-link-active-color);
      background-color: var(--nav-tabs-link-active-bg);
      border-color: var(--nav-tabs-link-active-border-color);
    }
  }
}

.table .btn-container {
  display: flex;
  gap: rem(8);
}

.pagination-container {
  display: flex;
  justify-content: center;
}
</style>
