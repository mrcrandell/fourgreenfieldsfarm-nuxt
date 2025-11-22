<script setup>
import { format, isSameDay } from "date-fns";

const props = defineProps({
  day: {
    type: [Date, Object],
    required: false,
    default: null,
  },
  events: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["day-clicked"]);

const isToday = computed(() => {
  if (!props.day) return false;
  return isSameDay(props.day, new Date());
});

const dayEvents = computed(() => {
  if (!props.day) return [];
  return props.events.filter((event) =>
    isSameDay(new Date(event.date || event.startsAt), props.day)
  );
});

const hasEvents = computed(() => dayEvents.value.length > 0);

function handleDayClick() {
  if (!props.day) return;
  emit("day-clicked", {
    date: props.day,
    events: dayEvents.value,
  });
}
</script>

<template>
  <div
    v-if="day"
    class="calendar-day"
    :class="{
      'has-events': hasEvents,
      'is-today': isToday,
      'is-clickable': hasEvents,
    }"
    @click="hasEvents && handleDayClick()"
  >
    <div class="day-number">
      {{ format(day, "d") }}
    </div>

    <div v-if="hasEvents" class="event-indicators">
      <div
        v-for="(event, index) in dayEvents.slice(0, 3)"
        :key="event.id || index"
        class="event-dot"
        :title="event.name"
      ></div>
      <div
        v-if="dayEvents.length > 3"
        class="more-events"
        :title="`${dayEvents.length - 3} more events`"
      >
        +{{ dayEvents.length - 3 }}
      </div>
    </div>
  </div>
  <div v-else class="calendar-day empty-day"></div>
</template>

<style lang="scss" scoped>
.calendar-day {
  background-color: var(--bs-white);
  padding: rem(8);
  min-height: rem(80);
  border: 1px solid var(--bs-gray-200);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  cursor: default;
  transition: all 0.2s ease;

  &.empty-day {
    background-color: var(--bs-gray-50);
    border-color: var(--bs-gray-100);
  }

  &.is-clickable {
    cursor: pointer;

    &:hover {
      background-color: rgba(var(--primary-rgb), 0.05);
      border-color: var(--primary);
    }
  }

  &.has-events {
    background-color: rgba(var(--primary-rgb), 0.02);
    border-color: rgba(var(--primary-rgb), 0.3);
  }

  &.is-today {
    background-color: rgba(var(--secondary-rgb), 0.1);
    border-color: var(--secondary);

    .day-number {
      background-color: var(--secondary);
      color: white;
      border-radius: 50%;
      width: rem(24);
      height: rem(24);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
    }
  }
}

.day-number {
  font-weight: 600;
  font-size: rem(14);
  color: var(--bs-gray-800);
  margin-bottom: rem(4);
}

.event-indicators {
  display: flex;
  gap: rem(2);
  flex-wrap: wrap;
  align-items: center;
}

.event-dot {
  width: rem(6);
  height: rem(6);
  background-color: var(--primary);
  border-radius: 50%;
  flex-shrink: 0;
}

.more-events {
  font-size: rem(10);
  color: var(--primary);
  font-weight: 600;
  margin-left: rem(2);
}
</style>
