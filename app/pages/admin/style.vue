<script setup>
// Use the admin layout for this page
definePageMeta({
  layout: "admin",
  middleware: "auth",
});
</script>

<template>
  <div>
    <h1>Admin Dashboard</h1>
    <h2>Admin Dashboard</h2>
    <p>Welcome to the admin panel!</p>

    <div class="button-examples">
      <h3>Admin Buttons</h3>
      <button class="btn btn-primary">Primary Action</button>
      <button class="btn btn-outline-primary">Secondary Action</button>
      <button class="btn btn-success">Save Changes</button>
      <button class="btn btn-warning">Warning</button>
      <button class="btn btn-danger">Delete</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.button-examples {
  margin-top: rem(32);

  h3 {
    margin-bottom: rem(16);
  }

  .btn {
    margin-right: rem(12);
    margin-bottom: rem(8);
  }
}
</style>
