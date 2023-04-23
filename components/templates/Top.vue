<template>
    <v-app>
        <Header :logo="logo" :color="headerColor" :title="headerTitle" />
    </v-app>
</template>

<script>
import { defineComponent } from 'vue'
import Header from '@/components/organisms/Header.vue'

export default defineComponent({
    components: {
        Header
    },
    setup() {
        const logo = '/logo.png' // 画像のパスを指定してください
        const headerColor = ref('#FFFFFF')
        const headerTitle = ref('ratee')

        return {
            logo,
            headerColor,
            headerTitle
        }
    }
})
</script>