// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@nuxt/fonts"],

  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET || "your_jwt_secret",
    public: {
      // Public runtime config
    },
  },

  vite: {
    define: {
      global: "globalThis",
    },
    optimizeDeps: {
      exclude: ["@prisma/client"],
    },
  },

  nitro: {
    experimental: {
      wasm: true,
    },
    esbuild: {
      options: {
        target: "esnext",
      },
    },
  },
});
