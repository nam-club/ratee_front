import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import { MAIN_THEME, mainTheme, MAIN_DARK_THEME, mainDarkTheme } from '@/helpers/themes'
import { defaults } from '@/helpers/defaults'

export default defineNuxtPlugin(nuxtApp => {
    const vuetify = createVuetify({
        ssr: true,
        components,
        directives,
        defaults,
        display: {
            mobileBreakpoint: 'sm',
        },
        // add icons
        icons: {
            defaultSet: 'mdi',
            aliases,
            sets: {
                mdi,
            },
        },
        // add theme
        theme: {
            defaultTheme: MAIN_THEME,
            themes: {
                mainTheme,
                mainDarkTheme,
            },
            // primary-darken-9 primary-lighten-9 までできるようにする
            variations: {
                colors: ['primary', 'secondary', 'accent'],
                lighten: 9,
                darken: 9,
            },
        },
        // 他の設定をここに記述していく
    })

    // Vue.js で Vuetify を使用する
    nuxtApp.vueApp.use(vuetify)
})