import { ref, onMounted } from 'vue'

export interface Choice {
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

// アンケート一覧
export const useQuestionnaires = () => {

    const state = ref<Questionnaire[]>([]); // 初期値は空の配列
    const baseURL = import.meta.env.VITE_BASE_URL;
    console.log(baseURL)

    const fetchData = async () => {
        try {
            const response = await fetch(`${baseURL}/questionnaires`);
            if (response.ok) {
                const data = await response.json();
                state.value = data.questionnaires;  // ここでquestionnairesキーのデータを取得
                console.log(state.value);
            } else {
                console.error('APIの呼び出しに失敗しました:', response.statusText);
            }
        } catch (error) {
            console.error('APIの呼び出しに失敗しました:', error);
        }
    };

    onMounted(fetchData); // コンポーネントがマウントされたときにAPIを呼び出す

    const incrementVoteCount = (questionId: string, choiceName: string) => {

        // 該当アンケートの存在チェック
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
        }

        choice.voteCount++
        question.isAnswered = true;

        return choice.voteCount;
    }

    return {
        state: readonly(state),
        incrementVoteCount
    }
}