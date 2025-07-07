// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ['./assets/css/main.css'],
  modules: ['@nuxt/fonts', '@nuxt/icon', '@nuxt/image','@nuxtjs/tailwindcss','@nuxt/ui', ],
  app: {
    head: {
      meta: [
        {
          name: 'viewport',
          // content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
        }
      ]
    }
  } 
})