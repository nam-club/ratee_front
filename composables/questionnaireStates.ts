interface Choice {
    name: string;
    voteCount: number;
    reasons: string[];
}

interface Questionnaire {
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

    const state = useState<Questionnaire[]>('questionnaires', () => [
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
    ])

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