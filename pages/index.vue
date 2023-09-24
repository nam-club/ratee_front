<template>
    <div>
        <Top :questionnaires="questionnaires" :changeQuestionnaires="changeQuestionnaires" :searchQuestionnaires="searchQuestionnaires" :answerQuestionnaire="answerQuestionnaire" :answerSearchQuestionnaire="answerSearchQuestionnaire" :categories="categories"/>
    </div>
</template>

<script lang="ts">
import Top from '@/components/templates/Top.vue'
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

        // アンケートタブ検索
        const searchQuestionnaires = (type: string, word: string) => {
            qStore.searchQuestionnaires(type, word);
        }

        // アンケート回答
        const answerQuestionnaire = (id: string, name: string[]) => {
            qStore.answerQuestionnaire(id, name)
        }

        // アンケート回答(検索タブ)
        const answerSearchQuestionnaire = (id: string, name: string[], type: string, word: string) => {
            qStore.answerSearchQuestionnaire(id, name, type, word)
        }

        // カテゴリ一覧取得
        const cStore = useCategories();
        const categories = cStore.state;

        return {
            questionnaires,
            changeQuestionnaires,
            searchQuestionnaires,
            answerQuestionnaire,
            answerSearchQuestionnaire,
            categories,
        }
    }
}
</script>
