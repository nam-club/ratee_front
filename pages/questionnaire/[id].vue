<template>
    <Questionnaire v-if="questionnaire" :questionnaire="questionnaire" />
</template>

<script lang="ts">
import Questionnaire from '@/components/templates/Questionnaire.vue'
import { useQuestionnaire } from '~/composables/questionnaireStates';

export default defineComponent({
    components: {
        Questionnaire,
    },
    setup() {
        const router = useRoute();
        const questionId = Array.isArray(router.params.id) ? router.params.id[0] : router.params.id;

        const qStore = useQuestionnaire(questionId);
        const questionnaire = qStore.state;

        return {
            questionnaire,
        }
    }
})
</script>