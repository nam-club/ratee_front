<template>
    <div>
        <Top :questionnaires="questionnaires" :changeQuestionnaires="changeQuestionnaires" :answerQuestionnaire="answerQuestionnaire" :categories="categories"/>
    </div>
</template>

<script lang="ts">
import Top from '@/components/templates/Top.vue'
import { useQuestionnaires } from '~/composables/questionnaireStates';
import { TARGET_QUESTIONNAIRES } from '@/constants';

export default {
    components: {
        Top
    },
    setup() {
        // アンケート一覧取得
        const qStore = useQuestionnaires(TARGET_QUESTIONNAIRES, '');
        const questionnaires = qStore.state;

        // アンケートタブ切替
        const changeQuestionnaires = (order: string) => {
            qStore.changeQuestionnaires(order);
        }

        // アンケート回答
        const answerQuestionnaire = (id: string, name: string[]) => {
            qStore.answerQuestionnaire(id, name)
        }

        // カテゴリ一覧取得
        const cStore = useCategories();
        const categories = cStore.state;

        return {
            questionnaires,
            changeQuestionnaires,
            answerQuestionnaire,
            categories,
        }
    }
}
</script>
