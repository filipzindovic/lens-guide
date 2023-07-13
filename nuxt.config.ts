// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // devtools: { enabled: true },
  app: {
    head: {
      title: 'Lens Guide',
      link: [{ rel: 'icon', href: '/sunglasses.ico' }]
    }
  },
  runtimeConfig: {
    public: {
      PRODUCTS_BASE_URL: process.env.PRODUCTS_BASE_URL || '/api/products',
      SCENES_BASE_URL: process.env.SCENES_BASE_URL || '/api/scenes'
    }
  },
  ssr: false,
  modules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss'
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/scss/_variables.scss";'
        }
      }
    }
  }
});
