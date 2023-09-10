<template>
    <v-app>
        <Header :logo="logo" :title="headerTitle" />
        <DetailView style="margin:5%" :questionnaire="questionnaire" :answerQuestionnaire="answerQuestionnaire" />
        <RecommendBox style="margin:0 5%" :recommends="recommends" />
        <Footer :buttonText="footerButtonText" />
    </v-app>
</template>

<script lang="ts">
import Header from '@/components/organisms/Header.vue'
import DetailView from '@/components/organisms/DetailView.vue'
import RecommendBox from '@/components/organisms/RecommendBox.vue'
import Footer from '@/components/organisms/Footer.vue'
import { Questionnaire, Comment } from '~/composables/questionnaireStates';

export default defineComponent({
    components: {
        Header,
        DetailView,
        RecommendBox,
        Footer
    },
    props: {
        questionnaire: {
            type: Object,
            required: true,
        },
        answerQuestionnaire: {
            type: Function,
            required: true
        },
        recommends: {
            type: Array as PropType<Questionnaire[]>
        },
        comments: {
            type: Array as PropType<Comment[]>
        },
    },
    setup() {
        const logo = '/logo.png' // 画像のパスを指定してください
        const headerTitle = ref('ratee')
        const footerButtonText = ref('アンケートを作る')

        return {
            logo,
            headerTitle,
            footerButtonText
        }
    }
})
</script>