<script setup>
import { format } from "date-fns";

definePageMeta({
  layout: "admin",
  middleware: "auth",
});

const currentPage = ref(1);
const itemsPerPage = 10;
const events = ref([]);
const totalEvents = ref(0);
const showPastEvents = ref(false);

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

// Load initial data
onMounted(() => {
  loadEvents();
});
</script>

<template>
  <div class="container-fluid">
    <div class="row mb-4">
      <div class="col">
        <h2>Event Management</h2>
      </div>
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
    </div>

    <div class="row">
      <div class="col">
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
                    :class="
                      event.isActive ? 'text-bg-success' : 'text-bg-danger'
                    "
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
  </div>
</template>
