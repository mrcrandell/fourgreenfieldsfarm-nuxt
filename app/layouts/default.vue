<template>
  <div class="default-layout">
    <AppHeader />
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.default-layout {
  min-height: 100vh;
  // Add your default layout styles here
}
</style>
