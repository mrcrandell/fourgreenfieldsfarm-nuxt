<script setup>
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  getDay,
  addMonths,
  subMonths,
} from "date-fns";

const props = defineProps({
  month: {
    type: Date,
    required: true,
  },
  weekdayFormat: {
    type: String,
    default: "EEE", // 'EEE' for short (Mon), 'EEEE' for long (Monday)
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["previous-month", "next-month", "today"]);

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

// Calculate previous and next month URLs for SEO
const previousMonthUrl = computed(() => {
  const prevMonth = subMonths(props.month, 1);
  const year = format(prevMonth, "yyyy");
  const month = format(prevMonth, "MM");

  if (props.isAdmin) {
    return `/admin/events?year=${year}&month=${month}`;
  }
  return `/events/${year}/${month}`;
});

const nextMonthUrl = computed(() => {
  const nextMonth = addMonths(props.month, 1);
  const year = format(nextMonth, "yyyy");
  const month = format(nextMonth, "MM");

  if (props.isAdmin) {
    return `/admin/events?year=${year}&month=${month}`;
  }
  return `/events/${year}/${month}`;
});

const todayUrl = computed(() => {
  if (props.isAdmin) {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    return `/admin/events?year=${year}&month=${month}`;
  }
  return "/events";
});

// Handle navigation clicks
function handlePreviousMonth(event) {
  event.preventDefault();
  emit("previous-month");
}

function handleNextMonth(event) {
  event.preventDefault();
  emit("next-month");
}

function handleToday(event) {
  event.preventDefault();
  emit("today");
}
</script>

<template>
  <div class="calendar-month" :class="{ 'is-admin': isAdmin }">
    <div class="calendar-nav">
      <h2>{{ format(props.month, "MMMM yyyy") }}</h2>
      <div class="btn-container">
        <NuxtLink
          :to="previousMonthUrl"
          class="btn btn-outline-primary"
          @click="handlePreviousMonth"
        >
          <div class="arrow-left"></div>
          Previous
        </NuxtLink>
        <NuxtLink
          v-if="isAdmin"
          :to="todayUrl"
          class="btn btn-outline-primary"
          @click="handleToday"
        >
          Today
        </NuxtLink>
        <NuxtLink
          :to="nextMonthUrl"
          class="btn btn-outline-primary"
          @click="handleNextMonth"
        >
          Next
          <div class="arrow-right"></div>
        </NuxtLink>
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
  max-width: 100%;
  overflow: hidden;
}

.calendar-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;

  .btn-container {
    display: flex;
    gap: rem(4);
  }

  .btn {
    display: inline-flex;
    align-items: center;
    gap: rem(4);
    .arrow-right,
    .arrow-left {
      display: block;
      // margin: 30px auto;
      width: rem(10);
      height: rem(10);
      border-top: rem(2) solid currentColor;
      border-left: rem(2) solid currentColor;
    }
    .arrow-right {
      transform: rotate(135deg);
    }
    .arrow-left {
      transform: rotate(-45deg);
    }
  }
}

.calendar-header {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  // background-color: var(--gray-100);
  border-bottom: 1px solid var(--gray-300);
  .is-admin & {
    gap: rem(2);
  }
}

.calendar-weekday {
  padding: 0.5rem;
  text-align: center;
  font-weight: bold;
  color: var(--bs-gray-700);
  min-width: 0;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background-color: var(--bs-gray-200);
  border: 1px solid var(--bs-gray-300);
  .is-admin & {
    gap: rem(2);
  }

  > div {
    aspect-ratio: 1;
    background-color: var(--bs-white);
    padding: 0.5rem;
  }
}
</style>
