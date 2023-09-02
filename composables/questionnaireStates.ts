import { ref, onMounted } from 'vue';
import { TARGET_QUESTIONNAIRES, TARGET_RECOMMENDS } from '@/constants';


// スタブモードの確認
const stubMode = import.meta.env.VITE_STUB_MODE;
console.log(stubMode + typeof (stubMode))

// 選択肢情報のインタフェース
export interface Choice {
    id: string;
    name: string;
    voteCount: number;
    reasons: string[];
}

// アンケート情報のインタフェース
export interface Questionnaire {
    id: string;
    content: string;
    choices: Choice[];
    category: string;
    tags: string[];
    isAnswered: boolean;
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

//アンケート投稿API
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


    if (stubMode === '0') {
        onMounted(async () => {
            switch(target) {
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
                    { name: "イヌ", voteCount: 12, reasons: ["可愛いから"] },
                    { name: "ネコ", voteCount: 10, reasons: ["猫しか勝たん"] },
                    { name: "ゾウ", voteCount: 6, reasons: ["強いから"] },
                    { name: "キリン", voteCount: 8, reasons: ["イカしてるから"] },
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
                    { name: "北海道", voteCount: 22, reasons: ["ご飯が美味しいから"] },
                    { name: "沖縄", voteCount: 18, reasons: ["海が綺麗だから"] },
                    { name: "京都", voteCount: 16, reasons: ["日本人だから"] },
                    { name: "福岡", voteCount: 17, reasons: ["博多グルメ最強"] },
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

        /*// 該当アンケートの存在チェック
        const question = state.value.find(q => q.id === questionId)
        if (!question) {
            console.error(`Question with ID "${questionId}" not found`)
            return
        }

        // 該当選択肢の存在チェック
        const choice = question.choices.find(c => c.name === choiceName)
        if (!choice) {
            console.error(`Choice with name "${choiceName}" not found in question "${questionId}"`)
            return
        }*/

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
        state.value = await getQuestionnaires();
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

    return {
        state: readonly(state),
    }

}