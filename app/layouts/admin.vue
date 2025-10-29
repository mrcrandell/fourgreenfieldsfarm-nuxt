<script setup>
import { useAuthStore } from "~/stores/auth";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = () => {
  authStore.logout();
  router.push("/admin-login");
};
</script>

<template>
  <div class="admin-layout">
    <header class="admin-header">
      <h1>Admin Panel</h1>
      <button class="btn btn-primary" @click="handleLogout">Logout</button>
    </header>
    <main class="admin-content">
      <slot />
    </main>
  </div>
</template>

<style lang="scss">
@use "@/assets/scss/admin-layout.scss" as *;

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;

  h1 {
    margin: 0;
  }
}
</style>
