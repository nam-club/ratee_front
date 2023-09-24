import { ref, onMounted } from 'vue';
import { TARGET_QUESTIONNAIRES, TARGET_RECOMMENDS, TAB_ID1, TAB_ID4, FORM_TITLE_TEXT, FORM_CATEGORY_TEXT, FORM_TAG_TEXT } from '@/constants';

// 選択肢情報のインタフェース
export interface Choice {
    name: string;
    voteCount: number;
}

// アンケート情報のインタフェース
export interface Questionnaire {
    id: string;
    content: string;
    choices: Choice[];
    category: string;
    tags: string[];
    isAnswered: boolean;
    enableMultiAnswer: boolean;
    createdAt: string;
}


// ベースURLの読み込み
const baseURL = import.meta.env.VITE_BASE_URL

// アンケート一覧取得API
const getQuestionnaires = async (order: string) => {
    try {
        const url = new URL(`${baseURL}/questionnaires`);
        const params = new URLSearchParams({
            order: order
        });
        url.search = params.toString();
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            return data.questionnaires;
        } else {
            console.error('アンケート一覧取得APIの実行中にエラーが発生しました:', response.statusText);
        }
    } catch (error) {
        console.error('アンケート一覧取得APIの実行中にエラーが発生しました:', error);
    }
    return []; // エラーが発生した場合やレスポンスがOKでない場合は空の配列を返す
}

// アンケート一覧取得API（検索）
const getSearchQuestionnaires = async (type: string, word: string) => {
    try {
        const url = new URL(`${baseURL}/questionnaires`);
        let params;
        switch (type) {
            case FORM_TITLE_TEXT:
                params = new URLSearchParams({
                    order: TAB_ID4,
                    filterContent: word
                });
                break;
            case FORM_CATEGORY_TEXT:
                params = new URLSearchParams({
                    order: TAB_ID4,
                    filterCategory: word
                });
                break;
            case FORM_TAG_TEXT:
                params = new URLSearchParams({
                    order: TAB_ID4,
                    filterTag: word
                });
                break;
            default:
                params = new URLSearchParams({
                    order: TAB_ID4,
                });
                break;
        }
        url.search = params.toString();
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            return data.questionnaires;
        } else {
            console.error('アンケート一覧取得APIの実行中にエラーが発生しました:', response.statusText);
        }
    } catch (error) {
        console.error('アンケート一覧取得APIの実行中にエラーが発生しました:', error);
    }
    return []; // エラーが発生した場合やレスポンスがOKでない場合は空の配列を返す
}

// アンケート情報取得API
const getQuestionnaire = async (questionId: string) => {
    try {
        const url = new URL(`${baseURL}/questionnaire`);
        const params = new URLSearchParams({
            id: questionId,
        });
        url.search = params.toString();
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.error('アンケート情報取得APIの実行中にエラーが発生しました:', response.statusText);
        }
    } catch (error) {
        console.error('アンケート情報取得APIの実行中にエラーが発生しました:', error);
    }
    return []; // エラーが発生した場合やレスポンスがOKでない場合は空の配列を返す
}

// アンケート回答API
const postAnswer = async (questionId: string, choices: string[]) => {

    try {
        const response = await fetch(`${baseURL}/questionnaire/answer`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                questionnaireId: questionId,
                answers: choices
            })
        });
        if (response.ok) {
            const data = await response.json();
        } else {
            console.error('アンケート回答APIの実行中にエラーが発生しました:', response.statusText);
        }
    } catch (error) {
        console.error('アンケート回答APIの実行中にエラーが発生しました:', error);
    }
};

// アンケート投稿API
const postQuestionnaire = async (title: string, choices: string[], categoryId: string, tags: string[], options: object) => {

    try {
        const response = await fetch(`${baseURL}/questionnaire`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: title,
                choices: choices,
                categoryId: categoryId,
                tags: tags,
                options: options
            })
        });
        if (response.ok) {
            const data = await response.json();
        } else {
            console.error('アンケート投稿APIの実行中にエラーが発生しました:', response.statusText);
        }
    } catch (error) {
        console.error('アンケート投稿APIの実行中にエラーが発生しました:', error);
    }
};

// おすすめアンケート一覧取得API
const getRecommendQuestionnaires = async (questionId: string) => {
    try {
        const url = new URL(`${baseURL}/questionnaire/recommends`);
        const params = new URLSearchParams({
            id: questionId,
        });
        url.search = params.toString();
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data)
            return data;
        } else {
            console.error('おすすめアンケート一覧取得APIの実行中にエラーが発生しました:', response.statusText);
        }
    } catch (error) {
        console.error('おすすめアンケート一覧取得APIの実行中にエラーが発生しました:', error);
    }
    return []; // エラーが発生した場合やレスポンスがOKでない場合は空の配列を返す
}


// アンケート一覧のStore定義
export const useQuestionnaires = (target: string, questionId: string) => {

    const state = ref<Questionnaire[]>([]); // 初期値は空の配列
    onMounted(async () => {
        switch (target) {
            // アンケート一覧を取得
            case TARGET_QUESTIONNAIRES:
                state.value = await getQuestionnaires(TAB_ID1);
                break;
            // おすすめアンケート一覧を取得
            case TARGET_RECOMMENDS:
                state.value = await getRecommendQuestionnaires(questionId);
                break;
            default:
                break;
        }
    });

    // アンケートタブ切替
    const changeQuestionnaires = async (order: string) => {
        state.value = [...await getQuestionnaires(order)];
    }

    // アンケート検索
    const searchQuestionnaires = async (type: string, word: string) => {
        state.value = [...await getSearchQuestionnaires(type, word)];
    }

    // アンケート回答
    const answerQuestionnaire = async (questionId: string, choices: string[]) => {

        await postAnswer(questionId, choices);

        // アンケート回答APIが完了した後にアンケート一覧取得APIを実行
        state.value = [...await getQuestionnaires(TAB_ID1)];
    }

    // アンケート回答(検索タブ)
    const answerSearchQuestionnaire = async (questionId: string, choices: string[], type: string, word: string) => {

        await postAnswer(questionId, choices);

        // アンケート回答APIが完了した後にアンケート一覧取得API（検索）を実行
        state.value = [...await getSearchQuestionnaires(type, word)];
    }

    // アンケート作成
    const createQuestionnaire = async (title: string, choices: string[], categoryId: string, tags: string[], options: object) => {

        // アンケート投稿APIを実行
        await postQuestionnaire(title, choices, categoryId, tags, options)

        // アンケート投稿APIが完了した後にアンケート一覧取得APIを実行
        state.value = [...await getQuestionnaires(TAB_ID1)];
    }

    return {
        state: readonly(state),
        changeQuestionnaires,
        searchQuestionnaires,
        answerQuestionnaire,
        answerSearchQuestionnaire,
        createQuestionnaire
    }
}

// アンケート情報のStore定義
export const useQuestionnaire = (questionId: string) => {
    const state = ref<Questionnaire>(); // 初期値は空のオブジェクト

    onMounted(async () => {
        state.value = await getQuestionnaire(questionId);
    });

    // アンケート回答
    const answerQuestionnaire = async (questionId: string, choices: string[]) => {

        await postAnswer(questionId, choices);

        // アンケート回答APIが完了した後にアンケート情報取得APIを実行
        state.value = await getQuestionnaire(questionId);
    }

    return {
        state: readonly(state),
        answerQuestionnaire,
    }

}