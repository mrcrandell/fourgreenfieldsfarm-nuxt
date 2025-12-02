// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxtjs/turnstile",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
    "nuxt-schema-org",
  ],

  app: {
    head: {
      htmlAttrs: {
        lang: "en", // This sets <html lang="en">
      },
      title: "Four Green Fields Farm",
      titleTemplate: "%s - Four Green Fields Farm",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "Four Green Fields Farm - Corn maze, pumpkin patch, hay and sleigh rides in Rodney, MI",
        },
        {
          name: "apple-mobile-web-app-title",
          content: "Four Green Fields Farm",
        },
        {
          name: "theme-color",
          content: "#2D5A27",
        },
        // Site-wide Open Graph tags
        {
          property: "og:site_name",
          content: "Four Green Fields Farm",
        },
        {
          property: "og:locale",
          content: "en_US",
        },
        {
          property: "og:type",
          content: "website",
        },
        {
          property: "og:image",
          content:
            "https://www.fourgreenfieldsfarm.com/assets/img/photos/enterance-sign-pic.jpg",
        },
        {
          property: "og:image:width",
          content: "1200",
        },
        {
          property: "og:image:height",
          content: "630",
        },
        {
          property: "og:image:alt",
          content: "Four Green Fields Farm entrance sign",
        },
        // Twitter Card defaults
        {
          name: "twitter:card",
          content: "summary_large_image",
        },
        // SEO meta tags
        {
          name: "robots",
          content: "index, follow",
        },
        {
          name: "author",
          content: "Four Green Fields Farm",
        },
        {
          name: "keywords",
          content:
            "corn maze, pumpkin patch, haunted maze, horse drawn wagon rides, family fun, fall activities, Rodney Michigan, Big Rapids, farm activities",
        },
        // Geographic meta tags
        {
          name: "geo.region",
          content: "US-MI",
        },
        {
          name: "geo.placename",
          content: "Rodney, Michigan",
        },
        {
          name: "geo.position",
          content: "43.7917;-85.4872",
        },
        // Business info
        {
          name: "business:contact_data:phone_number",
          content: "231-580-1463",
        },
        {
          name: "business:contact_data:email",
          content: "fourgreenfieldsman@yahoo.com",
        },
      ],
      link: [
        {
          rel: "icon",
          type: "image/png",
          href: "/favicon-96x96.png",
          sizes: "96x96",
        },
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "shortcut icon", href: "/favicon.ico" },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
        { rel: "manifest", href: "/site.webmanifest" },
        // Site-wide canonical domain
        {
          rel: "canonical",
          href: "https://www.fourgreenfieldsfarm.com",
        },
      ],
      // Add structured data script globally
      script: [
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Four Green Fields Farm",
            "description":
              "Family-friendly corn maze, pumpkin patch, and fall activities in Rodney, Michigan",
            "url": "https://www.fourgreenfieldsfarm.com",
            "telephone": "231-580-1463",
            "email": "fourgreenfieldsman@yahoo.com",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "15693 Wilson Road",
              "addressLocality": "Rodney",
              "addressRegion": "MI",
              "postalCode": "49342",
              "addressCountry": "US",
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "43.7917",
              "longitude": "-85.4872",
            },
            "openingHours": [
              "Sa 12:00-17:30",
              "Su 14:00-17:00",
            ],
            "priceRange": "$2-$5",
            "image": [
              "https://www.fourgreenfieldsfarm.com/assets/img/photos/enterance-sign-pic.jpg",
            ],
            "sameAs": [
              "https://www.facebook.com/people/Four-Green-Fields-Farm/100067042143292/",
            ],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Farm Activities",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Corn Maze",
                  },
                  "price": "3",
                  "priceCurrency": "USD",
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Haunted Maze",
                  },
                  "price": "5",
                  "priceCurrency": "USD",
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Horse Drawn Wagon Rides",
                  },
                  "price": "2",
                  "priceCurrency": "USD",
                },
              ],
            },
          }),
        },
      ],
    },
  },

  nitro: {
    routeRules: {
      "/admin": { redirect: "/admin/events" },
      // Add SEO-friendly route rules
      "/": {
        headers: {
          "Cache-Control": "s-maxage=60",
        },
      },
      "/events/**": {
        headers: {
          "Cache-Control": "s-maxage=300",
        },
      },
    },
  },

  fonts: {
    families: [
      {
        name: "Cardo",
        provider: "google",
        weights: [400, 700],
        styles: ["normal", "italic"],
      },
      {
        name: "Lato",
        provider: "google",
        weights: [100, 300, 400, 700, 900],
        styles: ["normal", "italic"],
      },
    ],
  },

  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET || "your_jwt_secret",
    mailgunApi: process.env.MAILGUN_API_KEY || "",
    mailgunDomain: process.env.MAILGUN_DOMAIN || "",
    nuxtTurnstileSecretKey: process.env.NUXT_TURNSTILE_SECRET_KEY || "",
    public: {
      turnstile: {
        siteKey: process.env.NUXT_PUBLIC_TURNSTILE_SITE_KEY || "",
      },
      // Add site URL for easy access in components
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL ||
        "https://www.fourgreenfieldsfarm.com",
    },
  },
  components: [
    // ~/calendar-module/components/event/Update.vue => <EventUpdate />
    // { path: '~/calendar-module/components' },

    // ~/components/icons/IconArrowLeft.vue => <IconArrowLeft />
    { path: "~/components/icons", pathPrefix: false },

    // ~/components/special-components/Btn.vue => <SpecialBtn />
    // { path: '~/components/special-components', prefix: 'Special' },

    // It's important that this comes last if you have overrides you wish to apply
    // to sub-directories of `~/components`.
    //
    // ~/components/Btn.vue => <Btn />
    // ~/components/base/Btn.vue => <BaseBtn />
    "~/components",
  ],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "@/assets/scss/_variables.scss" as *;
            @use "@/assets/scss/_functions.scss" as *;
            @use "@/assets/scss/_mixins.scss" as *;
          `,
        },
      },
    },
    optimizeDeps: {
      exclude: ["@prisma/client"],
    },
  },
});
