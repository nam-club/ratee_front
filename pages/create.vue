<template>
  <SnackBar
    :snackbar="snackbar"
    :snackbarText="snackbarText"
    @update:snackbar="snackbar = $event"
    :color="snackbarColor"
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
import { Category } from "@/types";
import CreateForm from "@/components/templates/CreateForm.vue";
import SnackBar from "@/components/molecules/SnackBar.vue";
import { HOME_LINK, TOAST_MSG, ERR_MSG, TAB_ID1 } from "@/constants";

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

    // Store定義
    const commonStore = useStore();
    const categoryStore = ref<any>();

    const categories = ref<Category[]>([]);

    onMounted(async () => {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.has("app")) {
        isApp.value = true;
      }
      // commonStore.load()の完了を待つ
      await commonStore.load();

      categoryStore.value = useCategories(); // カテゴリー
      await categoryStore.value.loadCategories();
      categories.value = categoryStore.value.state.slice();
    });

    // アンケート投稿
    const qStore = useQuestionnaires(TAB_ID1);
    const createQuestionnaire = async (
      title: string,
      choices: string[],
      categoryId: string,
      tags: string[],
      options: object
    ) => {
      try {
        await qStore.createQuestionnaire(
          title,
          choices,
          categoryId,
          tags,
          options
        );
        if (qStore.code.value === "") {
          snackbarText.value = TOAST_MSG.CREATED_QUESTIONNAIRE;
          snackbarColor.value = "";
          snackbar.value = true;
          router.push({ path: HOME_LINK, query: currentQuery });
        }
      } catch {
        if (qStore.code.value === "") {
          snackbarText.value = ERR_MSG["body.q.letters.out_of_range"];
        } else {
          snackbarText.value = ERR_MSG[qStore.code.value];
        }
        snackbarColor.value = mainTheme.colors?.error;
        snackbar.value = true;
      }
    };

    const snackbar = ref(false); // スナックバーの表示状態
    const snackbarText = ref(""); // スナックバーに表示するテキスト
    const snackbarColor = ref(mainTheme.colors?.error); // スナックバーの背景色

    // qStoreを監視し、エラーコードがあればスナックバーを表示
    watchEffect(() => {
      if (qStore.code.value !== "") {
        Object.entries(ERR_MSG);
        snackbarText.value = ERR_MSG[qStore.code.value];
        snackbarColor.value = mainTheme.colors?.error;
        snackbar.value = true;
      }
    });

    return {
      isApp,
      categories,
      createQuestionnaire,
      snackbar,
      snackbarText,
      snackbarColor,
    };
  },
};
</script>