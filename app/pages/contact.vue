<script setup>
// Set the page title
useSeoMeta({
  title: "Contact",
});

const alert = ref({
  show: false,
  status: "",
  message: "",
});
const name = ref("");
const email = ref("");
const phone = ref("");
const messageText = ref("");
const token = ref(null);
const turnstileRef = ref(null);
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
  return isLoading.value ? "Sending..." : "Send Message";
});

async function submitForm() {
  errorsRaw.value = [];
  isLoading.value = true;

  const formData = {
    name: name.value,
    email: email.value,
    phone: phone.value,
    message: messageText.value,
    token: token.value,
  };

  const { error } = contactValidationSchema.validate(formData, {
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
    const data = await $fetch("/api/contact", {
      method: "POST",
      body: formData,
    });

    alert.value = {
      show: true,
      status: "success",
      message: data.message,
    };
    name.value = "";
    email.value = "";
    phone.value = "";
    messageText.value = "";
  } catch (error) {
    alert.value = {
      show: true,
      status: "danger",
      message: "Please correct the errors in red on the form.",
    };
    errorsRaw.value = Array.isArray(error?.data)
      ? error?.data
      : [{ path: ["form"], message: error?.data?.message || "Unknown error" }];
  } finally {
    isLoading.value = false;
    turnstileRef.value?.reset();
  }
}
</script>

<template>
  <div class="contact-form">
    <h1>Contact Four Green Fields Farm</h1>

    <form method="post" @submit.prevent="submitForm($event)">
      <div
        v-if="alert.show"
        class="alert"
        role="alert"
        :class="'alert-' + alert.status"
      >
        {{ alert.message }}
      </div>

      <div class="form-group">
        <label for="contact-name">Name *</label>
        <input
          id="contact-name"
          v-model="name"
          type="text"
          class="form-control"
          name="name"
          :class="{ 'is-invalid': errors.name }"
          placeholder="Name"
        />
        <div v-if="errors.name" class="invalid-feedback">
          {{ errors.name }}
        </div>
      </div>

      <div class="form-group">
        <label for="contact-email">Email *</label>
        <input
          id="contact-email"
          v-model="email"
          type="email"
          class="form-control"
          name="email"
          :class="{ 'is-invalid': errors.email }"
          placeholder="Email"
        />
        <div v-if="errors.email" class="invalid-feedback">
          {{ errors.email }}
        </div>
      </div>

      <div class="form-group">
        <label for="contact-phone">Phone *</label>
        <input
          id="contact-phone"
          v-model="phone"
          type="tel"
          class="form-control"
          name="phone"
          :class="{ 'is-invalid': errors.phone }"
          placeholder="Phone"
        />
        <div v-if="errors.phone" class="invalid-feedback">
          {{ errors.phone }}
        </div>
      </div>

      <div class="form-group">
        <label for="message-text">Message *</label>
        <textarea
          id="message-text"
          v-model="messageText"
          name="message"
          class="form-control"
          rows="6"
          :class="{ 'is-invalid': errors.message }"
          placeholder="Enter Message"
        ></textarea>
        <div v-if="errors.message" class="invalid-feedback">
          {{ errors.message }}
        </div>
      </div>

      <NuxtTurnstile ref="turnstileRef" v-model="token" />

      <div class="form-group form-group-submit">
        <button
          type="submit"
          class="btn btn-submit btn-primary"
          :disabled="isLoading"
        >
          <transition name="slide-fade" mode="out-in">
            <span :key="submitText">{{ submitText }}</span>
          </transition>
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.contact-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group-submit {
  margin-top: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.form-control {
  display: block;
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  line-height: 1.5;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.form-control:focus {
  border-color: #647b97;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(100, 123, 151, 0.25);
}

.form-control.is-invalid {
  border-color: #e74c3c;
}

.invalid-feedback {
  display: block;
  width: 100%;
  margin-top: 0.25rem;
  font-size: 0.875rem;
  color: #e74c3c;
}

.btn {
  display: inline-block;
  font-weight: 400;
  line-height: 1.5;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 4px;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.btn-primary {
  color: #fff;
  background-color: #647b97;
  border-color: #647b97;
}

.btn-primary:hover:not(:disabled) {
  color: #fff;
  background-color: #5a6d87;
  border-color: #5a6d87;
}

.btn:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

.btn-submit {
  min-width: 120px;
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
