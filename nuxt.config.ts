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
  ],

  app: {
    head: {
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
        { name: "apple-mobile-web-app-title", content: "Four Green Fields Farm" },
      ],
      link: [
        { rel: "icon", type: "image/png", href: "/favicon-96x96.png", sizes: "96x96" },
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "shortcut icon", href: "/favicon.ico" },
        { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
        { rel: "manifest", href: "/site.webmanifest" },
      ],
    },
  },

  nitro: {
    routeRules: {
      "/admin": { redirect: "/admin/events" },
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
