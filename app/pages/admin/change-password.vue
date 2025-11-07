<script setup>
import { useAuthStore } from "~/stores/auth";

// Set the page title
useSeoMeta({
  title: "Change Password",
});

definePageMeta({
  layout: "admin",
  middleware: "auth",
});

const router = useRouter();
const authStore = useAuthStore();

const alert = ref({
  show: false,
  status: "",
  message: "",
});

const currentPassword = ref("");
const newPassword = ref("");
const confirmPassword = ref("");
const isLoading = ref(false);
const errorsRaw = ref([]);

const errors = computed(() => {
  const errors = {};
  errorsRaw.value.forEach((error) => {
    const [field] = error.path;
    errors[field] = error.message;
  });
  return errors;
});

const submitText = computed(() => {
  return isLoading.value ? "Changing Password..." : "Change Password";
});

async function submitForm() {
  errorsRaw.value = [];
  isLoading.value = true;
  alert.value.show = false;

  const formData = {
    currentPassword: currentPassword.value,
    newPassword: newPassword.value,
    confirmPassword: confirmPassword.value,
  };

  const { error } = changePasswordValidationSchema.validate(formData, {
    abortEarly: false,
  });

  if (error) {
    isLoading.value = false;
    alert.value = {
      show: true,
      status: "danger",
      message: "Please correct the errors in red on the form.",
    };
    errorsRaw.value = error.details;
    return;
  }

  try {
    await $fetch("/api/users/change-password", {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authStore.token}`,
      },
    });

    alert.value = {
      show: true,
      status: "success",
      message: "Password changed successfully!",
    };

    // Clear form
    currentPassword.value = "";
    newPassword.value = "";
    confirmPassword.value = "";
  } catch (error) {
    console.error("Change password error:", error);
    alert.value = {
      show: true,
      status: "danger",
      message: error?.data?.message || "Failed to change password.",
    };
    errorsRaw.value = Array.isArray(error?.data?.data)
      ? error?.data?.data
      : [
          {
            path: ["form"],
            message: error?.data?.message || "Password change failed",
          },
        ];
  } finally {
    isLoading.value = false;
  }
}

function goBack() {
  router.push("/admin");
}
</script>

<template>
  <div class="change-password-form">
    <h1>Change Password</h1>

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
        <label for="current-password">Current Password</label>
        <input
          id="current-password"
          v-model="currentPassword"
          type="password"
          class="form-control"
          name="currentPassword"
          :class="{ 'is-invalid': errors.currentPassword }"
          placeholder="Current Password"
          autocomplete="current-password"
        />
        <div v-if="errors.currentPassword" class="invalid-feedback">
          {{ errors.currentPassword }}
        </div>
      </div>

      <div class="form-group">
        <label for="new-password">New Password</label>
        <input
          id="new-password"
          v-model="newPassword"
          type="password"
          class="form-control"
          name="newPassword"
          :class="{ 'is-invalid': errors.newPassword }"
          placeholder="New Password"
          autocomplete="new-password"
        />
        <div v-if="errors.newPassword" class="invalid-feedback">
          {{ errors.newPassword }}
        </div>
      </div>

      <div class="form-group">
        <label for="confirm-password">Confirm New Password</label>
        <input
          id="confirm-password"
          v-model="confirmPassword"
          type="password"
          class="form-control"
          name="confirmPassword"
          :class="{ 'is-invalid': errors.confirmPassword }"
          placeholder="Confirm New Password"
          autocomplete="new-password"
        />
        <div v-if="errors.confirmPassword" class="invalid-feedback">
          {{ errors.confirmPassword }}
        </div>
      </div>

      <div class="btn-container">
        <button
          type="submit"
          class="btn btn-submit btn-primary"
          :disabled="isLoading"
        >
          <transition name="slide-fade" mode="out-in">
            <span :key="submitText">{{ submitText }}</span>
          </transition>
        </button>
        <button type="button" class="btn btn-outline-primary" @click="goBack">
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.change-password-form {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.change-password-form form > .form-group {
  margin-bottom: 1rem;
  display: grid;
  grid-template-columns: rem(200) auto;
  grid-template-rows: auto auto;
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

.form-group-submit {
  display: flex;
  justify-content: flex-end;
  gap: rem(16);
  margin-top: 1.5rem;
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
