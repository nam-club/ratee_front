import { ref, onMounted } from 'vue'

export interface Choice {
    id: string;
    name: string;
    voteCount: number;
    reasons: string[];
}

export interface Questionnaire {
    id: string;
    content: string;
    choices: Choice[];
    category: string;
    tags: string[];
    isAnswered: boolean;
    createdAt: string;
}

const baseURL = import.meta.env.VITE_BASE_URL;

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


// アンケート一覧
export const useQuestionnaires = () => {

    const state = ref<Questionnaire[]>([]); // 初期値は空の配列

    onMounted(async () => {
        state.value = await getQuestionnaires();
    });

    // アンケート回答
    const answerQuestionnaire = (questionId: string, choices: string[]) => {

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

        const answerQuestion = async () => {
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

                    // getQuestionnairesを非同期で呼び出し、結果をstate.valueにセット
                    state.value = await getQuestionnaires();
                } else {
                    console.error('APIの呼び出しに失敗しました:', response.statusText);
                }
            } catch (error) {
                console.error('APIの呼び出しに失敗しました:', error);
            }
        };

        answerQuestion();
    }

    return {
        state: readonly(state),
        answerQuestionnaire
    }
}