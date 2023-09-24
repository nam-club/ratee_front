<template>
    <div>
        <Top :questionnaires="questionnaires" :answerQuestionnaire="answerQuestionnaire"/>
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

        // アンケート回答
        const answerQuestionnaire = (id: string, name: string[]) => {
            qStore.answerQuestionnaire(id, name)
        }

        return {
            questionnaires,
            answerQuestionnaire,
        }
    }
}
</script>
