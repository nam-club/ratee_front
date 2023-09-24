<template>
    <div>
        <div v-if="categories.length">
            <CreateForm :categories="categories" :createQuestionnaire="createQuestionnaire" />
        </div>
    </div>
</template>

<script lang="ts">
import CreateForm from '@/components/templates/CreateForm.vue'
import { TARGET_QUESTIONNAIRES } from '@/constants';

export default {
    components: {
        CreateForm
    },

    setup() {
        // カテゴリ一覧取得
        const cStore = useCategories();
        const categories = cStore.state;

        // アンケート投稿
        const qStore = useQuestionnaires(TARGET_QUESTIONNAIRES, '');
        const createQuestionnaire = (title: string, choices: string[], categoryId: string, tags: string[], options: object) => {
            qStore.createQuestionnaire(title, choices, categoryId, tags, options);
        }

        return {
            categories,
            createQuestionnaire
        }
    }
}
</script>