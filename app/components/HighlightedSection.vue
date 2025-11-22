<template>
  <div class="highlighted-section">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.highlighted-section {
  margin: 1.5rem 0;
  padding: 1.5rem;
  background: linear-gradient(
    135deg,
    rgba($camarone, 0.05) 0%,
    rgba($camarone, 0.1) 100%
  );
  border-left: 4px solid $camarone;
  // border-radius: rem(8);

  :deep(h3) {
    margin-top: 0;
    margin-bottom: 1rem;
    color: var(--primary);
    font-size: rem(18);
  }

  :deep(h4) {
    margin-top: 0;
    margin-bottom: 0.75rem;
    color: var(--secondary);
    font-size: rem(16);
  }

  :deep(p) {
    margin-bottom: 1rem;
    line-height: 1.6;

    &:last-child {
      margin-bottom: 0;
    }
  }

  :deep(ul) {
    margin: 1rem 0;
    padding-left: 1.5rem;

    &:last-child {
      margin-bottom: 0;
    }
  }

  :deep(li) {
    margin-bottom: 0.5rem;
    line-height: 1.5;

    &:last-child {
      margin-bottom: 0;
    }
  }

  :deep(strong) {
    color: var(--primary);
    font-weight: 600;
  }
}
</style>
