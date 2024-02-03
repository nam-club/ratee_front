<template>
    <Top :questionnaires="questionnaires" :changeQuestionnaires="changeQuestionnaires"
        :searchQuestionnaires="searchQuestionnaires" :answerQuestionnaire="answerQuestionnaire"
        :answerSearchQuestionnaire="answerSearchQuestionnaire" :resetQuestionnaires="resetQuestionnaires"
        :categories="categories" :isLoading="isLoading" />
    <InfiniteLoading :questionnaires="questionnaires" @infinite="load" :immediate-check="false" :reverse="false"
        :disabled="isInfiniteDisabled">
        <template #complete>
            <span>読み込み終了</span>
        </template>
    </InfiniteLoading>
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
import { InfiniteLoadingState } from '@/types';
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";
import Top from '@/components/templates/Top.vue'
import { TARGET_QUESTIONNAIRES, TAB_ID1, MAX_COUNT } from '@/constants';
import { Questionnaire } from '~/composables/questionnaireStates';

export default {
    components: {
        Top,
        InfiniteLoading
    },
    setup() {
        // アンケート一覧取得
        const qStore = useQuestionnaires(TARGET_QUESTIONNAIRES, '');
        const isLoading = qStore.isLoading;
        const questionnaires = ref<Questionnaire[]>([]);

        watch(() => qStore.state.value.questionnaires, (newVal) => {
            console.log("アンケート一覧を最新化します。")
            questionnaires.value = newVal.map(q => ({
                ...q,
                choices: q.choices.map(choice => ({ ...choice })),
                tags: [...q.tags]  // `tags`を新しい配列に展開
            }));
            console.log(questionnaires.value)
        }, { deep: true });

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
