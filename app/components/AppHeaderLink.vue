<script setup>
const route = useRoute()
const props = defineProps({
  to: {
    type: String,
    default: ''
  }
});

const classes = computed(() => {
  const classes = []
  if (route.path.startsWith(props.to)) {
    classes.push('router-link-active')
  }
  if (route.path === props.to) {
    classes.push('router-link-exact-active')
  }
  return classes.join(' ')
});

</script>

<template>
  <NuxtLink
    :class="classes"
    :to="to"
  >
    <slot />
  </NuxtLink>
</template>

<style lang="scss" scoped>

</style>
