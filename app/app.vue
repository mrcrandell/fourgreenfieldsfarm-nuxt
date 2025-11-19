<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style lang="scss">
@use "@/assets/scss/base.scss" as *;

.default-layout {
  main.main {
    padding: 2rem;
    margin: 0 auto;
    @include bp-md-tablet {
      margin: 1rem; // 16px
      padding: 1.625rem; // 26px
      @include shadow-2();
    }
    @include bp-xl-desktop {
      max-width: $max-width;
      margin-right: auto;
      margin-left: auto;
    }
  }
}
</style>
