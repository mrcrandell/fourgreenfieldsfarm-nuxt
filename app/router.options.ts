// app/router.options.ts
import type { RouterConfig } from "@nuxt/schema";

export default <RouterConfig> {
  scrollBehavior(to, from, savedPosition) {
    // If navigating within the events page, preserve scroll position
    if (to.path.startsWith("/events") && from.path.startsWith("/events")) {
      return false; // Don't scroll
    }

    // For other navigation, use default behavior
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
};
