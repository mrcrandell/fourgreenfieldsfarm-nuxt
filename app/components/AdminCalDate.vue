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
      <router-link
        v-for="event in day.events"
        :key="event.id"
        :to="`/admin/events/${event.id}`"
        class="event-item"
        :class="{ 'is-all-day': event.isAllDay }"
      >
        <span
          >{{
            format(
              event.startsAt,
              new Date(event.startsAt).getMinutes() === 0 ? "haaa" : "h:mmaaa"
            )
          }}
          <strong>{{ event.name }}</strong></span
        >
      </router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.calendar-day {
  background-color: var(--bs-white);
  padding: rem(4);
  width: 100%;
  height: 100%;
  overflow: hidden;

  &.is-empty {
    aspect-ratio: 5/3;
    background-color: var(--gray-300);
  }
}
header.day-header {
  font-weight: bold;
  margin-bottom: rem(8);
  font-size: rem(12);
}
.day-events {
  display: flex;
  flex-direction: column;
  gap: rem(2);
}
.event-item {
  width: 100%;
  max-width: 100%;
  text-decoration: none;
  display: flex;
  align-items: center;
  font-size: rem(14);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &.is-all-day {
    background-color: var(--primary);
    padding: rem(2) rem(8) rem(2) rem(12);
    color: var(--white);
    border-radius: rem(20);
  }

  &:not(.is-all-day)::before {
    display: block;
    content: "";
    background-color: var(--primary);
    width: rem(12);
    height: rem(12);
    margin-right: rem(6);
    border-radius: 50%;
    flex-shrink: 0;
  }

  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1;
    min-width: 0;
  }
}
</style>
