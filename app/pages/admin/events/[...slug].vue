<script setup>
import { useAuthStore } from "~/stores/auth";
import { format } from "date-fns";

definePageMeta({
  layout: "admin",
  middleware: "auth",
});

const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();
const eventId = computed(() =>
  route.params.slug?.[0] === "add" ? null : route.params.slug?.[0]
);

const alert = ref({
  show: false,
  status: "",
  message: "",
});

const isLoading = ref(false);
const isDeleteModalOpen = ref(false);
const errorsRaw = ref([]);

const formData = ref({
  name: "",
  slug: "",
  description: "",
  startsAt: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
  endsAt: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
  startDate: format(new Date(), "yyyy-MM-dd"),
  startTime: format(new Date(), "HH:mm"),
  endTime: format(new Date(), "HH:mm"),
  isActive: true,
  isAllDay: false,
  isHasEndsAt: false,
  isFeatured: false,
  hauntedBy: "",
  isRecurring: false,
  recurrenceRule: "",
  recurringFrequency: "WEEKLY",
  recurrenceEnds: null,
  recurringInterval: 1,
  recurringCount: null,
  recurringEndDate: null,
  scope: "single",
});

const errors = computed(() => {
  const errors = {};
  errorsRaw.value.forEach((error) => {
    const [field] = error.path;
    errors[field] = error.message;
  });
  return errors;
});

const submitText = computed(() => {
  if (isLoading.value) return "Saving...";
  return eventId.value ? "Update Event" : "Create Event";
});

const pageTitle = computed(() =>
  eventId.value ? "Edit Event" : "Add New Event"
);

// Set the page title using the existing computed property
useSeoMeta({
  title: pageTitle,
});

async function loadEvent() {
  if (!eventId.value) return;

  try {
    isLoading.value = true;
    const event = await $fetch(`/api/events/${eventId.value}`);
    const startDate = new Date(event.startsAt);
    const endDate = new Date(event.endsAt);

    formData.value = {
      name: event.name,
      slug: event.slug,
      description: event.description || "",
      hauntedBy: event.hauntedBy || "",
      isActive: event.isActive,
      isAllDay: event.isAllDay,
      isHasEndsAt: event.isHasEndsAt,
      isFeatured: event.isFeatured,
      recurrenceRule: event.recurrenceRule || "",
      startsAt: format(startDate, "yyyy-MM-dd'T'HH:mm"),
      endsAt: format(endDate, "yyyy-MM-dd'T'HH:mm"),
      startDate: format(startDate, "yyyy-MM-dd"),
      startTime: format(startDate, "HH:mm"),
      endTime: format(endDate, "HH:mm"),
      isRecurring: !!event.recurrenceRule,
      recurringFrequency: "WEEKLY",
      recurringInterval: 1,
      recurringCount: null,
      recurringEndDate: null,
      scope: "single",
    };
    if (event.recurrenceRule) {
      formData.value.recurrenceEnds = event.recurrenceRule.includes("COUNT=")
        ? "COUNT"
        : event.recurrenceRule.includes("UNTIL=")
        ? "UNTIL"
        : null;
      // Parse recurrenceRule to populate recurring fields
      const ruleParts = event.recurrenceRule.split(";");
      ruleParts.forEach((part) => {
        const [key, value] = part.split("=");
        switch (key) {
          case "FREQ":
            formData.value.recurringFrequency = value;
            break;
          case "INTERVAL":
            formData.value.recurringInterval = parseInt(value, 10);
            break;
          case "COUNT":
            formData.value.recurringCount = parseInt(value, 10);
            break;
          case "UNTIL": {
            const untilDateStr = value.slice(0, 8); // YYYYMMDD
            const year = parseInt(untilDateStr.slice(0, 4), 10);
            const month = parseInt(untilDateStr.slice(4, 6), 10) - 1; // zero-based
            const day = parseInt(untilDateStr.slice(6, 8), 10);
            const untilDate = new Date(Date.UTC(year, month, day));
            formData.value.recurringEndDate = format(untilDate, "yyyy-MM-dd");
            break;
          }
        }
      });
    }
  } catch (error) {
    console.error("Failed to load event:", error);
    alert.value = {
      show: true,
      status: "danger",
      message: "Failed to load event details.",
    };
  } finally {
    isLoading.value = false;
  }
}

function updateSlug() {
  if (!formData.value.slug) {
    formData.value.slug = formData.value.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }
}

async function submitForm() {
  errorsRaw.value = [];
  isLoading.value = true;
  alert.value.show = false;

  try {
    // Combine date and time fields
    formData.value.startsAt = `${formData.value.startDate}T${
      formData.value.isAllDay ? "00:00" : formData.value.startTime
    }`;

    // Handle end time based on whether event has end time and is all day
    if (formData.value.isAllDay) {
      formData.value.endsAt = `${formData.value.startDate}T23:59`;
    } else if (formData.value.isHasEndsAt) {
      formData.value.endsAt = `${formData.value.startDate}T${formData.value.endTime}`;
    } else {
      formData.value.endsAt = formData.value.startsAt;
    }

    // Validate form data
    const { error } = eventValidationSchema.validate(formData.value, {
      abortEarly: false,
    });

    if (error) {
      isLoading.value = false;
      alert.value = {
        show: true,
        status: "danger",
        message: "Please correct the errors in red on the form.",
      };
      console.log(toRaw(formData.value));
      console.log(error);
      errorsRaw.value = error.details;
      return;
    }

    // Prepare data for submission - remove fields not in schema
    const submitData = {
      name: formData.value.name,
      slug: formData.value.slug,
      startsAt: formData.value.startsAt,
      endsAt: formData.value.endsAt,
      description: formData.value.description || null,
      hauntedBy: formData.value.hauntedBy || null,
      isAllDay: formData.value.isAllDay,
      isHasEndsAt: formData.value.isHasEndsAt,
      isFeatured: formData.value.isFeatured,
      isActive: formData.value.isActive,
      recurrenceRule: formData.value.recurrenceRule || null,
      ...(eventId.value && { scope: formData.value.scope }),
    };

    // Submit the form
    const endpoint = `/api/events${eventId.value ? `/${eventId.value}` : ""}`;
    const method = eventId.value ? "PUT" : "POST";

    await $fetch(endpoint, {
      method,
      body: submitData,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authStore.token}`,
      },
    });

    router.push("/admin/events");
  } catch (error) {
    console.error("Form submission error:", error);
    alert.value = {
      show: true,
      status: "danger",
      message: error?.data?.message || "Failed to save event.",
    };
  } finally {
    isLoading.value = false;
  }
}

// Handle end date radio change
function handleEndDateChange(e) {
  if (e.target.checked) {
    formData.value.recurringCount = null;

    // Set a more reasonable default end date based on frequency
    const startDate = new Date(formData.value.startDate);
    const defaultEndDate = new Date(startDate);

    switch (formData.value.recurringFrequency) {
      case "DAILY":
        defaultEndDate.setDate(defaultEndDate.getDate() + 30); // 30 days
        break;
      case "WEEKLY":
        defaultEndDate.setDate(defaultEndDate.getDate() + 7 * 8); // 8 weeks
        break;
      case "MONTHLY":
        defaultEndDate.setMonth(defaultEndDate.getMonth() + 6); // 6 months
        break;
      case "YEARLY":
        defaultEndDate.setFullYear(defaultEndDate.getFullYear() + 2); // 2 years
        break;
    }

    formData.value.recurringEndDate = defaultEndDate
      .toISOString()
      .split("T")[0];
  } else {
    formData.value.recurringEndDate = null;
  }
}

// Generate RRule string
function generateRecurrenceRule() {
  if (!formData.value.isRecurring) return "";

  let rule = `FREQ=${formData.value.recurringFrequency};INTERVAL=${formData.value.recurringInterval}`;

  if (
    formData.value.recurringCount !== null &&
    formData.value.recurringCount > 0
  ) {
    rule += `;COUNT=${formData.value.recurringCount}`;
  } else if (formData.value.recurringEndDate) {
    // Ensure the end date is after the start date plus at least one interval
    const startDate = new Date(formData.value.startDate);
    const endDate = new Date(formData.value.recurringEndDate);

    // Add validation to ensure end date makes sense for the frequency
    const minEndDate = new Date(startDate);
    switch (formData.value.recurringFrequency) {
      case "DAILY":
        minEndDate.setDate(
          minEndDate.getDate() + formData.value.recurringInterval
        );
        break;
      case "WEEKLY":
        minEndDate.setDate(
          minEndDate.getDate() + 7 * formData.value.recurringInterval
        );
        break;
      case "MONTHLY":
        minEndDate.setMonth(
          minEndDate.getMonth() + formData.value.recurringInterval
        );
        break;
      case "YEARLY":
        minEndDate.setFullYear(
          minEndDate.getFullYear() + formData.value.recurringInterval
        );
        break;
    }

    if (endDate <= minEndDate) {
      console.warn(
        "End date is too close to start date for the selected frequency. Using count instead."
      );
      rule += `;COUNT=2`; // Default to 2 occurrences
    } else {
      rule += `;UNTIL=${formData.value.recurringEndDate.replace(
        /-/g,
        ""
      )}T235959Z`;
    }
  }

  return rule;
}

// Handle delete modal events
function handleDeleteResult(result) {
  if (result.error) {
    alert.value = {
      show: true,
      status: "danger",
      message: result.message,
    };
  } else {
    alert.value = {
      show: true,
      status: "success",
      message: result.message,
    };
  }
}

// Open delete modal
function openDeleteModal() {
  isDeleteModalOpen.value = true;
}

// Close delete modal
function closeDeleteModal() {
  isDeleteModalOpen.value = false;
}

// Watch for recurring changes to update recurrenceRule
watch(
  () => ({
    isRecurring: formData.value.isRecurring,
    frequency: formData.value.recurringFrequency,
    interval: formData.value.recurringInterval,
    count: formData.value.recurringCount,
    endDate: formData.value.recurringEndDate,
  }),
  () => {
    formData.value.recurrenceRule = generateRecurrenceRule();
  },
  { deep: true }
);

// Load event data on mount if we're editing
// Update combined datetime fields when individual fields change
watch(
  () => ({
    startDate: formData.value.startDate,
    startTime: formData.value.startTime,
    endTime: formData.value.endTime,
    isAllDay: formData.value.isAllDay,
  }),
  (newVal) => {
    // Update startsAt
    formData.value.startsAt = `${newVal.startDate}T${
      newVal.isAllDay ? "00:00" : newVal.startTime
    }`;

    // Update endsAt if it has an end time
    if (formData.value.isHasEndsAt) {
      formData.value.endsAt = `${newVal.endDate}T${
        newVal.isAllDay ? "23:59" : newVal.endTime
      }`;
    }
  },
  { deep: true }
);

onMounted(() => {
  loadEvent();
});
</script>

<template>
  <div class="event-form">
    <h1>{{ pageTitle }}</h1>

    <form method="post" @submit.prevent="submitForm">
      <div
        v-if="alert.show"
        class="alert"
        role="alert"
        :class="'alert-' + alert.status"
      >
        {{ alert.message }}
      </div>

      <div class="form-group">
        <label for="event-name">Name *</label>
        <input
          id="event-name"
          v-model="formData.name"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors.name }"
          placeholder="Event Name"
          @blur="updateSlug"
        />
        <div v-if="errors.name" class="invalid-feedback">
          {{ errors.name }}
        </div>
      </div>

      <div class="form-group">
        <label for="event-slug">URL Slug *</label>
        <input
          id="event-slug"
          v-model="formData.slug"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors.slug }"
          placeholder="url-friendly-name"
        />
        <div v-if="errors.slug" class="invalid-feedback">
          {{ errors.slug }}
        </div>
      </div>

      <div class="form-group">
        <label for="event-start-date">Event Date *</label>
        <input
          id="event-start-date"
          v-model="formData.startDate"
          type="date"
          class="form-control"
          :class="{ 'is-invalid': errors.startDate }"
        />
        <div v-if="errors.startDate" class="invalid-feedback">
          {{ errors.startDate }}
        </div>
      </div>

      <div v-if="!formData.isAllDay" class="form-group">
        <label for="event-start-time">Start Time *</label>
        <input
          id="event-start-time"
          v-model="formData.startTime"
          type="time"
          class="form-control"
          :class="{ 'is-invalid': errors.startTime }"
        />
        <div v-if="errors.startTime" class="invalid-feedback">
          {{ errors.startTime }}
        </div>
      </div>

      <div v-if="!formData.isAllDay" class="form-group">
        <div class="form-check">
          <input
            id="event-has-ends-at"
            v-model="formData.isHasEndsAt"
            type="checkbox"
            class="form-check-input"
          />
          <label class="form-check-label" for="event-has-ends-at"
            >Does this event have an end time?</label
          >
        </div>
      </div>

      <div v-if="formData.isHasEndsAt && !formData.isAllDay" class="form-group">
        <label for="event-end-time">End Time *</label>
        <input
          id="event-end-time"
          v-model="formData.endTime"
          type="time"
          class="form-control"
          :class="{ 'is-invalid': errors.endTime }"
        />
        <div v-if="errors.endTime" class="invalid-feedback">
          {{ errors.endTime }}
        </div>
      </div>

      <div class="form-group">
        <div class="form-check">
          <input
            id="event-is-all-day"
            v-model="formData.isAllDay"
            type="checkbox"
            class="form-check-input"
          />
          <label class="form-check-label" for="event-is-all-day"
            >All Day Event</label
          >
        </div>
      </div>

      <div class="form-group mb-3">
        <label for="event-haunted-by">Haunted By</label>
        <input
          id="event-haunted-by"
          v-model="formData.hauntedBy"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors.hauntedBy }"
          placeholder="Haunted by..."
        />
        <div v-if="errors.hauntedBy" class="invalid-feedback">
          {{ errors.hauntedBy }}
        </div>
      </div>

      <div class="form-group">
        <label for="event-description">Description</label>
        <textarea
          id="event-description"
          v-model="formData.description"
          class="form-control"
          :class="{ 'is-invalid': errors.description }"
          rows="4"
          placeholder="Event Description"
        ></textarea>
        <div v-if="errors.description" class="invalid-feedback">
          {{ errors.description }}
        </div>
      </div>

      <div class="form-group">
        <div class="form-check mb-3">
          <input
            id="event-is-featured"
            v-model="formData.isFeatured"
            type="checkbox"
            class="form-check-input"
          />
          <label class="form-check-label" for="event-is-featured"
            >Featured Event</label
          >
        </div>
      </div>

      <div class="form-group">
        <div class="form-check mb-3">
          <input
            id="event-is-recurring"
            v-model="formData.isRecurring"
            type="checkbox"
            class="form-check-input"
          />
          <label class="form-check-label" for="event-is-recurring"
            >Recurring Event</label
          >
        </div>
      </div>

      <div
        v-if="formData.isRecurring"
        class="recurring-options border rounded p-3 mb-3"
      >
        <div class="row">
          <div class="col">
            <label for="recurring-interval">Repeat Every</label>
          </div>
          <div class="col-md-6 form-group">
            <input
              id="recurring-interval"
              v-model.number="formData.recurringInterval"
              type="number"
              min="1"
              class="form-control"
              :class="{ 'is-invalid': errors.recurringInterval }"
              placeholder="Every X days/weeks/months/years"
            />
            <div v-if="errors.recurringInterval" class="invalid-feedback">
              {{ errors.recurringInterval }}
            </div>
          </div>
          <div class="col-md-6 form-group">
            <label class="sr-only" for="recurring-frequency">Frequency *</label>
            <select
              id="recurring-frequency"
              v-model="formData.recurringFrequency"
              class="form-select"
              :class="{ 'is-invalid': errors.recurringFrequency }"
            >
              <option value="DAILY">
                Day{{ formData.recurringInterval > 1 ? "s" : "" }}
              </option>
              <option value="WEEKLY">
                Week{{ formData.recurringInterval > 1 ? "s" : "" }}
              </option>
              <option value="MONTHLY">
                Month{{ formData.recurringInterval > 1 ? "s" : "" }}
              </option>
              <option value="YEARLY">
                Year{{ formData.recurringInterval > 1 ? "s" : "" }}
              </option>
            </select>
            <div v-if="errors.recurringFrequency" class="invalid-feedback">
              {{ errors.recurringFrequency }}
            </div>
          </div>
        </div>

        <div class="form-group">
          <label>End Recurrence</label>
          <div class="form-check">
            <input
              id="end-never"
              v-model="formData.recurrenceEnds"
              type="radio"
              class="form-check-input"
              :value="null"
              name="end-recurrence"
              @change="formData.recurringEndDate = null"
            />
            <label class="form-check-label" for="end-never">Never</label>
          </div>

          <div class="form-check">
            <input
              id="end-after"
              v-model="formData.recurrenceEnds"
              type="radio"
              class="form-check-input"
              value="COUNT"
              name="end-recurrence"
              @change="
                formData.recurringEndDate = null;
                formData.recurringCount = 1;
              "
            />
            <label class="form-check-label" for="end-after">After</label>
            <div v-if="formData.recurrenceEnds === 'COUNT'" class="ms-4 mt-2">
              <input
                v-model.number="formData.recurringCount"
                type="number"
                min="1"
                class="form-control"
                :class="{ 'is-invalid': errors.recurringCount }"
              />
              <div v-if="errors.recurringCount" class="invalid-feedback">
                {{ errors.recurringCount }}
              </div>
            </div>
          </div>

          <div class="form-check">
            <input
              id="end-on-date"
              v-model="formData.recurrenceEnds"
              type="radio"
              class="form-check-input"
              name="end-recurrence"
              value="UNTIL"
              @change="handleEndDateChange"
            />
            <label class="form-check-label" for="end-on-date">On date</label>
            <div v-if="formData.recurrenceEnds === 'UNTIL'" class="ms-4 mt-2">
              <input
                v-model="formData.recurringEndDate"
                type="date"
                class="form-control"
                :class="{ 'is-invalid': errors.recurringEndDate }"
                :min="formData.startsAt.split('T')[0]"
              />
              <div v-if="errors.recurringEndDate" class="invalid-feedback">
                {{ errors.recurringEndDate }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="eventId" class="form-group">
        <label for="event-scope">Update Scope</label>
        <select
          id="event-scope"
          v-model="formData.scope"
          class="form-select"
          :class="{ 'is-invalid': errors.scope }"
        >
          <option value="single">This Event Only</option>
          <option value="future">This and Future Events</option>
          <option value="all">All Events in Series</option>
        </select>
        <div v-if="errors.scope" class="invalid-feedback">
          {{ errors.scope }}
        </div>
      </div>

      <div class="form-group">
        <div class="form-check">
          <input
            id="event-is-active"
            v-model="formData.isActive"
            type="checkbox"
            class="form-check-input"
          />
          <label class="form-check-label" for="event-is-active">{{
            formData.isActive ? "Published" : "Draft"
          }}</label>
        </div>
      </div>

      <div class="btn-container">
        <button
          v-if="eventId"
          type="button"
          class="btn btn-danger ms-2"
          :disabled="isLoading"
          @click="openDeleteModal"
        >
          Delete
        </button>
        <button
          type="submit"
          class="btn btn-submit btn-primary"
          :disabled="isLoading"
        >
          <transition name="slide-fade" mode="out-in">
            <span :key="submitText">{{ submitText }}</span>
          </transition>
        </button>
        <button
          type="button"
          class="btn btn-outline-primary"
          @click="router.push('/admin/events')"
        >
          Cancel
        </button>
      </div>
    </form>

    <AdminDeleteModal
      v-if="eventId"
      :event-id="eventId"
      :is-recurring="!!formData.recurrenceRule"
      :is-open="isDeleteModalOpen"
      @close="closeDeleteModal"
      @deleted="handleDeleteResult"
    />
  </div>
</template>

<style lang="scss" scoped>
.event-form {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.event-form form > .form-group {
  margin-bottom: 1rem;
  display: grid;
  grid-template-columns: rem(200) auto;
  grid-template-rows: auto auto; // Change from repeat(2, 1fr) to auto auto
  gap: rem(8) rem(24);

  > label {
    text-align: right;
    padding-top: $input-padding-y;
    margin-bottom: 0;
  }
  .invalid-feedback {
    grid-column: span 2 / span 2;
  }
  .form-check {
    grid-column: 2;
    grid-row: 1;
  }
}

.recurring-options {
  .row {
    display: flex;
    align-items: center;
    gap: rem(8);
    .form-group {
      margin-bottom: 0;
    }
  }
}

.btn-container {
  display: flex;
  justify-content: flex-end;
  gap: rem(16);
}

.alert {
  position: relative;
  padding: 0.75rem 1.25rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 4px;
}

.alert-success {
  color: #155724;
  background-color: #d4edda;
  border-color: #c3e6cb;
}

.alert-danger {
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from {
  transform: translateY(-10px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateY(10px);
  opacity: 0;
}
</style>
