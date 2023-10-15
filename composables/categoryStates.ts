import { ref, onMounted } from 'vue';
import { Category } from '@/types';

// ベースURLの読み込み
const baseURL = import.meta.env.VITE_BASE_URL

// カテゴリ情報取得API
const getCategories = async () => {
    try {
        const url = new URL(`${baseURL}/categories`);
        const response = await fetch(
            url, { credentials: 'include' }
        );
        if (response.ok) {
            const data = await response.json();
            return data.categories;
        } else {
            console.error('カテゴリ一覧取得APIの呼び出しに失敗しました:', response.statusText);
        }
    } catch (error) {
        console.error('カテゴリ一覧取得APIの呼び出しに失敗しました:', error);
    }
    return []; // エラーが発生した場合やレスポンスがOKでない場合は空の配列を返す
}

// カテゴリ一覧のStore定義
export const useCategories = () => {
    const state = ref<Category[]>([]); // 初期値は空の配列

    onMounted(async () => {
        state.value = [...await getCategories()];
    });

    return {
        state: readonly(state),
    }

}