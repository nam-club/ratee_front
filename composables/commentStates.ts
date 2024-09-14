import { ref, onMounted } from 'vue';


// コメント情報のインタフェース
export interface Comment {
    iconId: number;
    comment: string;
    ipaddrHashed: string;
    createdAt: string;
}

type ResponseData = {
    comments: Comment[];
    nextToken: string;
    code: string;
    message: string;
}

// ベースURLの読み込み
const baseURL = import.meta.env.VITE_BASE_URL

// コメント一覧取得API
const getComments = async (questionId: string, nextToken: string): Promise<ResponseData> => {
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
        const data = await response.json();
        if (response.ok) {
            return { comments: data.comments, nextToken: data.nextToken };
        } else {
            console.error('コメント一覧取得APIの実行中にエラーが発生しました:', response.statusText);
            return { code: data.code, message: data.message };
        }
    } catch (error) {
        console.error('コメント一覧取得APIの実行中にエラーが発生しました:', error);
        return { code: data.code, message: data.message };
    }
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
        const data = await response.json();
        console.log(data)
        if (response.ok) {
            return { code: '', message: '' };
        } else {
            console.error('コメント投稿APIの実行中にエラーが発生しました:', response.statusText);
            return { code: data.code, message: data.message };
        }
    } catch (error) {
        console.error('コメント投稿APIの実行中にエラーが発生しました:', error);
        return { code: data.code, message: data.message };
    }
};


// コメント一覧のStore定義
export const useComments = async (questionId: string, nextToken: string) => {
    const state = ref<ResponseData>({ comments: [], nextToken: '' });
    const isLoading = ref(true);
    const code = ref('');

    // コメント一覧の取得(初回)
    const cObject = await getComments(questionId, nextToken);
    state.value.comments = cObject.comments ? [...cObject.comments] : state.value.comments;
    state.value.nextToken = cObject.nextToken ? cObject.nextToken : '';
    isLoading.value = false;
    code.value = cObject.code ? cObject.code : '';

    // 続きのコメント一覧を取得(無限スクロール)
    const scrollComments = async (questionId: string, nextToken: string) => {
        code.value = '';
        if (nextToken !== '') {
            const cObject = await getComments(questionId, nextToken);
            if (cObject.comments) {
                state.value.comments.push(...cObject.comments);
            }
            state.value.nextToken = cObject.nextToken ? cObject.nextToken : '';
            code.value = cObject.code ? cObject.code : '';
        }
    }

    // コメント投稿
    const sendComment = async (questionId: string, iconId: number, comment: string) => {

        code.value = '';
        const postResult = await postComment(questionId, iconId, comment);
        console.log(postResult)

        if (postResult.code !== '') {
            code.value = postResult.code;
            return false; // 投稿に失敗した場合は false を返す
        }

        // コメント投稿APIが完了した後にコメント一覧取得APIを実行
        if (code.value === '') {
            const cObject = await getComments(questionId, "");
            state.value.comments = cObject.comments ? [...cObject.comments] : state.value.comments;
            state.value.nextToken = cObject.nextToken ? cObject.nextToken : '';
            code.value = cObject.code ? cObject.code : '';
        }
    }

    // コメントのリセット
    const resetComment = () => {
        if (state.value) {
            state.value.comments = [];
            state.value.nextToken = '';
        }
    }

    return {
        state: readonly(state),
        isLoading,
        code,
        scrollComments,
        sendComment,
        resetComment
    }

}