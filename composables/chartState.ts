import { ref, onMounted } from 'vue';


// チャート情報のインタフェース
export interface Chart {
    id: string;
    interval: string;
    data: {};
}

type ResponseData = {
    chart: Chart;
}

// ベースURLの読み込み
const baseURL = import.meta.env.VITE_BASE_URL

// 時系列チャート取得API
const getChart = async (questionId: string): Promise<ResponseData> => {
    try {
        const url = new URL(`${baseURL}/chart/questionnaire/answers-sum`);
        let params = new URLSearchParams({
            id: questionId
        });
        url.search = params.toString();
        const response = await fetch(
            url, { credentials: 'include' }
        );
        if (response.ok) {
            const data = await response.json();
            console.log(data)
            return { chart: data };
            /*const data = {
                "questionnaireId": "q_dc77293d-f734-4046-ace9-880ae6e7d106",
                "interval": "yearly",
                "data": {
                    "2021": {
                        "1": 100,
                        "2": 45,
                        "3": 76,
                        "4": 12
                    },
                    "2022": {
                        "1": 0,
                        "2": 121,
                        "3": 89,
                        "4": 45
                    },
                    "2023": {
                        "1": 18,
                        "2": 43,
                        "3": 443,
                        "4": 165
                    }
                }
            }*/
            return { chart: data }
        } else {
            console.error('時系列チャート取得APIの実行中にエラーが発生しました:', response.statusText);
        }
    } catch (error) {
        console.error('時系列チャート取得APIの実行中にエラーが発生しました:', error);
    }
    return { chart: { id: '', interval: '', data: {} } };
}

// 時系列チャートのStore定義
export const useChart = (questionId: string) => {
    const state = ref<ResponseData>({ chart: { id: questionId, interval: '', data: {} } });
    const isLoading = ref(true);

    // 時系列チャートの取得
    onMounted(async () => {
        const cObject = await getChart(questionId);
        state.value.chart.interval = cObject.chart.interval ? cObject.chart.interval : '';
        state.value.chart.data = cObject.chart.data ? cObject.chart.data : {};
        isLoading.value = false;
    });

    return {
        state: readonly(state),
        isLoading
    }

}