<template>
    <v-app>
        <Header :logo="logo" :title="headerTitle" />
        <ContentsView style="margin:5%" :questionnaires="questionnaires" />
        <Footer :buttonText="footerButtonText" />
    </v-app>
</template>

<script>
import { defineComponent, ref } from 'vue'
import Header from '@/components/organisms/Header.vue'
import ContentsView from '@/components/organisms/ContentsView.vue'
import Footer from '@/components/organisms/Footer.vue'

export default defineComponent({
    components: {
        Header,
        ContentsView,
        Footer
    },
    props: {
        questionnaires: {
            type: []
        }
    },
    setup() {
        const logo = '/logo.png' // 画像のパスを指定してください
        const headerTitle = ref('ratee')
        const footerButtonText = ref('アンケートを作る')

        return {
            logo,
            headerTitle,
            footerButtonText,
        }
    },
    
})
</script>