<template>
    <v-app class="bg-background">
        <Header />
        <div style="margin:0 0 20% 0">
            <DetailView :class="{ 'detail_mobile': mobile, 'detail': !mobile }" :questionnaire="questionnaire"
                :answerQuestionnaire="answerQuestionnaire" :chart="chart" />
            <RecommendBox v-if="recommends && recommends.length !== 0" :recommends="recommends" />
            <CommentBox v-if="questionnaire.enableComment && questionnaire.isAnswered" :questionId="questionnaire.id"
                :comments="comments" :postComment="postComment" :load="load" :isInfiniteDisabled="isInfiniteDisabled" />
        </div>
        <Footer :buttonText="footerButtonText" />
    </v-app>
</template>

<style scoped>
.detail {
    margin: 5%;
}

.detail_mobile {
    margin: 20% 5% 0% 5%;
}
</style>

<script lang="ts">
import { useDisplay } from 'vuetify';
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
            type: Array as PropType<Questionnaire[]>,
            default: [],
        },
        comments: {
            type: Array as PropType<Comment[]>,
            default: [],
        },
        postComment: {
            type: Function,
            required: true
        },
        chart: {
            type: Object,
            required: true,
        },
        load: {
            type: Function,
            required: true
        },
        isInfiniteDisabled: {
            type: Boolean,
            required: true,
        }
    },
    setup(props) {
        const { mobile } = useDisplay()

        const footerButtonText = ref('アンケートを作る')
        console.log(props.comments)
        console.log(props.recommends)

        return {
            mobile,
            footerButtonText
        }
    }
})
</script>