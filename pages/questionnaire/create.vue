<template>
    <!-- スナックバーの追加 -->
    <SnackBar :snackbar="snackbar" :snackbarText="snackbarText" @update:snackbar="snackbar = $event" />
    <div v-if="categories.length">
        <CreateForm :categories="categories" :createQuestionnaire="createQuestionnaire" />
    </div>
</template>

<script lang="ts">
import CreateForm from '@/components/templates/CreateForm.vue'
import SnackBar from '@/components/molecules/SnackBar.vue'
import { TARGET_QUESTIONNAIRES, ERR_MSG } from '@/constants';

export default {
    components: {
        CreateForm,
        SnackBar
    },

    setup() {
        // カテゴリ一覧取得
        const cStore = useCategories();
        const categories = cStore.state;

        // アンケート投稿
        const qStore = useQuestionnaires(TARGET_QUESTIONNAIRES, '');
        const createQuestionnaire = async (title: string, choices: string[], categoryId: string, tags: string[], options: object) => {
            await qStore.createQuestionnaire(title, choices, categoryId, tags, options);
        }

        const snackbar = ref(false); // スナックバーの表示状態
        const snackbarText = ref(''); // スナックバーに表示するテキスト

        // qStoreを監視し、エラーコードがあればスナックバーを表示
        watchEffect(() => {
            if (qStore.code.value !== '') {
                Object.entries(ERR_MSG);
                snackbarText.value = ERR_MSG[qStore.code.value];
                snackbar.value = true;
            }
        });

        return {
            categories,
            createQuestionnaire,
            snackbar,
            snackbarText,
        }
    }
}
</script>