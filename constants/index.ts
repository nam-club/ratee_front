import {
    mdiListBox, mdiPencilBox
} from '@mdi/js'

export const TARGET_QUESTIONNAIRES = "QUESTIONNAIRES";
export const TARGET_RECOMMENDS = "RECOMMENDS";

/** メニュー */
export const MENUS = [
    {title: "アンケート一覧", path: "/", icon: mdiListBox}, 
    {title: "アンケート作成", path: "/questionnaire/create", icon: mdiPencilBox}
];

/** タブ */
export const TAB_LENGTH = 4; // タブの数（一覧画面）
export const TAB_ID1 = "news";
export const TAB_NAME1 = "新着";
export const TAB_NUM1 = 1;
export const TAB_ID2 = "trend";
export const TAB_NAME2 = "急上昇";
export const TAB_NUM2 = 2;
export const TAB_ID3 = "ranking";
export const TAB_NAME3 = "ランキング";
export const TAB_NUM3 = 3;
export const TAB_ID4 = "search";
export const TAB_NAME4 = "検索";
export const TAB_NUM4 = 4;

export const DETAIL_TAB_LENGTH = 2; // タブの数（詳細画面）
export const DETAIL_TAB_NAME1 = "投票数";
export const DETAIL_TAB_NUM1 = 1;
export const DETAIL_TAB_NAME2 = "投票推移";
export const DETAIL_TAB_NUM2 = 2;

/** アンケート作成フォーム */
export const FORM_CAPTION_REQUIRED_LABEL = "必須";
export const FORM_TITLE_TEXT = "質問";
export const FORM_TITLE_LABEL = "質問を入力してください。";
export const FORM_CHOICE_TEXT = "選択肢";
export const FORM_ADD_CHOICE_TEXT = "＋ 選択肢を追加する";
export const FORM_CATEGORY_TEXT = "カテゴリ";
export const FORM_TAG_TEXT = "タグ";
export const FORM_TAG_LABEL = "追加したいタグを入力してください。";
export const FORM_COMMENT_LABEL = "コメントを有効にする";
export const FORM_MULTI_LABEL = "複数の回答を有効にする";

/** 検索ボックス */
export const SEARCH_LABEL = "検索ワードを入力";
export const SEARCH_TYPES = [FORM_TITLE_TEXT, FORM_CATEGORY_TEXT, FORM_TAG_TEXT];

/** アンケート・コメント取得件数 */
export const MAX_COUNT = 9999;

/** コメントボックス */
export const COMMENT_BUTTON = "コメントを投稿する";

/** バリデーションチェック */
export const TITLE_MIN_LENGTH = 4; // アンケート質問の最低文字数
export const TITLE_MAX_LENGTH = 40; // アンケート質問の最大文字数
export const CHOICES_MIN_LENGTH = 2; // アンケート選択肢の最低数
export const CHOICES_MAX_LENGTH = 10; // アンケート選択肢の最大数
export const CHOICE_MIN_LENGTH = 1; // アンケート選択肢の最低文字数
export const CHOICE_MAX_LENGTH = 20; // アンケート選択肢の最大文字数
export const TAGS_MIN_LENGTH = 0; // アンケートタグの最低数
export const TAGS_MAX_LENGTH = 10; // アンケートタグの最大数
export const TAG_MIN_LENGTH = 1; // アンケートタグの最低文字数
export const TAG_MAX_LENGTH = 10; // アンケートタグの最大文字数
export const FORM_ERR_TITLE = '入力内容にエラーがあります。'; // アンケート投稿でのエラータイトル
export const FORM_ERR_TEXT = '各項目を確認してください。'; // アンケート投稿でのエラーメッセージ
export const COMMENT_MIN_LENGTH = 1; // アンケート質問の最低文字数
export const COMMENT_MAX_LENGTH = 40; // アンケート質問の最大文字数
export const COMMENT_NULL_TEXT = 'コメントを入力してください。' // コメントのデフォルトおよびエラーメッセージ

/** 画像パス */
export const TITLE_IMG = '/logo.png';

/** エラーメッセージ */
export const ERR_MSG: Record<string, string> = {
    // リクエストで必要なパラメータが不足している
    'missing_required_params': 'エラーが発生しました。',
    // ゲストユーザの認証に失敗
    'guest_auth_failed': 'ユーザ認証に失敗しました。',    
    // ページングに範囲外の数値を指定している      
    'page.limit.out_of_range': '読み込みに失敗しました。',
     // ページングに不正なフォーマットの値を指定している
    'limit.invalid_value': '読み込みに失敗しました。',
    // ユーザがアンケートに未回答
    'user.not_yet_answered': '読み込みに失敗しました。アンケートに未回答のため表示できません。',
    // ユーザがアンケートに回答済み
    'user.already_answered': 'アンケート回答に失敗しました。既に回答済のアンケートです。',
    // 指定された期間で一つのIPアドレスからアンケートに回答できる件数が上限に達した
    'ip_addr.reach_limit': 'アンケート回答上限に達しました。時間を置いてお試しください。',
    // アンケートのコメントが無効
    'q.comment_disabled': 'コメント投稿に失敗しました。コメントが禁止されたアンケートです。',
    // アンケートが存在しない
    'q.is_not_exists': '読み込みに失敗しました。アンケートが存在しません。',
    // 選択肢が存在しない
    'choice.is_not_exists': 'アンケート回答に失敗しました。選択肢が存在しません。',
    // アンケート一覧の検索に指定するフィルターが不正
    'q.invalid_filter': '読み込みに失敗しました。',
    // アンケート一覧の表示条件の指定方法が不正
    'q.invalid_order': '読み込みに失敗しました。',
    // リクエストボディのフォーマットがJSONではない
    'body.invalid_json': 'エラーが発生しました。',
    // リクエストボディに指定している回答の件数が不足している
    'body.answer.shortage': '回答に失敗しました。',
    // リクエストボディに指定している回答の文字数が範囲外
    'body.answer.letters.out_of_range': 'アンケート回答に失敗しました。',
    // リクエストボディに指定しているコメントの文字数が範囲外
    'body.comment.letters.out_of_range': 'コメント投稿に失敗しました。',
    // リクエストボディに指定しているアイコンのIDのフォーマットが不正
    'body.comment.invalid_icon_id': 'アイコンの選択にエラーが発生しました。',
    // リクエストボディに指定している質問内容の文字数が範囲外
    'body.q.letters.out_of_range': 'アンケート投稿に失敗しました。',
    // リクエストボディに指定している選択肢の数が範囲外
    'body.choice.number.out_of_range': 'アンケート投稿に失敗しました。',
    // リクエストボディに指定している選択肢の文字数が範囲外
    'body.choice.letters.out_of_range': 'アンケート投稿に失敗しました。',
    // リクエストボディに指定しているカテゴリが存在していない
    'body.category.is_not_exists': 'アンケート投稿に失敗しました。',
    // リクエストボディに指定しているタグの数が範囲外
    'body.tag.number.out_of_range': 'アンケート投稿に失敗しました。',
    // リクエストボディに指定しているタグの文字数が範囲外
    'body.tag.letters.out_of_range': 'アンケート投稿に失敗しました。',
    // リクエストにNGワードが含まれている
    'body.content.not_allowed': 'アンケート投稿に失敗しました。NGワードが含まれています。',
    // リクエストボディに指定しているタグに許可されていない文字列を使っている
    'body.tag.invalid_format': 'アンケート投稿に失敗しました。',
    // 許可された期間より短い期間でコメントを投稿しようとしている
    'comment.too_many_request': '連続でのコメント投稿は禁止されています。時間を置いてお試しください。',
    // 許可された期間より短い期間でアンケートを投稿しようとしている
    'q.too_many_request': 'アンケートは5分に1回までしか投稿できません。時間を置いてお試しください。',
}