import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()] as any,
  },

  app: {
    head: {
      title: 'Stats Studio - Create Beautiful Statistics Cards',
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Design and create stunning statistics cards for your projects with Stats Studio. Easy-to-use visual editor with real-time preview.' },
        { name: 'theme-color', content: '#000000' },
        // Open Graph
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Stats Studio' },
        { property: 'og:title', content: 'Stats Studio - Create Beautiful Statistics Cards' },
        { property: 'og:description', content: 'Design and create stunning statistics cards for your projects with Stats Studio. Easy-to-use visual editor with real-time preview.' },
        { property: 'og:image', content: 'https://stats.pphat.top/stats?username=pphatdev&avatar_mode=radar&format=webp' },
        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Stats Studio - Create Beautiful Statistics Cards' },
        { name: 'twitter:description', content: 'Design and create stunning statistics cards for your projects with Stats Studio.' },
        { name: 'twitter:image', content: 'https://stats.pphat.top/stats?username=pphatdev&avatar_mode=radar&format=webp' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'canonical', href: 'https://studio.stats.pphat.top' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Kantumruy+Pro:ital,wght@0,100..700;1,100..700&family=Noto+Serif+Khmer:wght@100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap' },
      ],
    },
  },
});