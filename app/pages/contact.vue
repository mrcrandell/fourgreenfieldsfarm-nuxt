<script setup>
const {
  public: { siteUrl },
} = useRuntimeConfig();

// Set the page title and SEO
useHead({
  title: "Contact",
  meta: [
    {
      name: "description",
      content:
        "Contact Four Green Fields Farm in Rodney, MI. Call 231-580-1463 or email fourgreenfieldsman@yahoo.com for corn maze info, group bookings, and farm questions.",
    },
    {
      name: "keywords",
      content:
        "contact Four Green Fields Farm, 231-580-1463, fourgreenfieldsman@yahoo.com, group bookings, corn maze questions, Rodney Michigan farm contact",
    },
    // Open Graph tags
    {
      property: "og:title",
      content: "Contact | Four Green Fields Farm",
    },
    {
      property: "og:description",
      content:
        "Contact Four Green Fields Farm for corn maze info, group bookings, and farm questions. Call 231-580-1463 or email us.",
    },
    {
      property: "og:url",
      content: `${siteUrl}/contact`,
    },
    {
      property: "og:image",
      content: `${siteUrl}/assets/img/photos/enterance-sign-pic.jpg`,
    },
    // Twitter Card tags
    {
      name: "twitter:title",
      content: "Contact | Four Green Fields Farm",
    },
    {
      name: "twitter:description",
      content:
        "Contact Four Green Fields Farm for corn maze info, group bookings, and farm questions.",
    },
    {
      name: "twitter:image",
      content: `${siteUrl}/assets/img/photos/enterance-sign-pic.jpg`,
    },
  ],
  link: [
    {
      rel: "canonical",
      href: `${siteUrl}/contact`,
    },
  ],
});
</script>

<template>
  <div class="contact-page">
    <h1>Contact Four Green Fields Farm</h1>
    <ContactForm />
  </div>
</template>

<style scoped>
.contact-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
}
</style>
