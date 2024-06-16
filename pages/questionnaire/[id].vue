<template>
    <div v-for="(message, index) in snackbarMessages" :key="index">
        <SnackBar :snackbar="message.show" :snackbarText="message.text" @update:snackbar="message.show = $event"
            :color="errorColor" />
    </div>
    <div v-if="!isQuestionnaireLoading">
        <Questionnaire :questionnaire="questionnaire" :answerQuestionnaire="answerQuestionnaire"
        :comments="comments" :postComment="postComment" :recommends="recommends" :chart="chart" :load="load"
        :isInfiniteDisabled="isInfiniteDisabled" />
    </div>
    <div v-else class="text-center center-content">
        <v-progress-circular indeterminate color="primary" :size=" 100 " :width=" 10 "></v-progress-circular>
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
        const snackbarMessages = ref<{ text: string; show: boolean }[]>([]); // スナックバーのメッセージを格納する配列

        // コメント一覧
        const cStore = ref(null); // cStoreをrefとして定義
        const comments = ref([]);

        // 時系列チャート
        const chStore = ref(null); // chStoreをrefとして定義
        const chart = ref({});

        // おすすめアンケート一覧
        const rStore = ref(null);
        const recommends = ref({});

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

        // アンケート情報取得後、時系列チャート・おすすめアンケート・コメント一覧取得を実行
        watchEffect(async () => {
            questionnaire.value = await qStore.state.value;
            console.log(questionnaire.value)

            // questionnaire.valueが存在し、isAnsweredがtrueでことを確認
            if (questionnaire.value?.isAnswered) {
                chStore.value = await useChart(questionId);
                chart.value = await chStore.value.state.chart;
                console.log(chart.value)

                rStore.value = await useRecommendQuestionnaires(questionId)
                recommends.value = await rStore.value.state.questionnaires;

                // enableCommentがtrueであることを確認
                if (questionnaire.value.enableComment) {
                    // cStoreの初期化
                    cStore.value = await useComments(questionId, "");
                    if (cStore.value && cStore.value.state) {
                        comments.value = await cStore.value.state.comments;
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
            }
            isQuestionnaireLoading.value = qStore.isLoading.value;
        });

        // アンケート回答
        const answerQuestionnaire = (id: string, name: string) => {
            qStore.answerQuestionnaire(id, name);
        }

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
            if (qStore.code && qStore.code.value !== '') {
                snackbarMessages.value.push({ text: ERR_MSG[qStore.code.value], show: true });
            }
            if (cStore.value && cStore.value.state && cStore.value.code && cStore.value.code !== '') {
                snackbarMessages.value.push({ text: ERR_MSG[cStore.value.code], show: true });
            }
            if (rStore.code && rStore.code.value !== '') {
                snackbarMessages.value.push({ text: ERR_MSG[rStore.code.value], show: true });
            }
            if (chStore.code && chStore.code.value !== '') {
                snackbarMessages.value.push({ text: ERR_MSG[chStore.code.value], show: true });
            }
        });

        return {
            questionnaire,
            isQuestionnaireLoading,
            answerQuestionnaire,
            recommends,
            comments,
            postComment,
            load,
            isInfiniteDisabled,
            chart,
            snackbarMessages,
            errorColor: mainTheme.colors?.error
        }
    }
})
</script>