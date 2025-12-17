<script setup>
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  format,
  startOfWeek,
  endOfWeek,
} from "date-fns";

const route = useRoute();
const {
  public: { siteUrl },
} = useRuntimeConfig();

useHead({
  title: "Events",
  meta: [
    {
      name: "description",
      content:
        "View upcoming events and group bookings at Four Green Fields Farm in Rodney, MI. Check our calendar for corn maze hours, haunted maze dates, and private group availability.",
    },
    {
      name: "keywords",
      content:
        "Four Green Fields Farm events, group bookings, corn maze calendar, haunted maze dates, private groups, farm events, Rodney Michigan events",
    },
    // Open Graph tags
    {
      property: "og:title",
      content: "Events & Group Bookings | Four Green Fields Farm",
    },
    {
      property: "og:description",
      content:
        "View upcoming events and group bookings at Four Green Fields Farm. Check our calendar for corn maze hours, haunted maze dates, and more.",
    },
    {
      property: "og:url",
      content: `${siteUrl}/events`,
    },
    {
      property: "og:image",
      content: `${siteUrl}/assets/img/photos/events1.jpg`,
    },
    // Twitter Card tags
    {
      name: "twitter:title",
      content: "Events & Group Bookings | Four Green Fields Farm",
    },
    {
      name: "twitter:description",
      content:
        "View upcoming events and group bookings at Four Green Fields Farm. Check our calendar for corn maze hours and more.",
    },
    {
      name: "twitter:image",
      content: `${siteUrl}/assets/img/photos/events1.jpg`,
    },
  ],
  link: [
    {
      rel: "canonical",
      href: `${siteUrl}/events`,
    },
  ],
});

// Gallery images for events page
const galleryImgs = [
  {
    id: 1,
    croppedImg: "/assets/img/photos/cropped/events1.jpg",
    fullImg: "/assets/img/photos/events1.jpg",
    alt: "Event page photo 1",
  },
  {
    id: 2,
    croppedImg: "/assets/img/photos/cropped/events2.jpg",
    fullImg: "/assets/img/photos/events2.jpg",
    alt: "Event page photo 2",
  },
  {
    id: 3,
    croppedImg: "/assets/img/photos/cropped/events3.jpg",
    fullImg: "/assets/img/photos/events3.jpg",
    alt: "Event page photo 3",
  },
  {
    id: 4,
    croppedImg: "/assets/img/photos/cropped/events4.jpg",
    fullImg: "/assets/img/photos/events4.jpg",
    alt: "Event page photo 4",
  },
  {
    id: 5,
    croppedImg: "/assets/img/photos/cropped/events5.jpg",
    fullImg: "/assets/img/photos/events5.jpg",
    alt: "Event page photo 5",
  },
  {
    id: 6,
    croppedImg: "/assets/img/photos/cropped/events6.jpg",
    fullImg: "/assets/img/photos/events6.jpg",
    alt: "Event page photo 6",
  },
  {
    id: 7,
    croppedImg: "/assets/img/photos/cropped/events7.jpg",
    fullImg: "/assets/img/photos/events7.jpg",
    alt: "Event page photo 7",
  },
  {
    id: 8,
    croppedImg: "/assets/img/photos/cropped/events8.jpg",
    fullImg: "/assets/img/photos/events8.jpg",
    alt: "Event page photo 8",
  },
  {
    id: 9,
    croppedImg: "/assets/img/photos/cropped/events9.jpg",
    fullImg: "/assets/img/photos/events9.jpg",
    alt: "Event page photo 9",
  },
  {
    id: 10,
    croppedImg: "/assets/img/photos/cropped/events10.jpg",
    fullImg: "/assets/img/photos/events10.jpg",
    alt: "Event page photo 10",
  },
  {
    id: 11,
    croppedImg: "/assets/img/photos/cropped/events11.jpg",
    fullImg: "/assets/img/photos/events11.jpg",
    alt: "Event page photo 11",
  },
  {
    id: 12,
    croppedImg: "/assets/img/photos/cropped/events12.jpg",
    fullImg: "/assets/img/photos/events12.jpg",
    alt: "Event page photo 12",
  },
  {
    id: 13,
    croppedImg: "/assets/img/photos/cropped/events13.jpg",
    fullImg: "/assets/img/photos/events13.jpg",
    alt: "Event page photo 13",
  },
  {
    id: 14,
    croppedImg: "/assets/img/photos/cropped/events14.jpg",
    fullImg: "/assets/img/photos/events14.jpg",
    alt: "Event page photo 14",
  },
];

// Initialize current month from route params or default to current month
const currentMonth = ref(new Date());

// Events data from API
const events = ref([]);

// Watch for route changes to update the current month and load events
watchEffect(async () => {
  // Handle both /events and /events/year/month routes
  let year, month;

  if (route.params.slug && route.params.slug.length >= 2) {
    // Route like /events/2025/10
    year = parseInt(route.params.slug[0]);
    month = parseInt(route.params.slug[1]) - 1; // Convert to 0-based month
  } else {
    // Route is just /events - use current date
    const now = new Date();
    year = now.getFullYear();
    month = now.getMonth();
  }

  currentMonth.value = new Date(year, month, 1);

  // Load events for the current month
  await nextTick();
  await loadEvents();
});

// Function to load events from API
async function loadEvents() {
  const start = startOfWeek(startOfMonth(currentDate.value));
  const end = endOfWeek(endOfMonth(currentDate.value));

  try {
    events.value = await $fetch("/api/events/by-day", {
      params: {
        startsAt: format(start, "yyyy-MM-dd"),
        endsAt: format(end, "yyyy-MM-dd"),
      },
    });
    console.log(toRaw(calendarDays.value));
  } catch (error) {
    console.error("Failed to load calendar events:", error);
  }
}

// Modal state for event details
const selectedDay = ref(null);
const selectedEvents = ref([]);
const isEventModalOpen = ref(false);

const currentDate = computed(() => {
  if (route.params.slug && route.params.slug.length >= 2) {
    // Route like /events/2025/10
    const year = parseInt(route.params.slug[0]);
    const month = parseInt(route.params.slug[1]) - 1; // Convert to 0-based month
    return new Date(year, month, 1);
  }
  return new Date();
});

const calendarDays = computed(() => {
  const days = [];
  const start = startOfWeek(startOfMonth(currentDate.value));
  const end = endOfWeek(endOfMonth(currentDate.value));

  const currentDateIter = start;
  while (currentDateIter <= end) {
    const formattedDate = format(currentDateIter, "EEEE, MMMM d, yyyy");
    const dayData = events.value.find((d) => d.day === formattedDate);

    days.push({
      date: new Date(currentDateIter),
      dayOfMonth: currentDateIter.getDate(),
      events: dayData ? dayData.events : [],
      isCurrentMonth:
        currentDateIter.getMonth() === currentDate.value.getMonth(),
    });
    currentDateIter.setDate(currentDateIter.getDate() + 1);
  }

  console.log("Calendar Days with Events:", days);
  return days;
});

// Handle day click
function handleDayClick({ date }) {
  selectedDay.value = date;
  isEventModalOpen.value = true;
}

function closeEventModal() {
  isEventModalOpen.value = false;
  selectedDay.value = null;
}

// Format event time
function formatEventTime(event) {
  if (event.isAllDay) return "All Day";

  const start = format(new Date(event.startsAt.replace("Z", "")), "h:mm a");
  if (event.endsAt) {
    const end = format(new Date(event.endsAt.replace("Z", "")), "h:mm a");
    return `${start} - ${end}`;
  }
  return start;
}

// Format modal date
const modalDateFormatted = computed(() => {
  if (!selectedDay.value) return "";
  return format(selectedDay.value.date, "EEEE, MMMM d, yyyy");
});

// Load initial events when component mounts
onMounted(() => {
  console.log(currentMonth.value);
  console.log(currentDate.value);
  loadEvents();
});
</script>

<template>
  <main class="main events-page">
    <h1>Calendar</h1>

    <div class="content-section">
      <div class="image-left">
        <BaseGallery :imgs="galleryImgs" />
      </div>

      <div class="text-content">
        <p>
          Do you have a church youth group, scout troop, fraternity or sorority,
          or employee group looking for a fun and affordable event? What about a
          unique birthday party for your son or daughter? Booking the maze at
          Four Green Fields is just what you're looking for. After all, what
          could be better than spending time outside in the beautiful Michigan
          fall weather? If you just want to book a hay ride or sleigh ride
          without doing the maze, click on the
          <NuxtLink to="/rides">Hay & Sleigh Rides</NuxtLink> page for details.
        </p>

        <p>
          A private maze booking gives you the Maze all to yourselves and access
          to our fire pit and picnic area. You can go through the maze and then
          gather back around a roaring bonfire and munch on whatever goodies you
          want to bring with you. How about roasting hotdogs over the fire?
          Better yet, roast marshmallows and then make Smores. You can also walk
          the trails on the farm and enjoy the beautiful fall colors. (Helps
          burn off a few of those extra calories.)
        </p>

        <p>
          Want to make the event really special? How about combining a maze
          visit with a hay ride? You can add a horse drawn wagon ride to your
          maze booking for just $50.
        </p>

        <p>
          We offer special discounted group rates and use of the picnic area is
          only $10. Just look at the calendar and see if the date and time you
          want is available. Contact us at
          <a href="tel:231-580-1463">(231) 580-1463</a> or at
          <a href="mailto:fourgreenfieldsman@yahoo.com"
            >fourgreenfieldsman@yahoo.com</a
          >
          when you are ready to book or if you have any questions. If you want
          to come when the maze is in operation on Saturday and Sunday, you can
          still book the picnic area for your group.
        </p>

        <p>
          We'd be happy to give you names of folks who have booked in the past
          if you'd like to hear from them.
        </p>
      </div>
    </div>

    <hr />

    <div id="calendar" class="calendar-section">
      <BaseCalMonth :month="currentMonth">
        <BaseCalDate
          v-for="day in calendarDays"
          :key="day.date"
          :day="day"
          :events="events"
          @day-clicked="handleDayClick"
        />
      </BaseCalMonth>
    </div>

    <!-- Event Details Modal -->
    <BaseModal
      class="modal-events"
      :is-shown="isEventModalOpen"
      @closed="closeEventModal"
    >
      <template #header>
        <h4 class="modal-title">{{ modalDateFormatted }}</h4>
        <button
          type="button"
          class="btn-close"
          aria-label="Close"
          @click="closeEventModal"
        >
          <IconClose />
        </button>
      </template>

      <div v-if="selectedDay.events.length" class="events-list">
        <div
          v-for="event in selectedDay.events"
          :key="event.id"
          class="event-item"
        >
          <div class="event-header">
            <h5 class="event-name">{{ event.name }}</h5>
            <div class="event-time">{{ formatEventTime(event) }}</div>
          </div>
          <div v-if="event.description" class="event-description">
            <p>{{ event.description }}</p>
          </div>
        </div>
      </div>
    </BaseModal>
  </main>
</template>
<style lang="scss" scoped>
.events-page {
  h1 {
    margin-bottom: 2rem;
  }

  hr {
    margin: 3rem 0;
    border: 0;
    border-top: 1px solid var(--border-color);
  }

  a {
    color: var(--primary);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}

.content-section {
  margin: 2rem 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  align-items: start;

  @include bp-md-tablet {
    grid-template-columns: rem(300) 1fr;
    gap: 2rem;
  }

  .image-left {
    overflow: hidden;

    :deep(.gallery) {
      margin: 0 auto;
      max-width: 100%;
      width: 100%;
      border: 4px solid $camarone;
      @include shadow-1();
    }
  }

  .text-content {
    p {
      margin-bottom: 1rem;
      line-height: 1.6;
    }
  }
}

.calendar-section {
  margin: 2rem 0;
  max-width: 100%;
}

// Modal styling
.modal-events {
  :deep(.modal-dialog) {
    @include bp-lg-laptop {
      max-width: rem(600);
    }
  }

  .btn-close {
    position: absolute;
    z-index: 30;
    top: rem(16);
    right: rem(16);
    height: rem(32);
    width: rem(32);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: $white;
    color: $chicory-flower;
    transition: all 0.25s ease-in-out;
    padding: rem(10);
    border: 0;

    &:hover {
      border-color: $chicory-flower;
    }

    svg {
      width: 100%;
      fill: currentColor;
    }
  }
}

.events-list {
  padding: rem(16);
}

.event-item {
  margin-bottom: rem(16);
  padding-bottom: rem(8);
  border-bottom: 1px solid var(--gray-200);

  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }
}

.event-header {
  margin-bottom: 0.5rem;
}

.event-name {
  font-size: rem(18);
  font-weight: 600;
  color: var(--primary);
  margin: 0 0 0.25rem 0;
}

.event-time {
  font-size: rem(14);
  color: var(--text-muted);
  font-weight: 500;
}

.event-description {
  p {
    margin: 0;
    line-height: 1.5;
    color: var(--text-secondary);
  }
}
</style>
