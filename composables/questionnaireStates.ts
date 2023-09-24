import { ref, onMounted } from 'vue';
import { TARGET_QUESTIONNAIRES, TARGET_RECOMMENDS } from '@/constants';


// スタブモードの確認
const stubMode = import.meta.env.VITE_STUB_MODE;

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

// コメント情報のインタフェース
export interface Comment {
    iconId: number;
    comment: string;
    ipaddrHashed: string;
    createdAt: string;
}


// ベースURLの読み込み
const baseURL = import.meta.env.VITE_BASE_URL

// アンケート一覧取得API
const getQuestionnaires = async () => {
    try {
        const response = await fetch(`${baseURL}/questionnaires`);
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

// コメント一覧取得API
const getComments = async (questionId: string, nextToken: string) => {
    const limit = 10; // 1リクエストあたりの取得件数
    try {
        const url = new URL(`${baseURL}/questionnaire/comments`);
        let params;
        if (nextToken !== "") {
            params = new URLSearchParams({
                id: questionId,
                nextToken: nextToken,
                limit: limit
            });
        } else {
            params = new URLSearchParams({
                id: questionId,
                limit: limit
            });
        }
        url.search = params.toString();
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data)
            return data.comments;
        } else {
            console.error('コメント一覧取得APIの実行中にエラーが発生しました:', response.statusText);
        }
    } catch (error) {
        console.error('コメント一覧取得APIの実行中にエラーが発生しました:', error);
    }
    return []; // エラーが発生した場合やレスポンスがOKでない場合は空の配列を返す
}

// コメント投稿API
const postComment = async (questionId: string, iconId: number, comment: string) => {

    try {
        const response = await fetch(`${baseURL}/questionnaire/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                questionnaireId: questionId,
                iconId: iconId,
                comment: comment
            })
        });
        if (response.ok) {
            const data = await response.json();
        } else {
            console.error('コメント投稿APIの実行中にエラーが発生しました:', response.statusText);
        }
    } catch (error) {
        console.error('コメント投稿APIの実行中にエラーが発生しました:', error);
    }
};


// アンケート一覧のStore定義
export const useQuestionnaires = (target: string, questionId: string) => {

    const state = ref<Questionnaire[]>([]); // 初期値は空の配列


    if (stubMode === '0') {
        onMounted(async () => {
            switch (target) {
                case TARGET_QUESTIONNAIRES:
                    state.value = await getQuestionnaires();
                    break;
                case TARGET_RECOMMENDS:
                    state.value = await getRecommendQuestionnaires(questionId);
                    break;
                default:
                    break;
            }
        });
    } else {
        // スタブモードの時は直接データを入れる
        state.value = [
            {
                id: "A01",
                content: "好きな動物は？",
                choices: [
                    { name: "イヌ", voteCount: 12 },
                    { name: "ネコ", voteCount: 10 },
                    { name: "ゾウ", voteCount: 6 },
                    { name: "キリン", voteCount: 8 },
                ],
                category: "生物",
                tags: ["ペット", "犬", "猫", "動物"],
                isAnswered: false,
                createdAt: "2019-08-24T14:15:22Z"
            },
            {
                id: "A02",
                content: "国内旅行するならどこ？",
                choices: [
                    { name: "北海道", voteCount: 22 },
                    { name: "沖縄", voteCount: 18 },
                    { name: "京都", voteCount: 16 },
                    { name: "福岡", voteCount: 17 },
                ],
                category: "旅行",
                tags: ["国内旅行", "都道府県", "日本"],
                isAnswered: false,
                createdAt: "2019-08-26T10:22:09Z"
            },
        ]
    }

    // アンケート回答
    const answerQuestionnaire = async (questionId: string, choices: string[]) => {

        // アンケート回答APIを実行
        if (stubMode === '0') {
            await postAnswer(questionId, choices);

            // アンケート回答APIが完了した後にアンケート一覧取得APIを実行
            state.value = await getQuestionnaires();
        } else {
            const target = state.value.find(item => item.id === questionId);
            if (target) {
                target.isAnswered = true;
            }
        }
    }


    // アンケート作成
    const createQuestionnaire = async (title: string, choices: string[], categoryId: string, tags: string[], options: object) => {

        // アンケート投稿APIを実行
        await postQuestionnaire(title, choices, categoryId, tags, options)

        // アンケート投稿APIが完了した後にアンケート一覧取得APIを実行
        state.value = [...await getQuestionnaires()];
    }

    return {
        state: readonly(state),
        answerQuestionnaire,
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

        // アンケート回答APIを実行
        if (stubMode === '0') {
            await postAnswer(questionId, choices);

            // アンケート回答APIが完了した後にアンケート一覧取得APIを実行
            state.value = await getQuestionnaire(questionId);
        } else {
            state.value.isAnswered = true;
        }
    }

    return {
        state: readonly(state),
        answerQuestionnaire,
    }

}

// コメント一覧のStore定義
export const useComments = (questionId: string, nextToken: string) => {
    const state = ref<Comment[]>([]); // 初期値は空の配列

    onMounted(async () => {
        state.value = await getComments(questionId, nextToken);
        console.log(state)
    });

    // コメント投稿
    const sendComment = async (questionId: string, iconId: number, comment: string) => {

        await postComment(questionId, iconId, comment);

        // コメント投稿APIが完了した後にコメント一覧取得APIを実行
        state.value = [...await getComments(questionId, "")];
    }

    return {
        state: readonly(state),
        sendComment
    }

}