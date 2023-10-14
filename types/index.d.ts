// カテゴリ型
export type Category = {
    id: string;
    name: string;
};

// 無限ローディング型
export type InfiniteLoadingState = {
    loaded: () => void;
    complete: () => void;
    error: () => void;
};