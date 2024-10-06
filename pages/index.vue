<template>
  <SnackBar
    :snackbar="snackbar"
    :snackbarText="snackbarText"
    @update:snackbar="snackbar = $event"
    :color="errorColor"
  />
  <Top
    :isApp="isApp"
    :nQuestionnaires="nQuestionnaires"
    :tQuestionnaires="tQuestionnaires"
    :rQuestionnaires="rQuestionnaires"
    :sQuestionnaires="sQuestionnaires"
    :searchQuestionnaires="searchQuestionnaires"
    :answerNewsQuestionnaire="answerNewsQuestionnaire"
    :answerTrendQuestionnaire="answerTrendQuestionnaire"
    :answerRankingQuestionnaire="answerRankingQuestionnaire"
    :answerSearchQuestionnaire="answerSearchQuestionnaire"
    :categories="categories"
    :isLoading="isLoading"
    :load="load"
    :isInfiniteDisabled="isInfiniteDisabled"
  />
</template>

<style scoped>
.center-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  /* 画面の高さに合わせて */
}
</style>

<script lang="ts">
import { ref, watchEffect } from "vue";
import { Category, InfiniteLoadingState } from "@/types";
import "v3-infinite-loading/lib/style.css";

import { mainTheme } from "@/helpers/themes";
import Top from "@/components/templates/Top.vue";
import SnackBar from "@/components/molecules/SnackBar.vue";
import {
  TAB_ID1,
  TAB_NUM1,
  TAB_ID2,
  TAB_ID3,
  TAB_ID4,
  MAX_COUNT,
  ERR_MSG,
} from "@/constants";
import { Questionnaire as QuestionnaireType } from "@/composables/questionnaireStates"; // Questionnaire型をインポート

export default {
  components: {
    Top,
    SnackBar,
  },
  setup() {
    const isApp = ref(false);

    // Store定義
    const commonStore = useStore();
    const newsStore = ref<any>();
    const trendStore = ref<any>();
    const rankingStore = ref<any>();
    const searchStore = ref<any>();
    const categoryStore = ref<any>();

    const nQuestionnaires = ref<QuestionnaireType[]>([]);
    const tQuestionnaires = ref<QuestionnaireType[]>([]);
    const rQuestionnaires = ref<QuestionnaireType[]>([]);
    const sQuestionnaires = ref<QuestionnaireType[]>([]);
    const categories = ref<Category[]>([]);

    const { data: commonData, pending: isLoading } = useAsyncData(
      "commonData",
      async () => {
        await commonStore.load();
        // commonStore.load()完了後にuseQuestionnairesを呼び出す
        newsStore.value = useQuestionnaires(TAB_ID1); // 新着
        await newsStore.value.loadQuestionnaires();
        trendStore.value = useQuestionnaires(TAB_ID2); // 急上昇
        await trendStore.value.loadQuestionnaires();
        rankingStore.value = useQuestionnaires(TAB_ID3); // ランキング
        await rankingStore.value.loadQuestionnaires();
        searchStore.value = useQuestionnaires(TAB_ID4); // 検索
        await searchStore.value.loadQuestionnaires();
        categoryStore.value = useCategories(); // カテゴリー
        await categoryStore.value.loadCategories();
        categories.value = categoryStore.value.state.slice();

        return { commonStore, newsStore, trendStore, rankingStore, searchStore };
      }
    );

    // それぞれのアンケートデータを監視
    watchEffect(() => {
      if (commonData.value?.newsStore?.state?.questionnaires) {
        nQuestionnaires.value = commonData.value.newsStore.state.questionnaires.map((q) => ({
          ...q,
          choices: q.choices.map((choice) => ({ ...choice })),
          tags: [...q.tags],
        }));
      }
    });

    watchEffect(() => {
      if (commonData.value?.trendStore?.state?.questionnaires) {
        tQuestionnaires.value = commonData.value.trendStore.state.questionnaires.map((q) => ({
          ...q,
          choices: q.choices.map((choice) => ({ ...choice })),
          tags: [...q.tags],
        }));
      }
    });

    watchEffect(() => {
      if (commonData.value?.rankingStore?.state?.questionnaires) {
        rQuestionnaires.value = commonData.value.rankingStore.state.questionnaires.map((q) => ({
          ...q,
          choices: q.choices.map((choice) => ({ ...choice })),
          tags: [...q.tags],
        }));
      }
    });

    watchEffect(() => {
      if (commonData.value?.searchStore?.state?.questionnaires) {
        sQuestionnaires.value = commonData.value.searchStore.state.questionnaires.map((q) => ({
          ...q,
          choices: q.choices.map((choice) => ({ ...choice })),
          tags: [...q.tags],
        }));
      }
    });

    // アンケートタブ検索
    const searchQuestionnaires = (type: string, word: string) => {
      if (searchStore) {
        searchStore.value.searchQuestionnaires(type, word);
      }
    };

    // アンケート回答(最新)
    const answerNewsQuestionnaire = (id: string, name: string[]) => {
      if (newsStore) {
        newsStore.value.answerQuestionnaire(id, name);
      }
    };

    // アンケート回答(急上昇)
    const answerTrendQuestionnaire = (id: string, name: string[]) => {
      if (trendStore) {
        trendStore.value.answerQuestionnaire(id, name);
      }
    };

    // アンケート回答(ランキング)
    const answerRankingQuestionnaire = (id: string, name: string[]) => {
      if (rankingStore) {
        rankingStore.value.answerQuestionnaire(id, name);
      }
    };

    // アンケート回答(検索タブ)
    const answerSearchQuestionnaire = (
      id: string,
      name: string[],
      type: string,
      word: string
    ) => {
      searchStore.value.answerSearchQuestionnaire(id, name, type, word);
    };

    // 続きのアンケート一覧を取得
    const scrollQuestionnaires = async (order: string, nextToken: string) => {
      if (newsStore) {
        await newsStore.value.scrollQuestionnaires(order, nextToken);
      }
    };

    const isInfiniteDisabled = ref(false); // 無限スクロール制御変数の定義

    watchEffect(() => {
      if (
        newsStore &&
        newsStore.value &&
        newsStore.value.state.nextToken === ""
      ) {
        isInfiniteDisabled.value = true;
      } else {
        isInfiniteDisabled.value = false;
      }
    });

    const load = async ($state: InfiniteLoadingState, tabNum: number) => {
      if (isInfiniteDisabled.value || tabNum !== TAB_NUM1) {
        $state.loaded();
        return; // 無限ローディングが無効の場合は関数の処理を終了
      }
      try {
        if (newsStore && newsStore.value.state.nextToken !== "") {
          await scrollQuestionnaires(TAB_ID1, newsStore.value.state.nextToken);
          $state.loaded();
        } else {
          await scrollQuestionnaires(TAB_ID1, newsStore.value.state.nextToken);
          $state.complete();
          isInfiniteDisabled.value = true;
        }
        // 最大件数に達したらローディング完了にする
        if (nQuestionnaires.value.length >= MAX_COUNT) {
          $state.complete();
          isInfiniteDisabled.value = true;
        } else {
          $state.loaded();
        }
      } catch (error) {
        $state.error();
      }
    };

    const snackbar = ref(false); // スナックバーの表示状態
    const snackbarText = ref(""); // スナックバーに表示するテキスト

    // storeを監視し、エラーコードがあればスナックバーを表示
    watchEffect(() => {
      if (
        newsStore.value &&
        newsStore.value.state &&
        newsStore.value.code !== ""
      ) {
        Object.entries(ERR_MSG);
        snackbarText.value = ERR_MSG[newsStore.value.code];
        snackbar.value = true;
      } else if (
        trendStore.value &&
        trendStore.value.state &&
        trendStore.value.code !== ""
      ) {
        Object.entries(ERR_MSG);
        snackbarText.value = ERR_MSG[trendStore.value.code];
        snackbar.value = true;
      } else if (
        rankingStore.value &&
        rankingStore.value.state &&
        rankingStore.value.code !== ""
      ) {
        Object.entries(ERR_MSG);
        snackbarText.value = ERR_MSG[rankingStore.value.code];
        snackbar.value = true;
      } else if (
        searchStore.value &&
        searchStore.value.state &&
        searchStore.value.code !== ""
      ) {
        Object.entries(ERR_MSG);
        snackbarText.value = ERR_MSG[searchStore.value.code];
        snackbar.value = true;
      }
    });

    return {
      isApp,
      nQuestionnaires,
      tQuestionnaires,
      rQuestionnaires,
      sQuestionnaires,
      isLoading,
      searchQuestionnaires,
      answerNewsQuestionnaire,
      answerTrendQuestionnaire,
      answerRankingQuestionnaire,
      answerSearchQuestionnaire,
      categories,
      load,
      isInfiniteDisabled,
      snackbar,
      snackbarText,
      errorColor: mainTheme.colors?.error,
    };
  },
};
</script>
