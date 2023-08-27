import { ref, onMounted } from 'vue';

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
            console.error('APIの呼び出しに失敗しました:', response.statusText);
        }
    } catch (error) {
        console.error('APIの呼び出しに失敗しました:', error);
    }
    return []; // エラーが発生した場合やレスポンスがOKでない場合は空の配列を返す
}

// アンケート回答API
const postAnswer = async (questionId: string, choices: string[]) => {
    console.log(questionId)
    console.log(choices)

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
            console.error('APIの呼び出しに失敗しました:', response.statusText);
        }
    } catch (error) {
        console.error('APIの呼び出しに失敗しました:', error);
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
            console.error('APIの呼び出しに失敗しました:', response.statusText);
        }
    } catch (error) {
        console.error('APIの呼び出しに失敗しました:', error);
    }
};


// アンケート一覧のStore定義
export const useQuestionnaires = () => {

    const state = ref<Questionnaire[]>([]); // 初期値は空の配列

    onMounted(async () => {
        state.value = await getQuestionnaires();
    });

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
        await postAnswer(questionId, choices);

        // アンケート回答APIが完了した後にアンケート一覧取得APIを実行
        state.value = await getQuestionnaires();
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