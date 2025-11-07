<script setup>
import { useAuthStore } from "~/stores/auth";

// Set the page title
useSeoMeta({
  title: "Admin Login",
});

definePageMeta({
  layout: false,
});

const router = useRouter();
const authStore = useAuthStore();

const alert = ref({
  show: false,
  status: "",
  message: "",
});

const email = ref("");
const password = ref("");
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
  return isLoading.value ? "Logging in..." : "Login";
});

async function submitForm() {
  errorsRaw.value = [];
  isLoading.value = true;
  alert.value.show = false;

  const formData = {
    email: email.value,
    password: password.value,
    token: token.value,
  };

  const { error } = loginValidationSchema.validate(formData, {
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
    const data = await $fetch("/api/users/login", {
      method: "POST",
      body: formData,
    });

    if (data.token) {
      authStore.login(
        {
          id: data.id,
          email: data.email,
          name: data.name,
        },
        data.token
      );

      router.push("/admin");
    }
  } catch (error) {
    console.log(error);
    alert.value = {
      show: true,
      status: "danger",
      message: error?.data?.message || "Invalid email or password.",
    };
    errorsRaw.value = Array.isArray(error?.data)
      ? error?.data
      : [{ path: ["form"], message: error?.data?.message || "Login failed" }];
  } finally {
    isLoading.value = false;
    turnstileRef.value?.reset();
  }
}
</script>

<template>
  <div class="admin-layout">
    <div class="login-form">
      <h1>
        <span class="logo-container"><AppLogoNoWords /></span>
        <span>Admin</span>
      </h1>

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
          <label for="login-email">Email</label>
          <input
            id="login-email"
            v-model="email"
            type="email"
            class="form-control"
            name="email"
            :class="{ 'is-invalid': errors.email }"
            placeholder="Email"
            autocomplete="username"
          />
          <div v-if="errors.email" class="invalid-feedback">
            {{ errors.email }}
          </div>
        </div>

        <div class="form-group">
          <label for="login-password">Password</label>
          <input
            id="login-password"
            v-model="password"
            type="password"
            class="form-control"
            name="password"
            :class="{ 'is-invalid': errors.password }"
            placeholder="Password"
            autocomplete="current-password"
          />
          <div v-if="errors.password" class="invalid-feedback">
            {{ errors.password }}
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

        <p>
          Return to the
          <RouterLink to="/">Four Green Fields Farm website</RouterLink>.
        </p>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/scss/admin-layout.scss" as *;
.admin-layout {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: rem(32);
}
.login-form {
  width: 100%;
  max-width: rem(400);
  h1 {
    text-align: center;
    margin-bottom: rem(24);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: rem(8);
    .logo-container {
      display: flex;
      width: rem(32);
      height: rem(32);
    }
  }
  p {
    text-align: center;
    margin-top: rem(32);
  }
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
