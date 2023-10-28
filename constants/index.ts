export const TARGET_QUESTIONNAIRES = "QUESTIONNAIRES";
export const TARGET_RECOMMENDS = "RECOMMENDS";

// タブ
export const TAB_ID1 = "news";
export const TAB_NAME1 = "新着";
export const TAB_ID2 = "trend";
export const TAB_NAME2 = "急上昇";
export const TAB_ID3 = "ranking";
export const TAB_NAME3 = "ランキング";
export const TAB_ID4 = "search";
export const TAB_NAME4 = "検索";

// アンケート作成フォーム
export const FORM_CAPTION_REQUIRED_LABEL = "必須";
export const FORM_TITLE_TEXT = "質問";
export const FORM_TITLE_LABEL = "質問を入力してください。";
export const FORM_CHOICE_TEXT = "選択肢";
export const FORM_ADD_CHOICE_TEXT = "選択肢を追加する。";
export const FORM_CATEGORY_TEXT = "カテゴリ";
export const FORM_TAG_TEXT = "タグ";
export const FORM_TAG_LABEL = "追加したいタグを入力してください。";
export const FORM_COMMENT_LABEL = "コメントを有効にする";
export const FORM_MULTI_LABEL = "複数の回答を有効にする";


// 検索ボックス
export const SEARCH_LABEL = "検索ワードを入力";
export const SEARCH_TYPES = [FORM_TITLE_TEXT, FORM_CATEGORY_TEXT, FORM_TAG_TEXT];

// アンケート取得件数
export const MAX_COUNT = 9999;

// バリデーションチェック
export const TITLE_MIN_LENGTH = 1; // アンケート質問の最低文字数
export const TITLE_MAX_LENGTH = 40; // アンケート質問の最大文字数
export const CHOICES_MIN_LENGTH = 2; // アンケート選択肢の最低数
export const CHOICES_MAX_LENGTH = 10; // アンケート選択肢の最大数
export const CHOICE_MIN_LENGTH = 1; // アンケート選択肢の最低文字数
export const CHOICE_MAX_LENGTH = 10; // アンケート選択肢の最大文字数
export const TAGS_MIN_LENGTH = 0; // アンケートタグの最低数
export const TAGS_MAX_LENGTH = 10; // アンケートタグの最大数
export const TAG_MIN_LENGTH = 1; // アンケートタグの最低文字数
export const TAG_MAX_LENGTH = 10; // アンケートタグの最大文字数
export const FORM_ERR_TITLE = '入力内容にエラーがあります。'; // アンケート投稿でのエラータイトル
export const FORM_ERR_TEXT = '各項目を確認してください。'; // アンケート投稿でのエラーメッセージ
export const COMMENT_MIN_LENGTH = 1; // アンケート質問の最低文字数
export const COMMENT_MAX_LENGTH = 40; // アンケート質問の最大文字数
export const COMMENT_NULL_TEXT = 'コメントを入力してください。' // コメントのデフォルトおよびエラーメッセージ