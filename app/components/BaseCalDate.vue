<script setup>
import { format, isSameDay, isSameMonth } from "date-fns";

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
  return isSameDay(props.day.date, new Date());
});

const isCurrentMonth = computed(() => {
  if (!props.day) return false;
  // Use the day's own isCurrentMonth property that comes from the parent component
  return props.day.isCurrentMonth;
});

const dayEvents = computed(() => {
  if (!props.day) return [];
  return props.events.filter((event) =>
    isSameDay(new Date(event.date || event.startsAt), props.day)
  );
});

const hasEvents = computed(() => props.day.events.length > 0);

function handleDayClick() {
  if (!props.day) return;
  emit("day-clicked", {
    date: props.day,
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
      'is-empty': !hasEvents,
      'is-not-this-month': !isCurrentMonth,
    }"
    @click="hasEvents && handleDayClick()"
  >
    <div class="day-number">{{ format(day.date, "d") }}</div>

    <div v-if="day.events" class="event-indicators">
      <div
        v-for="event in day.events"
        :key="event.id"
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
    <div class="day-events">
      <div
        v-for="event in day.events"
        :key="event.id"
        class="event-item"
        :class="{ 'is-all-day': event.isAllDay }"
      >
        <span
          >{{
            !event.isAllDay
              ? format(
                  new Date(event.startsAt.replace("Z", "")),
                  new Date(event.startsAt.replace("Z", "")).getMinutes() === 0
                    ? "haaa"
                    : "h:mmaaa"
                )
              : null
          }}
          <strong>{{ event.name }}</strong></span
        >
      </div>
    </div>
  </div>
  <div v-else class="calendar-day empty-day"></div>
</template>

<style lang="scss" scoped>
.calendar-day {
  width: 100%;
  height: 100%;
  overflow: hidden;
  cursor: default;
  transition: all 0.2s ease;
  padding: rem(2);

  &.is-empty {
    aspect-ratio: 4/3;
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
    background-color: #f5f5f5;
  }
  &.is-not-this-month {
    opacity: 0.75;
  }
}

.day-number {
  font-weight: 600;
  font-size: rem(14);
  color: var(--bs-gray-800);
  margin-bottom: rem(4);

  .is-not-this-month & {
    font-weight: $font-weight-normal;
  }
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
  @include font-size(rem(8));
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @include bp-md-tablet {
    @include font-size(rem(10));
  }
  @include bp-lg-laptop {
    @include font-size(rem(14));
  }

  &.is-all-day {
    background-color: var(--primary);
    padding: 0 rem(4) rem(1) rem(4);
    color: var(--white);
    border-radius: rem(2);
    @include bp-lg-laptop {
      padding: rem(2) rem(8) rem(2) rem(12);
      border-radius: rem(20);
    }
  }

  &:not(.is-all-day)::before {
    display: block;
    content: "";
    background-color: var(--primary);
    width: rem(8);
    height: rem(8);
    margin-right: rem(2);
    border-radius: 50%;
    flex-shrink: 0;
    @include bp-lg-laptop {
      margin-right: rem(6);
      width: rem(12);
      height: rem(12);
    }
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
