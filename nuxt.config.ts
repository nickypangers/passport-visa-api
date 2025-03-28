// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  app: {
    head: {
      title: 'Passport Visa API | @nickypangers',
      meta: [
        { name: 'description', content: 'Passport Visa API' },
      ],
      htmlAttrs: {
        lang: 'en',
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ]
    }
  },
  modules: [
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/ui',
    ['@pinia/nuxt', {
      autoImports: ['defineStore', 'acceptHMRUpdate'],
    }],
    'nuxt-lodash',
    '@nuxthub/core'
  ],
  lodash: {
    prefix: '_',
    exclude: ["map"],
    upperAfterPrefix: false,
  },
  css: ['~/assets/css/main.css'],
  imports: {
    dirs: ['stores']
  },
  nitro: {
    experimental: {
      tasks: true,
    },
    prerender: {
      autoSubfolderIndex: false
    },
  }
})