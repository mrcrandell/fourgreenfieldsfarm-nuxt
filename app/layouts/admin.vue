<script setup>
import { useAuthStore } from "~/stores/auth";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const isUserMenuOpen = ref(false);

async function closeUserMenu() {
  console.log("close user menu");
  isUserMenuOpen.value = false;
}

const handleLogout = () => {
  authStore.logout();
  router.push("/admin-login");
};
</script>

<template>
  <div class="admin-layout">
    <header class="admin-header">
      <h1>
        <span class="logo-container"><AppLogoNoWords /></span>
        <span>Admin</span>
      </h1>
      <div class="dropdown">
        <button
          class="btn btn-primary"
          @click.stop="isUserMenuOpen = !isUserMenuOpen"
        >
          <IconUser />
        </button>
        <ul
          v-if="isUserMenuOpen"
          v-outside="closeUserMenu"
          class="dropdown-menu is-right"
          :class="{ 'is-open': isUserMenuOpen }"
        >
          <li>
            <RouterLink to="/admin/change-password" class="dropdown-item"
              >Change Password</RouterLink
            >
          </li>
          <li>
            <button class="dropdown-item" @click="handleLogout">Logout</button>
          </li>
        </ul>
      </div>
    </header>
    <main class="admin-content">
      <slot></slot>
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
    display: flex;
    align-items: center;
    gap: rem(8);
    .logo-container {
      display: block;
      width: rem(32);
      height: rem(32);
    }
  }
}
</style>
