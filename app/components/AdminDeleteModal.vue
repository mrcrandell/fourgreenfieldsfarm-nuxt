<script setup>
import { useAuthStore } from "~/stores/auth";

const props = defineProps({
  eventId: {
    type: String,
    required: true,
  },
  isRecurring: {
    type: Boolean,
    default: false,
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close", "deleted"]);

const authStore = useAuthStore();
const router = useRouter();

const isLoading = ref(false);
const deleteScope = ref("single");

const alert = ref({
  show: false,
  status: "",
  message: "",
});

// Delete event
async function deleteEvent() {
  if (!props.eventId) return;

  emit("close");
  isLoading.value = true;

  try {
    await $fetch(`/api/events/${props.eventId}?scope=${deleteScope.value}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    });

    alert.value = {
      show: true,
      status: "success",
      message: "Event deleted successfully",
    };

    // Emit success event
    emit("deleted", {
      scope: deleteScope.value,
      message: "Event deleted successfully",
    });

    // Redirect after a brief delay to show the success message
    setTimeout(() => {
      router.push("/admin/events");
    }, 1000);
  } catch (error) {
    console.error("Delete event error:", error);

    // Emit error event
    emit("deleted", {
      scope: deleteScope.value,
      error: true,
      message: error?.data?.message || "Failed to delete event.",
    });
  } finally {
    isLoading.value = false;
  }
}

// Reset scope when modal opens
watch(
  () => props.isOpen,
  (newVal) => {
    if (newVal) {
      deleteScope.value = "single";
    }
  }
);
</script>

<template>
  <BaseModal class="delete-modal" :is-shown="isOpen" @closed="$emit('close')">
    <template #header>Confirm Delete</template>
    <div class="delete-modal-body">
      <p>
        {{
          isRecurring
            ? "This is a recurring event. What would you like to delete?"
            : "Are you sure you want to delete this event?"
        }}
      </p>

      <div v-if="isRecurring" class="form-group mb-3">
        <div class="form-check">
          <input
            id="delete-single"
            v-model="deleteScope"
            type="radio"
            class="form-check-input"
            value="single"
            name="delete-scope"
          />
          <label class="form-check-label" for="delete-single">
            This event only
          </label>
        </div>

        <div class="form-check">
          <input
            id="delete-future"
            v-model="deleteScope"
            type="radio"
            class="form-check-input"
            value="future"
            name="delete-scope"
          />
          <label class="form-check-label" for="delete-future">
            This and all future events
          </label>
        </div>

        <div class="form-check">
          <input
            id="delete-all"
            v-model="deleteScope"
            type="radio"
            class="form-check-input"
            value="all"
            name="delete-scope"
          />
          <label class="form-check-label" for="delete-all">
            All events in this series
          </label>
        </div>
      </div>

      <p class="text-muted small">This action cannot be undone.</p>

      <div class="btn-container">
        <button
          class="btn btn-danger"
          :disabled="isLoading"
          @click="deleteEvent"
        >
          {{ isLoading ? "Deleting..." : "Delete" }}
        </button>
        <button
          class="btn btn-outline-primary"
          :disabled="isLoading"
          @click="$emit('close')"
        >
          Cancel
        </button>
      </div>
    </div>
  </BaseModal>
</template>

<style lang="scss" scoped>
.delete-modal {
  .delete-modal-body {
    padding: rem(16);

    .form-group {
      margin-bottom: 1rem;

      .form-check {
        margin-bottom: 0.5rem;

        .form-check-label {
          margin-left: 0.25rem;
        }
      }
    }
  }
}

.btn-container {
  display: flex;
  justify-content: flex-end;
  gap: rem(16);
}
</style>
