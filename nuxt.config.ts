// https://nuxt.com/docs/api/configuration/nuxt-config

import vuetify from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  ssr: false,
  app: {
    head: {
      title: 'ratee -手軽にみんなの意見が見える投票サイト-',
      meta: [
        { name: 'description', content: '自分は多数派？少数派？世間の声が一目でわかる投票サイト。会員登録不要ですぐに遊べる！メジャーなお題からマイナーなお題まで気軽に聞いてみよう。' },
        { name: 'keywords', content: 'ratee, 投票, アンケート, グラフ, みんなの声, 意見' },
        { property: 'og:title', content: 'ratee -手軽にみんなの意見が見える投票サイト-' },
        { property: 'og:description', content: '自分は多数派？少数派？世間の声が一目でわかる投票サイト。会員登録不要ですぐに遊べる！メジャーなお題からマイナーなお題まで気軽に聞いてみよう。' },
        { property: 'og:image', content: '/logo.png' },
        { property: 'og:url', content: 'https://ratee.nam-club.com/' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'ratee -手軽にみんなの意見が見える投票サイト-' },
        { name: 'twitter:description', content: '自分は多数派？少数派？世間の声が一目でわかる投票サイト。会員登録不要ですぐに遊べる！メジャーなお題からマイナーなお題まで気軽に聞いてみよう。' },
        { name: 'twitter:image', content: '/logo.png' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Kosugi+Maru&family=M+PLUS+1p&family=M+PLUS+Rounded+1c&display=swap' },
      ],
      script: [
        { src: 'https://www.googletagmanager.com/gtag/js?id=G-PQES2NWW75', async: true },
        { 
          innerHTML: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-PQES2NWW75');
          `,
          type: 'text/javascript',
          charset: 'utf-8'
        }
      ],
      __dangerouslyDisableSanitizers: ['script']
    },
  },
  build: {
    transpile: ['vuetify'],
  },
  hooks: {
    'vite:extendConfig': (config) => {
      config.plugins!.push(vuetify())
    },
  },
  vite: {
    ssr: {
      noExternal: ['vuetify'],
    },
    define: {
      'process.env.DEBUG': false,
    },
  },
  css: ['@/assets/main.scss'],
  vuetify: {
    defaultAssets: false,
  },
  components: [
    '~/components/templates',
    '~/components/atoms',
    '~/components/molecules',
    '~/components/organisms',
  ],
  plugins: ['~/plugins/vuetify.ts'],
})
