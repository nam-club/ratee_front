<template>
    <SnackBar :snackbar="snackbar" :snackbarText="snackbarText" @update:snackbar="snackbar = $event" :color="errorColor" />
    <div v-if="categories.length">
        <CreateForm :categories="categories" :createQuestionnaire="createQuestionnaire" />
    </div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router';
import { mainTheme } from '@/helpers/themes'
import CreateForm from '@/components/templates/CreateForm.vue'
import SnackBar from '@/components/molecules/SnackBar.vue'
import { TARGET_QUESTIONNAIRES, ERR_MSG, TAB_ID1 } from '@/constants';

export default {
    components: {
        CreateForm,
        SnackBar
    },

    setup() {
        const router = useRouter();
        
        // カテゴリ一覧取得
        const cStore = useCategories();
        const categories = cStore.state;

        // アンケート投稿
        const qStore = useQuestionnaires(TAB_ID1);
        const createQuestionnaire = async (title: string, choices: string[], categoryId: string, tags: string[], options: object) => {
            await qStore.createQuestionnaire(title, choices, categoryId, tags, options);
            if (qStore.code.value === '') {
                router.push('/');
            }
        }

        const snackbar = ref(false); // スナックバーの表示状態
        const snackbarText = ref(''); // スナックバーに表示するテキスト

        // qStoreを監視し、エラーコードがあればスナックバーを表示
        watchEffect(() => {
            console.log(qStore.code.value)
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
            errorColor: mainTheme.colors?.error
        }
    }
}
</script>