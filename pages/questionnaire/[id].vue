<template>
  <div v-for="(message, index) in snackbarMessages" :key="index">
    <SnackBar
      :snackbar="message.show"
      :snackbarText="message.text"
      @update:snackbar="message.show = $event"
    />
  </div>

  <!-- ローディング中のインジケーター -->
  <div v-if="isQuestionnaireLoading" class="text-center center-content">
    <v-progress-circular
      indeterminate
      color="primary"
      :size="100"
      :width="10"
    ></v-progress-circular>
  </div>

  <!-- コンテンツが揃ったらQuestionnaireを表示 -->
  <div v-else-if="questionnaire && comments && recommends">
    <Questionnaire
      :isApp="isApp"
      :questionnaire="questionnaire"
      :answerQuestionnaire="answerQuestionnaire"
      :comments="comments"
      :postComment="postComment"
      :postReport="postReport"
      :recommends="recommends"
      :chart="chart"
      :load="load"
      :isInfiniteDisabled="isInfiniteDisabled"
    />
  </div>
</template>

<script lang="ts">
import { InfiniteLoadingState } from "@/types";
import "v3-infinite-loading/lib/style.css";

import { mainTheme } from "@/helpers/themes";
import SnackBar from "@/components/molecules/SnackBar.vue";
import Questionnaire from "@/components/templates/Questionnaire.vue";
import { Questionnaire as QuestionnaireType } from "@/composables/questionnaireStates"; // Questionnaire型をインポート
import { MAX_COUNT, ERR_MSG, TOAST_MSG } from "@/constants";

export default defineComponent({
  components: {
    SnackBar,
    Questionnaire,
  },
  setup() {
    const isApp = ref(false);

    // 共通Store
    const commonStore = useStore();

    // ローディングフラグ
    const isQuestionnaireLoading = ref(true);
    const isChartLoading = ref(true);
    const isInfiniteDisabled = ref(false);
    const snackbarMessages = ref<
      { text: string; show: boolean; color: string }[]
    >([]);

    // コメント、チャート、アンケート、リコメンドの各データ
    const questionnaire = ref<QuestionnaireType>({
      id: "",
      content: "",
      choices: [],
      category: "",
      tags: [],
      isAnswered: false,
      enableComment: false,
      enableMultiAnswer: false,
      createdAt: "",
    });
    const comments = ref([]);
    const chart = ref({});
    const recommends = ref([]);

    // 各データストア
    const qStore = ref<any>(); // qStoreをrefで初期化
    const cStore = ref<any>(); // cStoreをrefで初期化
    const chStore = ref<any>(); // chStoreをrefで初期化
    const rStore = ref<any>(); // rStoreをrefで初期化

    // ページパラメータ
    const router = useRoute();
    const questionId = Array.isArray(router.params.id)
      ? router.params.id[0]
      : router.params.id;

    onMounted(async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has("app")) {
          isApp.value = true;
        }

        // commonStore.load()の完了を待つ
        await commonStore.load();

        // アンケート情報の取得
        qStore.value = useQuestionnaire(questionId);
        await qStore.value.loadQuestionnaire();

        // stateが正しく取得できたか確認
        if (qStore.value.state) {
          questionnaire.value = qStore.value.state;
        }

        isQuestionnaireLoading.value = false;

        // 回答済みかどうかのチェックと追加データの取得
        if (questionnaire.value.isAnswered) {
          const [chartResult, recommendsResult, commentsResult] =
            await Promise.all([
              useChart(questionId),
              useRecommends(questionId),
              questionnaire.value.enableComment
                ? useComments(questionId, "")
                : Promise.resolve(null),
            ]);

          // チャート結果の処理
          if (chartResult) {
            chStore.value = chartResult;
            chart.value = chStore.value.state.chart;
            isChartLoading.value = false;
          }

          // おすすめアンケートの結果処理
          if (recommendsResult) {
            rStore.value = recommendsResult;
            recommends.value = rStore.value.state;
          }

          // コメントの処理
          if (commentsResult) {
            cStore.value = commentsResult;
            comments.value = cStore.value.state.comments || [];
          }
        } else {
          isChartLoading.value = false;
        }
      } catch (error) {
        console.error("データの取得中にエラーが発生しました:", error);
        isQuestionnaireLoading.value = false; // エラーが発生してもロードフラグをfalseにする
      }
    });

    // アンケート回答
    const answerQuestionnaire = async (id: string, name: string) => {
      try {
        await qStore.value.answerQuestionnaire(id, name);
        snackbarMessages.value.push({
          text: TOAST_MSG.ANSWERED_QUESTIONNAIRE,
          show: true,
          color: '',
        });
      } catch {
        snackbarMessages.value.push({
          text: ERR_MSG[qStore.value.code],
          show: true,
          color: mainTheme.colors?.error || "error",
        });
      }
    };

    // コメント投稿関数
    const postComment = async (
      questionId: string,
      iconId: number,
      comment: string
    ) => {
      if (cStore) {
        try {
          await cStore.value.sendComment(questionId, iconId, comment);
          comments.value = cStore.value.state.comments;
          snackbarMessages.value.push({
            text: TOAST_MSG.POSTED_COMMENT,
            show: true,
            color: '',
          });
        } catch {
          snackbarMessages.value.push({
            text: ERR_MSG[cStore.value.code],
            show: true,
            color: mainTheme.colors?.error || "error",
          });
        }
      }
    };

    // 続きのコメント一覧を取得する関数
    const scrollComments = async (nextToken: string) => {
      if (cStore) {
        await cStore.value.scrollComments(questionId, nextToken);
      }
    };

    // アンケート通報関数
    const postReport = async (questionId: string, reason: string) => {
      if (qStore) {
        try {
        await qStore.value.reportQuestionnaire(questionId, reason);
        snackbarMessages.value.push({
            text: TOAST_MSG.REPORTED_QUESTIONNAIRE,
            show: true,
            color: '',
          });
        }catch {
          snackbarMessages.value.push({
            text: ERR_MSG[qStore.value.code],
            show: true,
            color: mainTheme.colors?.error || "error",
          });
        }
      }
    };

    // 無限スクロール
    const load = async ($state: InfiniteLoadingState) => {
      // 無限スクロールが無効の場合や、スクロール領域がない場合は処理を終了
      if (isInfiniteDisabled.value || !cStore) {
        $state.complete();
        return;
      }

      try {
        // nextToken がある場合は次のコメントをロード
        if (cStore.value.state.nextToken !== "") {
          await scrollComments(cStore.value.state.nextToken);
          $state.loaded();
        } else {
          $state.complete();
          isInfiniteDisabled.value = true;
        }

        // コメントの数が最大件数に達した場合はロード完了にする
        if (comments.value.length >= MAX_COUNT) {
          $state.complete();
          isInfiniteDisabled.value = true;
        } else {
          $state.loaded();
        }
      } catch (error) {
        $state.error();
      }
    };

    // スナックバーのエラーメッセージ処理
    watchEffect(() => {
      if (qStore.value && qStore.value.code) {
        snackbarMessages.value.push({
          text: ERR_MSG[qStore.value.code],
          show: true,
          color: mainTheme.colors?.error || "error",
        });
      }
      if (cStore.value && cStore.value.code) {
        snackbarMessages.value.push({
          text: ERR_MSG[cStore.value.code],
          show: true,
          color: mainTheme.colors?.error || "error",
        });
      }
      if (rStore.value && rStore.value.code) {
        snackbarMessages.value.push({
          text: ERR_MSG[rStore.value.code],
          show: true,
          color: mainTheme.colors?.error || "error",
        });
      }
      if (chStore.value && chStore.value.code) {
        snackbarMessages.value.push({
          text: ERR_MSG[chStore.value.code],
          show: true,
          color: mainTheme.colors?.error || "error",
        });
      }
    });

    return {
      isApp,
      questionnaire,
      answerQuestionnaire,
      recommends,
      comments,
      postComment,
      postReport,
      load,
      isInfiniteDisabled,
      chart,
      isQuestionnaireLoading,
      isChartLoading,
      snackbarMessages,
    };
  },
});
</script>