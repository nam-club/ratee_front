<template>
    <v-app>
        <Header :logo="logo" :title="headerTitle" />
        <ContentsView :contentsBg="contentsBg" style="margin:5%"/>
        <Footer :buttonText="footerButtonText"/>
    </v-app>
</template>

<script>
import { defineComponent } from 'vue'
import Header from '@/components/organisms/Header.vue'
import ContentsView from '@/components/organisms/ContentsView.vue'
import Footer from '@/components/organisms/Footer.vue'

export default defineComponent({
    components: {
        Header,
        ContentsView,
        Footer
    },
    setup() {
        const logo = '/logo.png' // 画像のパスを指定してください
        const headerTitle = ref('ratee')
        const contentsBg = ref('#E8D5C4')
        const footerButtonText = ref('アンケートを作る')

        return {
            logo,
            headerTitle,
            contentsBg,
            footerButtonText
        }
    }
})
</script>