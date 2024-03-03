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

type ResponseData = {
    questionnaires: Questionnaire[];
    nextToken: string;
}


// ベースURLの読み込み
const baseURL = import.meta.env.VITE_BASE_URL

// ユーザID生成・更新
const updateUserId = async () => {
    const response = await fetch(`${baseURL}/user/guest/id`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });

    if (response.ok) {
        const resp = await response.json();
        resp.cookie
        console.log(resp);
    } else {
        console.error('ユーザID生成・更新APIの実行中にエラーが発生しました:', response.statusText);
    }
}

// アンケート一覧取得API
const getQuestionnaires = async (order: string): Promise<ResponseData> => {
    console.log("アンケート一覧取得API")
    try {
        const url = new URL(`${baseURL}/questionnaires`);
        const params = new URLSearchParams({
            order: order
        });
        url.search = params.toString();
        const response = await fetch(
            url, { credentials: 'include' }
        );
        if (response.ok) {
            const data = await response.json();
            console.log(data)
            return data;
        } else {
            console.error('アンケート一覧取得APIの実行中にエラーが発生しました:', response.statusText);
        }
    } catch (error) {
        console.error('アンケート一覧取得APIの実行中にエラーが発生しました:', error);
    }
    return { questionnaires: [], nextToken: '' };
}

// アンケート一覧取得API（続き）
const getNextQuestionnaires = async (order: string, nextToken: string): Promise<ResponseData> => {
    console.log("アンケート一覧取得API（続き）")
    try {
        const url = new URL(`${baseURL}/questionnaires`);
        const params = new URLSearchParams({
            nextToken: nextToken,
            order: order
        });
        url.search = params.toString();
        const response = await fetch(
            url, { credentials: 'include' }
        );
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.error('アンケート一覧取得APIの実行中にエラーが発生しました:', response.statusText);
        }
    } catch (error) {
        console.error('アンケート一覧取得APIの実行中にエラーが発生しました:', error);
    }
    return { questionnaires: [], nextToken: '' };
}

// アンケート一覧取得API（検索）
const getSearchQuestionnaires = async (type: string, word: string): Promise<ResponseData> => {
    console.log("アンケート一覧取得API（検索）")
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
        const response = await fetch(
            url, { credentials: 'include' }
        );
        if (response.ok) {
            const data = await response.json();
            console.log(data)
            return data;
        } else {
            console.error('アンケート一覧取得APIの実行中にエラーが発生しました:', response.statusText);
        }
    } catch (error) {
        console.error('アンケート一覧取得APIの実行中にエラーが発生しました:', error);
    }
    return { questionnaires: [], nextToken: '' }; // エラーが発生した場合やレスポンスがOKでない場合は空の配列を返す
}

// アンケート情報取得API
const getQuestionnaire = async (questionId: string) => {
    try {
        const url = new URL(`${baseURL}/questionnaire`);
        const params = new URLSearchParams({
            id: questionId,
        });
        url.search = params.toString();
        const response = await fetch(
            url, { credentials: 'include' }
        );
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
            }),
            credentials: 'include'
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
            }),
            credentials: 'include'
        });
        if (response.ok) {
            const data = await response.json();
            return true;
        } else {
            console.error('アンケート投稿APIの実行中にエラーが発生しました:', response.statusText);
            return false;
        }
    } catch (error) {
        console.error('アンケート投稿APIの実行中にエラーが発生しました:', error);
        return false;
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
        const response = await fetch(
            url, { credentials: 'include' }
        );
        if (response.ok) {
            const data = await response.json();
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

    const state = ref<ResponseData>({ questionnaires: [], nextToken: '' });
    const isLoading = ref(true);

    onMounted(async () => {
        await updateUserId();
        switch (target) {
            // アンケート一覧を取得
            case TARGET_QUESTIONNAIRES:
                isLoading.value = true;
                const qObject = await getQuestionnaires(TAB_ID1);
                state.value.questionnaires = qObject.questionnaires ? [...qObject.questionnaires] : state.value.questionnaires;
                state.value.nextToken = qObject.nextToken ? qObject.nextToken : '';
                isLoading.value = false;
                break;
            // おすすめアンケート一覧を取得
            case TARGET_RECOMMENDS:
                state.value = await getRecommendQuestionnaires(questionId);
                isLoading.value = false;
                break;
            default:
                break;
        }
    });

    // アンケート一覧再取得
    const reloadQuestionnaires = async () => {
        isLoading.value = true;
        const qObject = await getQuestionnaires(TAB_ID1);
        state.value.questionnaires = qObject.questionnaires ? [...qObject.questionnaires] : state.value.questionnaires;
        state.value.nextToken = qObject.nextToken ? qObject.nextToken : '';
        isLoading.value = false;
        return qObject.questionnaires;
    }

    // 続きのアンケート一覧を取得(無限スクロール)
    const scrollQuestionnaires = async (order: string, nextToken: string) => {
        isLoading.value = false;
        if (nextToken !== '') {
            const qObject = await getNextQuestionnaires(order, nextToken);
            if (qObject.questionnaires) {
                state.value.questionnaires.push(...qObject.questionnaires);
            }
            state.value.nextToken = qObject.nextToken ? qObject.nextToken : '';
        }
        isLoading.value = false;
    }

    // アンケートタブ切替
    const changeQuestionnaires = async (order: string) => {
        isLoading.value = true;
        if (state.value) {
            const qObject = await getQuestionnaires(order);
            state.value.questionnaires = qObject.questionnaires ? [...qObject.questionnaires] : state.value.questionnaires;
            state.value.nextToken = qObject.nextToken ? qObject.nextToken : '';
        }
        isLoading.value = false;
    }

    // アンケート検索
    const searchQuestionnaires = async (type: string, word: string) => {
        if (state.value) {
            const qObject = await getSearchQuestionnaires(type, word);
            state.value.questionnaires = qObject.questionnaires ? [...qObject.questionnaires] : state.value.questionnaires;
            state.value.nextToken = qObject.nextToken ? qObject.nextToken : '';
        }
    }

    // アンケート回答
    const answerQuestionnaire = async (questionId: string, choices: string[]) => {

        await postAnswer(questionId, choices);

        // アンケート回答APIが完了した後にアンケート一覧取得APIを実行
        if (state.value) {
            const qObject = await getQuestionnaires(TAB_ID1);
            state.value.questionnaires = qObject.questionnaires ? [...qObject.questionnaires] : state.value.questionnaires;
            state.value.nextToken = qObject.nextToken ? qObject.nextToken : '';
        }
    }

    // アンケート回答(検索タブ)
    const answerSearchQuestionnaire = async (questionId: string, choices: string[], type: string, word: string) => {

        await postAnswer(questionId, choices);

        // アンケート回答APIが完了した後にアンケート一覧取得API（検索）を実行
        if (state.value) {
            const qObject = await getSearchQuestionnaires(type, word);
            state.value.questionnaires = qObject.questionnaires ? [...qObject.questionnaires] : state.value.questionnaires;
            state.value.nextToken = qObject.nextToken ? qObject.nextToken : '';
        }
    }

    // アンケート作成
    const createQuestionnaire = async (title: string, choices: string[], categoryId: string, tags: string[], options: object) => {
        try {
            // アンケート投稿APIを実行し、成功したかどうかを確認
            const postResult = await postQuestionnaire(title, choices, categoryId, tags, options);
            console.log(postResult)
            if (!postResult) {
                return false; // 投稿に失敗した場合は false を返す
            }
    
            // アンケート一覧取得APIを実行
            if (state.value) {
                console.log("アンケート投稿後の一覧取得API");
                const qObject = await getQuestionnaires(TAB_ID1);
                console.log("アンケート再取得完了");
                state.value.questionnaires = qObject.questionnaires ? [...qObject.questionnaires] : state.value.questionnaires;
                state.value.nextToken = qObject.nextToken ? qObject.nextToken : '';
            }
            return true; // 成功時に true を返す
        } catch (error) {
            console.error("アンケート作成中にエラーが発生しました:", error);
            return false; // エラーが発生した場合は false を返す
        }
    }    

    const resetQuestionnaires = () => {
        if (state.value) {
            state.value.questionnaires = [];
            state.value.nextToken = '';
        }
    }

    return {
        state: readonly(state),
        isLoading,
        scrollQuestionnaires,
        changeQuestionnaires,
        searchQuestionnaires,
        answerQuestionnaire,
        answerSearchQuestionnaire,
        createQuestionnaire,
        resetQuestionnaires,
        reloadQuestionnaires
    }
}

// アンケート情報のStore定義
export const useQuestionnaire = (questionId: string) => {
    const state = ref<Questionnaire>(); // 初期値は空のオブジェクト
    const isLoading = ref(true);

    onMounted(async () => {
        state.value = await getQuestionnaire(questionId);
        console.log(state.value)
        isLoading.value = false;
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
        isLoading,
    }

}