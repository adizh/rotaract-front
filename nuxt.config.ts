// https://nuxt.com/docs/api/configuration/nuxt-config
import { definePreset } from '@primevue/themes';

import Aura from '@primevue/themes/aura';

export const MyPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '{rose.50}',
            100: '{rose.100}',
            200: '{rose.200}',
            300: '{rose.300}',
            400: '{rose.400}',
            500: '{rose.500}',
            600: '{rose.600}',
            700: '{rose.700}',
            800: '{rose.800}',
            900: '{rose.900}',
            950: '{rose.950}'
        }
    }
  });

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@primevue/nuxt-module','@pinia/nuxt'
  ],
  vite: {
    server: {
      // hmr: {
      //   overlay: false,
      // },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
        @use "~/styles/colors.scss" as *;`,
        },
      },
    },
  },
  primevue: {
    autoImport:true,
    options: {
        theme: {
          preset: MyPreset,
         options:{   darkModeSelector: '.fake-dark-selector'}
         
        },
        ripple: true
    }
  }

})
