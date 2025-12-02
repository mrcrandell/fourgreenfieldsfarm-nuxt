export default defineEventHandler(async (event) => {
  const url = getRequestURL(event);

  // Only process /events routes
  if (!url.pathname.startsWith("/events/")) {
    return;
  }

  // Match old format: /events/month-year
  const oldFormatMatch = url.pathname.match(/^\/events\/([a-z]+)-(\d{4})$/i);

  if (oldFormatMatch) {
    const [, monthName, year] = oldFormatMatch;

    // Map month names to numbers
    const monthMap: Record<string, string> = {
      "january": "01",
      "february": "02",
      "march": "03",
      "april": "04",
      "may": "05",
      "june": "06",
      "july": "07",
      "august": "08",
      "september": "09",
      "october": "10",
      "november": "11",
      "december": "12",
    };

    const monthNumber = monthMap[monthName.toLowerCase()];

    if (monthNumber) {
      const newPath = `/events/${year}/${monthNumber}`;

      // Preserve query parameters if any
      const queryString = url.search;
      const redirectUrl = queryString ? `${newPath}${queryString}` : newPath;

      // Redirect with 301 (permanent redirect) for SEO
      await sendRedirect(event, redirectUrl, 301);
      return;
    }
  }
});
