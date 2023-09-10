<template>
    <v-app>
        <Header :logo="logo" :title="headerTitle" />
        <DetailView style="margin:5%" :questionnaire="questionnaire" :answerQuestionnaire="answerQuestionnaire" />
        <RecommendBox v-if="recommends" style="margin:0 5%" :recommends="recommends" />
        <CommentBox v-if="comments" style="margin:5%" :comments="comments" />
        <Footer :buttonText="footerButtonText" />
    </v-app>
</template>

<script lang="ts">
import Header from '@/components/organisms/Header.vue'
import DetailView from '@/components/organisms/DetailView.vue'
import RecommendBox from '@/components/organisms/RecommendBox.vue'
import CommentBox from '@/components/organisms/CommentBox.vue'
import Footer from '@/components/organisms/Footer.vue'
import { Questionnaire, Comment } from '~/composables/questionnaireStates';

export default defineComponent({
    components: {
        Header,
        DetailView,
        RecommendBox,
        CommentBox,
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
    setup(props) {
        const logo = '/logo.png' // 画像のパスを指定してください
        const headerTitle = ref('ratee')
        const footerButtonText = ref('アンケートを作る')
        console.log(props.comments)

        return {
            logo,
            headerTitle,
            footerButtonText
        }
    }
})
</script>