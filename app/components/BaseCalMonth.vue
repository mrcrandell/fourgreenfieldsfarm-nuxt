<script setup>
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  getDay,
} from "date-fns";

const emit = defineEmits(["previous-month", "next-month"]);

const props = defineProps({
  month: {
    type: Date,
    required: true,
  },
  weekdayFormat: {
    type: String,
    default: "EEE", // 'EEE' for short (Mon), 'EEEE' for long (Monday)
  },
});

// Get first day of the month
const firstDayOfMonth = computed(() => startOfMonth(props.month));

// Get last day of the month
const lastDayOfMonth = computed(() => endOfMonth(props.month));

// Get all days in the month
const daysInMonth = computed(() =>
  eachDayOfInterval({
    start: firstDayOfMonth.value,
    end: lastDayOfMonth.value,
  })
);

// Get weekday names
const weekdays = computed(() => {
  const days = [];
  for (let i = 0; i < 7; i++) {
    // Create a date for Sunday + i days (January 7, 2024 was a Sunday)
    const day = new Date(2024, 0, 7 + i); // Using a consistent year/month starting from Sunday
    days.push(format(day, props.weekdayFormat));
  }
  return days;
});
</script>

<template>
  <div class="calendar-month">
    <div
      class="calendar-nav d-flex align-items-center justify-content-between mb-3"
    >
      <h2>{{ format(props.month, "MMMM yyyy") }}</h2>
      <div class="btn-group">
        <button
          class="btn btn-outline-secondary"
          @click="$emit('previous-month')"
        >
          Previous
        </button>
        <button class="btn btn-outline-secondary" @click="$emit('next-month')">
          Next
        </button>
      </div>
    </div>

    <div class="calendar-header">
      <div v-for="day in weekdays" :key="day" class="calendar-weekday">
        {{ day }}
      </div>
    </div>

    <div class="calendar-grid">
      <!-- Slot for actual calendar days -->
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.calendar-month {
  width: 100%;
}

.calendar-header {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background-color: var(--bs-gray-100);
  border-bottom: 1px solid var(--bs-gray-300);
}

.calendar-weekday {
  padding: 0.5rem;
  text-align: center;
  font-weight: bold;
  color: var(--bs-gray-700);
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background-color: var(--bs-gray-200);
  border: 1px solid var(--bs-gray-300);

  > div {
    aspect-ratio: 1;
    background-color: var(--bs-white);
    padding: 0.5rem;

    &.empty {
      background-color: var(--bs-gray-100);
    }
  }
}
</style>
