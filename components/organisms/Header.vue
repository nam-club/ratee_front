<template>
    <v-app-bar class="px-0 app-bar">
        <v-btn v-if="isMobile" icon @click="toggleMenu">
            <v-icon>{{ icons.mdiMenu }}</v-icon>
        </v-btn>
        <img :src="logo" alt="Logo" height="50%" class="logo-img" />
        <nuxt-link to="/" style="text-decoration: none; color: inherit;">
            <v-app-bar-title>{{ title }}</v-app-bar-title>
        </nuxt-link>
        <v-spacer></v-spacer>
        <v-btn icon>
            <v-icon size="x-large">{{ icons.mdiGoogleAnalytics }}</v-icon>
        </v-btn>
    </v-app-bar>
</template>
  
<script>
import { defineComponent } from 'vue'
import {
    mdiMenu,
    mdiGoogleAnalytics,
} from '@mdi/js'

export default defineComponent({
    props: {
        // ヘッダーのロゴを定義
        logo: {
            type: String,
            required: true,
        },
        // ヘッダーのタイトルを定義
        title: {
            type: String,
            required: true,
        }
    },
    setup() {
        const icons = ref({
            mdiMenu,
            mdiGoogleAnalytics,
        })

        const isMobile = ref(false)

        const checkWidth = () => {
            isMobile.value = window.innerWidth < 960
        }

        onMounted(() => {
            window.addEventListener('resize', checkWidth)
            checkWidth()
        })

        onUnmounted(() => {
            window.removeEventListener('resize', checkWidth)
        })

        const toggleMenu = () => {
            // ここでハンバーガーメニューの開閉処理を行う
        }

        return {
            icons,
            isMobile,
            toggleMenu,
        }
    }
})
</script>

<style scoped>
.app-bar {
    border-bottom: 1px solid #ccc;
}

.logo-img {
    margin-left: 2%;
}
</style>
