<template>
    <!-- スナックバーの追加 -->
    <SnackBar :snackbar="snackbar" :snackbarText="snackbarText" @update:snackbar="snackbar = $event" />
    <Top :questionnaires="questionnaires" :changeQuestionnaires="changeQuestionnaires"
        :searchQuestionnaires="searchQuestionnaires" :answerQuestionnaire="answerQuestionnaire"
        :answerSearchQuestionnaire="answerSearchQuestionnaire" :resetQuestionnaires="resetQuestionnaires"
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

import Top from '@/components/templates/Top.vue'
import SnackBar from '@/components/molecules/SnackBar.vue'
import { TARGET_QUESTIONNAIRES, TAB_ID1, MAX_COUNT, ERR_MSG } from '@/constants';
import { Questionnaire } from '~/composables/questionnaireStates';

export default {
    components: {
        Top,
        SnackBar
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
                    isInfiniteDisabled.value = true;
                }
                // 最大件数に達したらローディング完了にする
                if (questionnaires.length >= MAX_COUNT) {
                    $state.complete();
                    isInfiniteDisabled.value = true;
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

        const snackbar = ref(false); // スナックバーの表示状態
        const snackbarText = ref(''); // スナックバーに表示するテキスト

        // qStoreを監視し、エラーコードがあればスナックバーを表示
        watchEffect(() => {
            if (qStore.code.value !== '') {
                Object.entries(ERR_MSG);
                snackbarText.value = ERR_MSG[qStore.code.value];
                snackbar.value = true;
            }
        });

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
            resetQuestionnaires,
            snackbar,
            snackbarText,
        }
    }
}
</script>
