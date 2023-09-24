<template>
    <Questionnaire v-if="questionnaire" :questionnaire="questionnaire" :answerQuestionnaire="answerQuestionnaire"
        :comments="comments" :postComment="postComment" :recommends="recommends" />
</template>

<script lang="ts">
import Questionnaire from '@/components/templates/Questionnaire.vue'
import { TARGET_RECOMMENDS } from '@/constants';

export default defineComponent({
    components: {
        Questionnaire,
    },
    setup() {
        const router = useRoute();
        const questionId = Array.isArray(router.params.id) ? router.params.id[0] : router.params.id;

        // アンケート情報取得
        const qStore = useQuestionnaire(questionId);
        const questionnaire = qStore.state;

        // アンケート回答
        const answerQuestionnaire = (id: string, name: string) => {
            qStore.answerQuestionnaire(id, [name]);
        }

        // おすすめアンケート一覧取得
        const rStore = useQuestionnaires(TARGET_RECOMMENDS, questionId);
        const recommends = rStore.state;

        // コメント一覧取得
        const cStore = useComments(questionId, "");
        const comments = cStore.state;

        // コメント投稿
        const postComment = (questionId: string, iconId: number, comment: string) => {
            cStore.sendComment(questionId, iconId, comment);
        }

        return {
            questionnaire,
            answerQuestionnaire,
            recommends,
            comments,
            postComment
        }
    }
})
</script>