import { ref, onMounted } from 'vue';


// コメント情報のインタフェース
export interface Comment {
    iconId: number;
    comment: string;
    ipaddrHashed: string;
    createdAt: string;
}


// ベースURLの読み込み
const baseURL = import.meta.env.VITE_BASE_URL

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
        const response = await fetch(
            url, { credentials: 'include' }
        );
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
            }),
            credentials: 'include'
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