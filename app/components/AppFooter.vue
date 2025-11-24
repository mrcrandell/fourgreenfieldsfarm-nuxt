<script setup>
// Get current year
const currentYear = new Date().getFullYear();
</script>

<template>
  <div class="footer">
    <p>
      Copyright &copy; {{ currentYear }} Four Green Fields Farm. All Rights
      Reserved.
    </p>
    <p>
      Designated trademarks and brands are the property of their respective
      owners.
    </p>
  </div>
</template>

<style lang="scss" scoped>
.footer {
  color: var(--white);
  padding: rem(32);
  text-align: center;

  p {
    margin: 0.5rem 0;
    font-size: rem(14);
    line-height: 1.5;

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
