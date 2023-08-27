// https://nuxt.com/docs/api/configuration/nuxt-config

import vuetify from 'vite-plugin-vuetify'
import vue from '@vitejs/plugin-vue'

export default defineNuxtConfig({
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
    http: {
        baseURL: 'https://6qwkjs22n6.execute-api.ap-northeast-1.amazonaws.com/dev/v1' // ここには使用するAPIのベースURLを設定します
    }
})
