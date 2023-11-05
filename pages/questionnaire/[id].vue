<template>
    <div v-if="!isLoading">
        <Questionnaire v-if="questionnaire" :questionnaire="questionnaire" :answerQuestionnaire="answerQuestionnaire"
            :comments="comments" :postComment="postComment" :recommends="recommends" />
        <InfiniteLoading :comments="comments" @infinite="load" :immediate-check="false" :reverse="false" :disabled="isInfiniteDisabled">
            <template #complete>
                <span>読み込み終了</span>
            </template>
        </InfiniteLoading>
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
import Questionnaire from '@/components/templates/Questionnaire.vue'
import { TARGET_RECOMMENDS, MAX_COUNT } from '@/constants';
import { InfiniteLoadingState } from '@/types';
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";

export default defineComponent({
    components: {
        Questionnaire,
        InfiniteLoading
    },
    setup() {
        const router = useRoute();
        const questionId = Array.isArray(router.params.id) ? router.params.id[0] : router.params.id;

        // アンケート情報取得
        const qStore = useQuestionnaire(questionId);
        const questionnaire = qStore.state;

        // アンケート回答
        const answerQuestionnaire = (id: string, name: string) => {
            qStore.answerQuestionnaire(id, [name]);
        }

        // おすすめアンケート一覧取得
        const rStore = useQuestionnaires(TARGET_RECOMMENDS, questionId);
        const recommends = rStore.state;

        // コメント一覧取得
        const cStore = useComments(questionId, "");
        const comments = ref([]);

        watchEffect(() => {
            comments.value = cStore.state.value.comments;
            console.log(cStore.state.value.nextToken)
        });
        const isLoading = cStore.isLoading;

        // 続きのコメント一覧を取得
        const scrollComments = async (nextToken: string) => {
            console.log('==start scrollComments==')
            await cStore.scrollComments(questionId, nextToken)
            console.log(cStore.state)
        };

        const isInfiniteDisabled = ref(false); // 無限スクロール制御変数の定義

        watchEffect(() => {
            if (cStore.state.value.nextToken === '') {
                isInfiniteDisabled.value = true;
            } else {
                isInfiniteDisabled.value = false;
            }
        });

        const load = async ($state: InfiniteLoadingState) => {
            if (isInfiniteDisabled.value) {
                return; // 無限ローディングが無効の場合は関数の処理を終了
            }
            try {
                if (cStore.state.value.nextToken !== '') {
                    console.log("nextTokenあり")
                    await scrollComments(cStore.state.value.nextToken);
                    $state.loaded();
                } else {
                    console.log("nextTokenなし")
                    await scrollComments(cStore.state.value.nextToken);
                    $state.complete();
                }
                // 最大件数に達したらローディング完了にする
                if (comments.length >= MAX_COUNT) {
                    $state.complete();
                } else {
                    $state.loaded();
                }
            } catch (error) {
                $state.error();
            }
        };

        // コメント投稿
        const postComment = (questionId: string, iconId: number, comment: string) => {
            cStore.sendComment(questionId, iconId, comment);
        }

        //コメントのリセット
        onBeforeUnmount(() => {
            cStore.resetComment();
        });

        return {
            questionnaire,
            answerQuestionnaire,
            recommends,
            comments,
            isLoading,
            load,
            isInfiniteDisabled,
            postComment
        }
    }
})
</script>