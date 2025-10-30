<script setup>
import { format, isSameDay } from "date-fns";
const props = defineProps({
  day: {
    type: Object,
    required: true,
  },
});
const isToday = computed(() => {
  return isSameDay(props.day.date, new Date());
});
</script>
<template>
  <div
    class="calendar-day"
    :class="{ 'is-empty': day.events.length === 0, 'is-today': isToday }"
  >
    <header class="day-header">
      {{ format(day.date, "d") }}
    </header>
    <div class="day-events">
      <div v-for="event in day.events" :key="event.id" class="event-item">
        {{ event.name }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.calendar-day {
  aspect-ratio: 1;
  background-color: var(--bs-white);
  padding: 0.5rem;

  &.is-empty {
    background-color: var(--bs-gray-100);
  }
}
</style>
