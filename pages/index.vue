<template>
    <SnackBar :snackbar="snackbar" :snackbarText="snackbarText" @update:snackbar="snackbar = $event" :color="errorColor" />
    <Top :nQuestionnaires="nQuestionnaires" :tQuestionnaires="tQuestionnaires" :rQuestionnaires="rQuestionnaires"
        :sQuestionnaires="sQuestionnaires" :searchQuestionnaires="searchQuestionnaires"
        :answerNewsQuestionnaire="answerNewsQuestionnaire" :answerTrendQuestionnaire="answerTrendQuestionnaire"
        :answerRankingQuestionnaire="answerRankingQuestionnaire" :answerSearchQuestionnaire="answerSearchQuestionnaire"
        :categories="categories" :isLoading="isLoading" :load="load" :isInfiniteDisabled="isInfiniteDisabled" />
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
import "v3-infinite-loading/lib/style.css";

import { mainTheme } from '@/helpers/themes'
import Top from '@/components/templates/Top.vue'
import SnackBar from '@/components/molecules/SnackBar.vue'
import { TARGET_QUESTIONNAIRES, TAB_ID1, TAB_NUM1, TAB_ID2, TAB_ID3, TAB_ID4, MAX_COUNT, ERR_MSG } from '@/constants';
import { Questionnaire } from '~/composables/questionnaireStates';

export default {
    components: {
        Top,
        SnackBar
    },
    setup() {
        // アンケート一覧取得(新着)
        const newsStore = useQuestionnaires(TAB_ID1);   // 新着
        const isLoading = newsStore.isLoading;
        const nQuestionnaires = ref<Questionnaire[]>([]);

        watch(() => newsStore.state.value.questionnaires, (newVal) => {
            nQuestionnaires.value = newVal.map(q => ({
                ...q,
                choices: q.choices.map(choice => ({ ...choice })),
                tags: [...q.tags]  // `tags`を新しい配列に展開
            }));
        }, { deep: true });

        // アンケート一覧取得(急上昇)
        const trendStore = useQuestionnaires(TAB_ID2);
        const tQuestionnaires = ref<Questionnaire[]>([]);

        watch(() => trendStore.state.value.questionnaires, (newVal) => {
            tQuestionnaires.value = newVal.map(q => ({
                ...q,
                choices: q.choices.map(choice => ({ ...choice })),
                tags: [...q.tags]  // `tags`を新しい配列に展開
            }));
        }, { deep: true });

        // アンケート一覧取得(ランキング)
        const rankingStore = useQuestionnaires(TAB_ID3);
        const rQuestionnaires = ref<Questionnaire[]>([]);

        watch(() => rankingStore.state.value.questionnaires, (newVal) => {
            rQuestionnaires.value = newVal.map(q => ({
                ...q,
                choices: q.choices.map(choice => ({ ...choice })),
                tags: [...q.tags]  // `tags`を新しい配列に展開
            }));
        }, { deep: true });

        // アンケート一覧取得(検索)
        const searchStore = useQuestionnaires(TAB_ID4);
        const sQuestionnaires = ref<Questionnaire[]>([]);

        watch(() => searchStore.state.value.questionnaires, (newVal) => {
            sQuestionnaires.value = newVal.map(q => ({
                ...q,
                choices: q.choices.map(choice => ({ ...choice })),
                tags: [...q.tags]  // `tags`を新しい配列に展開
            }));
        }, { deep: true });

        // アンケートタブ検索
        const searchQuestionnaires = (type: string, word: string) => {
            searchStore.searchQuestionnaires(type, word);
        }

        // アンケート回答(最新)
        const answerNewsQuestionnaire = (id: string, name: string[]) => {
            newsStore.answerQuestionnaire(id, name)
        }

        // アンケート回答(急上昇)
        const answerTrendQuestionnaire = (id: string, name: string[]) => {
            trendStore.answerQuestionnaire(id, name)
        }

        // アンケート回答(ランキング)
        const answerRankingQuestionnaire = (id: string, name: string[]) => {
            rankingStore.answerQuestionnaire(id, name)
        }

        // アンケート回答(検索タブ)
        const answerSearchQuestionnaire = (id: string, name: string[], type: string, word: string) => {
            searchStore.answerSearchQuestionnaire(id, name, type, word)
        }

        // カテゴリ一覧取得
        const cStore = useCategories();
        const categories = cStore.state;

        // 続きのアンケート一覧を取得
        const scrollQuestionnaires = async (order: string, nextToken: string) => {
            await newsStore.scrollQuestionnaires(order, nextToken)
        };

        const isInfiniteDisabled = ref(false); // 無限スクロール制御変数の定義

        watchEffect(() => {
            if (newsStore.state.value.nextToken === '') {
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
                if (newsStore.state.value.nextToken !== '') {
                    await scrollQuestionnaires(TAB_ID1, newsStore.state.value.nextToken);
                    $state.loaded();
                } else {
                    await scrollQuestionnaires(TAB_ID1, newsStore.state.value.nextToken);
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
        const snackbarText = ref(''); // スナックバーに表示するテキスト

        // storeを監視し、エラーコードがあればスナックバーを表示
        watchEffect(() => {
            if (newsStore.code.value !== '') {
                Object.entries(ERR_MSG);
                snackbarText.value = ERR_MSG[newsStore.code.value];
                snackbar.value = true;
            } else if(trendStore.code.value !== '') {
                Object.entries(ERR_MSG);
                snackbarText.value = ERR_MSG[trendStore.code.value];
                snackbar.value = true;
            } else if(rankingStore.code.value !== '') {
                Object.entries(ERR_MSG);
                snackbarText.value = ERR_MSG[rankingStore.code.value];
                snackbar.value = true;
            } else if(searchStore.code.value !== '') {
                Object.entries(ERR_MSG);
                snackbarText.value = ERR_MSG[searchStore.code.value];
                snackbar.value = true;
            }
        });

        return {
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
            errorColor: mainTheme.colors?.error
        }
    }
}
</script>
