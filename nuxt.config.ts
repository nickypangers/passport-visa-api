// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    "@nuxt/eslint",
    "@nuxt/icon",
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "nuxt-auth-utils",
  ],
  pinia: {
    storesDirs: ["./app/stores/**"],
  },
  runtimeConfig: {
    db_host: process.env.POSTGRES_HOST,
    db_port: process.env.POSTGRES_PORT,
    db_user: process.env.POSTGRES_USER,
    db_password: process.env.POSTGRES_PASSWORD,
    db_database: process.env.POSTGRES_DB,
    stripe_public_key: process.env.STRIPE_PUBLISHABLE_KEY,
    stripe_secret_key: process.env.STRIPE_SECRET_KEY,
  },
});