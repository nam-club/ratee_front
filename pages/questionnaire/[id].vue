<template>
    <div v-for="(message, index) in snackbarMessages" :key="index">
        <SnackBar :snackbar="message.show" :snackbarText="message.text" @update:snackbar="message.show = $event"
            :color="errorColor" />
    </div>
    <div v-if="!isQuestionnaireLoading && !isCommentLoading && !isChartLoading && !isRecommendLoading">
        <Questionnaire :questionnaire="questionnaire" :answerQuestionnaire="answerQuestionnaire" :comments="comments"
            :postComment="postComment" :recommends="recommends" :chart="chart" :load="load"
            :isInfiniteDisabled="isInfiniteDisabled" />
    </div>
    <div v-else class="text-center center-content">
        <v-progress-circular indeterminate color="primary" :size="100" :width="10"></v-progress-circular>
    </div>
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
import { InfiniteLoadingState } from '@/types';
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";

import { mainTheme } from '@/helpers/themes'
import SnackBar from '@/components/molecules/SnackBar.vue'
import Questionnaire from '@/components/templates/Questionnaire.vue'
import { TARGET_RECOMMENDS, MAX_COUNT, ERR_MSG } from '@/constants';

export default defineComponent({
    components: {
        SnackBar,
        Questionnaire,
        InfiniteLoading
    },
    setup() {
        const router = useRoute();
        const questionId = Array.isArray(router.params.id) ? router.params.id[0] : router.params.id;
        const isQuestionnaireLoading = ref(true);
        const isRecommendLoading = ref(false);
        const isCommentLoading = ref(false);
        const isChartLoading = ref(true);
        const snackbarMessages = ref<{ text: string; show: boolean }[]>([]); // スナックバーのメッセージを格納する配列

        // コメント一覧取得
        const cStore = ref(null); // cStoreをrefとして定義
        const comments = ref([]);

        // コメント投稿関数をsetup関数の直下で定義
        const postComment = async (questionId: string, iconId: number, comment: string) => {
            if (cStore.value) {
                await cStore.value.sendComment(questionId, iconId, comment);
                console.log(cStore.value)
                comments.value = cStore.value.state.comments;
            } else {
                console.error("cStore is not initialized.");
            }
        };

        // 続きのコメント一覧を取得する関数もここに移動
        const scrollComments = async (nextToken: string) => {
            if (cStore.value) {
                console.log('==start scrollComments==')
                await cStore.value.scrollComments(questionId, nextToken)
            } else {
                console.error("cStore is not initialized.");
            }
        };

        // アンケート情報取得
        const qStore = useQuestionnaire(questionId);
        const questionnaire = ref({});

        // アンケート情報取得後、enableCommentがtrueの場合のみコメント一覧取得を実行
        watchEffect(async () => {
            questionnaire.value = qStore.state.value;
            isQuestionnaireLoading.value = qStore.isLoading.value;
            // questionnaire.valueが存在し、かつenableCommentがtrueであることを確認
            if (questionnaire.value && questionnaire.value.enableComment) {
                // cStoreの初期化
                isCommentLoading.value = true;
                cStore.value = await useComments(questionId, "");
                if (cStore.value && cStore.value.state) {
                    comments.value = cStore.value.state.comments;
                    console.log(comments.value)
                    isCommentLoading.value = cStore.value.isLoading.value;
                }

                watchEffect(() => {
                    if (cStore.value && cStore.value.state && cStore.value.state.nextToken === '') {
                        isInfiniteDisabled.value = true;
                    } else {
                        isInfiniteDisabled.value = false;
                    }
                });

                // コメントのリセットもここに移動
                onBeforeUnmount(() => {
                    cStore.value.resetComment();
                });
            }
        });

        // アンケート回答
        const answerQuestionnaire = (id: string, name: string) => {
            qStore.answerQuestionnaire(id, name);
        }

        // おすすめアンケート一覧取得
        const rStore = useQuestionnaires(TARGET_RECOMMENDS, '', questionId);
        const recommends = ref({});

        watchEffect(() => {
            recommends.value = rStore.state.value.questionnaires;
            isRecommendLoading.value = rStore.isLoading.value;
            console.log(recommends.value)
        });

        // 時系列チャート取得
        const chStore = useChart(questionId);
        const chart = ref({});

        watchEffect(() => {
            chart.value = chStore.state.value.chart;
            isChartLoading.value = chStore.isLoading.value;
        });

        const isInfiniteDisabled = ref(false); // 無限スクロール制御変数の定義

        const load = async ($state: InfiniteLoadingState) => {
            if (isInfiniteDisabled.value) {
                return; // 無限ローディングが無効の場合は関数の処理を終了
            }
            try {
                if (cStore.value && cStore.value.state && cStore.value.state.nextToken !== '') {
                    console.log("nextTokenあり")
                    await scrollComments(cStore.value.state.nextToken);
                    $state.loaded();
                } else {
                    console.log("nextTokenなし")
                    await scrollComments(cStore.value.state.nextToken);
                    $state.complete();
                    isInfiniteDisabled.value = true;
                }
                // 最大件数に達したらローディング完了にする
                if (comments.length >= MAX_COUNT) {
                    $state.complete();
                    isInfiniteDisabled.value = true;
                } else {
                    $state.loaded();
                }
            } catch (error) {
                $state.error();
            }
        };

        // qStoreとcStoreとrStoreを監視し、エラーコードがあればスナックバー用のメッセージ配列に追加
        watchEffect(() => {
            if (qStore.code.value !== '') {
                snackbarMessages.value.push({ text: ERR_MSG[qStore.code.value], show: true });
            }
            if (cStore.value && cStore.value.state && cStore.value.code !== '') {
                snackbarMessages.value.push({ text: ERR_MSG[cStore.value.code], show: true });
            }
            if (rStore.code.value !== '') {
                snackbarMessages.value.push({ text: ERR_MSG[rStore.code.value], show: true });
            }
            if (chStore.code.value !== '') {
                snackbarMessages.value.push({ text: ERR_MSG[chStore.code.value], show: true });
            }
        });

        return {
            questionnaire,
            isQuestionnaireLoading,
            answerQuestionnaire,
            recommends,
            isRecommendLoading,
            comments,
            isCommentLoading,
            postComment,
            load,
            isInfiniteDisabled,
            chart,
            isChartLoading,
            snackbarMessages,
            errorColor: mainTheme.colors?.error
        }
    }
})
</script>