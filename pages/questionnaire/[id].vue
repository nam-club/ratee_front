<template>
    <Questionnaire v-if="questionnaire" :questionnaire="questionnaire" :answerQuestionnaire="answerQuestionnaire" :comments="comments" :recommends="recommends" />
</template>

<script lang="ts">
import Questionnaire from '@/components/templates/Questionnaire.vue'
import { useQuestionnaire, Comment } from '~/composables/questionnaireStates';
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

        // コメント一覧取得
        const comments = ref<readonly Comment[]>([]);  // 初期値として空のコメント配列をセット
        if(questionnaire) {
            const cStore = useComments(questionId, "");
            comments.value = cStore.state;
            console.log(comments)
        }

        // アンケート回答
        const answerQuestionnaire = (id: string, name: string) => {
            qStore.answerQuestionnaire(id, [name])
        }

        // おすすめアンケート一覧取得
        const rStore = useQuestionnaires(TARGET_RECOMMENDS, questionId);
        const recommends = rStore.state;

        return {
            questionnaire,
            answerQuestionnaire,
            recommends,
            comments
        }
    }
})
</script>