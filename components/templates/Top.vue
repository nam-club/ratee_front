<template>
    <v-app>
        <Header :logo="logo" :title="headerTitle" />
        <ContentsView :contentsBg="contentsBg" style="margin:5%"/>
    </v-app>
</template>

<script>
import { defineComponent } from 'vue'
import Header from '@/components/organisms/Header.vue'
import ContentsView from '@/components/organisms/ContentsView.vue'

export default defineComponent({
    components: {
        Header,
        ContentsView
    },
    setup() {
        const logo = '/logo.png' // 画像のパスを指定してください
        const headerTitle = ref('ratee')
        const contentsBg = ref('#E8D5C4')

        return {
            logo,
            headerTitle,
            contentsBg
        }
    }
})
</script>