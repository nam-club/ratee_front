// https://nuxt.com/docs/api/configuration/nuxt-config

import vuetify from 'vite-plugin-vuetify'

export default defineNuxtConfig({
    head: {
        link: [
            // M PLUS Rounded 1c
            //{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=M+PLUS+1p&family=M+PLUS+Rounded+1c&display=swap' },
            // Kosugi Maru
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Kosugi+Maru&family=M+PLUS+1p&family=M+PLUS+Rounded+1c&display=swap' },
            // Zen Maru Gothic
            //{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Kosugi+Maru&family=M+PLUS+1p&family=M+PLUS+Rounded+1c&family=Zen+Maru+Gothic&display=swap' },
        ]
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
