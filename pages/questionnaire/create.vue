<template>
    <div>
        <div v-if="categories.length">
            <CreateForm :categories="categories" />
        </div>
    </div>
</template>

<script lang="ts">
import CreateForm from '@/components/templates/CreateForm.vue'

export default {
    components: {
        CreateForm
    },

    setup() {
        // ベースURLの読み込み
        const baseURL = import.meta.env.VITE_BASE_URL;

        // カテゴリ情報取得API
        const getCategories = async () => {
            try {
                const response = await fetch(`${baseURL}/categories`);
                if (response.ok) {
                    const data = await response.json();
                    console.log(data.categories)
                    categories.value = data.categories;
                } else {
                    console.error('APIの呼び出しに失敗しました:', response.statusText);
                }
            } catch (error) {
                console.error('APIの呼び出しに失敗しました:', error);
            }
            return []; // エラーが発生した場合やレスポンスがOKでない場合は空の配列を返す
        }

        const categories = ref([]);  // 初期値として空の配列をセット

        onMounted(() => {
            getCategories();  // onMountedの中で非同期関数を呼び出す
        });

        return {
            categories
        }
    }
}
</script>