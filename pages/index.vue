<template>
    <div v-if="!isLoading">
        <Top :questionnaires="questionnaires" :changeQuestionnaires="changeQuestionnaires"
            :searchQuestionnaires="searchQuestionnaires" :answerQuestionnaire="answerQuestionnaire"
            :answerSearchQuestionnaire="answerSearchQuestionnaire" :resetQuestionnaires="resetQuestionnaires" :categories="categories" />
        <InfiniteLoading :questionnaires="questionnaires" @infinite="load" :immediate-check="false" :reverse="false" :disabled="isInfiniteDisabled">
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
import { ref, watchEffect } from 'vue'
import Top from '@/components/templates/Top.vue'
import { TARGET_QUESTIONNAIRES, TAB_ID1, MAX_COUNT } from '@/constants';
import { InfiniteLoadingState } from '@/types';
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";

export default {
    components: {
        Top,
        InfiniteLoading
    },
    setup() {
        // アンケート一覧取得
        const qStore = useQuestionnaires(TARGET_QUESTIONNAIRES, '');
        const isLoading = qStore.isLoading;
        const questionnaires = ref([]);

        watchEffect(() => {
            questionnaires.value = qStore.state.value.questionnaires;
        });


        // アンケートタブ切替
        const changeQuestionnaires = (order: string) => {
            qStore.changeQuestionnaires(order);
        }

        // アンケートタブ検索
        const searchQuestionnaires = (type: string, word: string) => {
            qStore.searchQuestionnaires(type, word);
        }

        // アンケート回答
        const answerQuestionnaire = (id: string, name: string[]) => {
            qStore.answerQuestionnaire(id, name)
        }

        // アンケート回答(検索タブ)
        const answerSearchQuestionnaire = (id: string, name: string[], type: string, word: string) => {
            qStore.answerSearchQuestionnaire(id, name, type, word)
        }

        // カテゴリ一覧取得
        const cStore = useCategories();
        const categories = cStore.state;

        // 続きのアンケート一覧を取得
        const scrollQuestionnaires = async (order: string, nextToken: string) => {
            console.log('==start scrollQuestionnaires===')
            await qStore.scrollQuestionnaires(order, nextToken)
            console.log(qStore.state)
        };

        const isInfiniteDisabled = ref(false); // 無限スクロール制御変数の定義

        watchEffect(() => {
            if (qStore.state.value.nextToken === '') {
                isInfiniteDisabled.value = true;
            } else {
                isInfiniteDisabled.value = false;
            }
        });

        const load = async ($state: InfiniteLoadingState) => {
            console.log(qStore.state.value.nextToken)
            if (isInfiniteDisabled.value) {
                return; // 無限ローディングが無効の場合は関数の処理を終了
            }
            try {
                if (qStore.state.value.nextToken !== '') {
                    console.log("nextTokenあり")
                    await scrollQuestionnaires(TAB_ID1, qStore.state.value.nextToken);
                    $state.loaded();
                } else {
                    console.log("nextTokenなし")
                    await scrollQuestionnaires(TAB_ID1, qStore.state.value.nextToken);
                    $state.complete();
                }
                // 最大件数に達したらローディング完了にする
                if (questionnaires.length >= MAX_COUNT) {
                    $state.complete();
                } else {
                    $state.loaded();
                }
            } catch (error) {
                $state.error();
            }
        };

        //アンケートのリセット
        onBeforeUnmount(() => {
            resetQuestionnaires();
        });

        // アンケートのリセット
        const resetQuestionnaires = async () => {
            await qStore.resetQuestionnaires();
        }

        return {
            questionnaires,
            isLoading,
            changeQuestionnaires,
            searchQuestionnaires,
            answerQuestionnaire,
            answerSearchQuestionnaire,
            categories,
            load,
            isInfiniteDisabled,
            resetQuestionnaires
        }
    }
}
</script>
