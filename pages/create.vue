<template>
  <SnackBar
    :snackbar="snackbar"
    :snackbarText="snackbarText"
    @update:snackbar="snackbar = $event"
    :color="errorColor"
  />
  <div v-if="categories.length">
    <CreateForm
      :categories="categories"
      :createQuestionnaire="createQuestionnaire"
      :isApp="isApp"
    />
  </div>
</template>

<script lang="ts">
import { useRouter } from "vue-router";
import { mainTheme } from "@/helpers/themes";
import CreateForm from "@/components/templates/CreateForm.vue";
import SnackBar from "@/components/molecules/SnackBar.vue";
import { HOME_LINK, ERR_MSG, TAB_ID1 } from "@/constants";

export default {
  components: {
    CreateForm,
    SnackBar,
  },

  setup() {
    const router = useRouter();
    const route = useRoute();
    // 現在のクエリパラメータを取得
    const currentQuery = route.query;

    const isApp = ref(false);

    onMounted(() => {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.has("app")) {
        isApp.value = true;
      }
    });

    // カテゴリ一覧取得
    const cStore = useCategories();
    const categories = cStore.state;

    // アンケート投稿
    const qStore = useQuestionnaires(TAB_ID1);
    const createQuestionnaire = async (
      title: string,
      choices: string[],
      categoryId: string,
      tags: string[],
      options: object
    ) => {
      await qStore.createQuestionnaire(
        title,
        choices,
        categoryId,
        tags,
        options
      );
      if (qStore.code.value === "") {
        router.push({path: HOME_LINK, query: currentQuery});
      }
    };

    const snackbar = ref(false); // スナックバーの表示状態
    const snackbarText = ref(""); // スナックバーに表示するテキスト

    // qStoreを監視し、エラーコードがあればスナックバーを表示
    watchEffect(() => {
      if (qStore.code.value !== "") {
        Object.entries(ERR_MSG);
        snackbarText.value = ERR_MSG[qStore.code.value];
        snackbar.value = true;
      }
    });

    return {
      isApp,
      categories,
      createQuestionnaire,
      snackbar,
      snackbarText,
      errorColor: mainTheme.colors?.error,
    };
  },
};
</script>