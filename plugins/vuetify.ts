import { createVuetify } from 'vuetify'
import { MAIN_THEME, mainTheme, MAIN_DARK_THEME, mainDarkTheme } from '@/helpers/themes'
import { defaults } from '@/helpers/defaults'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'

export default defineNuxtPlugin((nuxtApp) => {
    const vuetify = createVuetify({
        ssr: true,
        defaults,
        display: {
            mobileBreakpoint: 'sm',
        },
        icons: {
            defaultSet: 'mdi',
            aliases,
            sets: {
                mdi,
            },
        },
        // add theme
        theme: {
            defaultTheme: MAIN_DARK_THEME,
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
    })

    nuxtApp.vueApp.use(vuetify)
})