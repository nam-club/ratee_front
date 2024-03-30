import { ref, onMounted } from 'vue';


// チャート情報のインタフェース
export interface Chart {
    id: string;
    interval: string;
    data: {};
}

type ResponseData = {
    chart: Chart;
    code: string;
    message: string;
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
        const data = await response.json();
        if (response.ok) {
            return { chart: data };
        } else {
            console.error('時系列チャート取得APIの実行中にエラーが発生しました:', response.statusText);
            return { code: data.code, message: data.message };
        }
    } catch (error) {
        console.error('時系列チャート取得APIの実行中にエラーが発生しました:', error);
        return { code: data.code, message: data.message };
    }
}

// 時系列チャートのStore定義
export const useChart = (questionId: string) => {
    const state = ref<ResponseData>({ chart: { id: questionId, interval: '', data: {} } });
    const isLoading = ref(true);
    const code = ref('');

    // 時系列チャートの取得
    onMounted(async () => {
        const cObject = await getChart(questionId);
        state.value.chart.interval = cObject.chart.interval ? cObject.chart.interval : '';
        state.value.chart.data = cObject.chart.data ? cObject.chart.data : {};
        isLoading.value = false;
        code.value = cObject.code ? cObject.code : '';
    });

    return {
        state: readonly(state),
        isLoading,
        code
    }

}