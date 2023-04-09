// https://nuxt.com/docs/api/configuration/nuxt-config

import { defineNuxtConfig } from 'nuxt/config'
import vuetify from 'vite-plugin-vuetify'

export default defineNuxtConfig({
    buildModules: [
        '@nuxtjs/composition-api/module'
    ],
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
    storybook: {
        // 追加のアドオンなどあれば
        addons: [
            '@storybook/addon-controls',
            '@storybook/addon-notes',
        ],
        // 背景色や表示位置、デバイスの設定など
        parameters: {
            // 背景色：カスタマイズする場合
            backgrounds: {
                default: 'brown',
                values: [
                    {
                        name: 'brown',
                        value: '#56371B'
                    },
                    {
                        name: 'light',
                        value: '#fff'
                    },
                    {
                        name: 'dark',
                        value: '#333'
                    },
                ]
            },
            // Description, Default, Controlsカラムの表示
            controls: {
                expanded: true
            },
            // 表示位置
            layout: 'centered', // centered:中央表示, padded:コンポーネントに余白付与, fullscreen:幅いっぱい
        }
    }
})