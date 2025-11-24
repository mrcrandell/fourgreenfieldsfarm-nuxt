<script setup lang="ts">
import AppFooter from "~/components/AppFooter.vue";
</script>

<template>
  <div class="default-layout">
    <AppHeader />
    <slot></slot>
    <AppFooter />
  </div>
</template>

<style lang="scss" scoped>
.default-layout {
  min-height: 100vh;
  // Add your default layout styles here
}
</style>
