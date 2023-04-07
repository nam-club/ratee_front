import { Story } from "@storybook/vue3";
import Media from "../atoms/Media.vue";

export default {
    title: 'Media',
    component: Media,
    argTypes: {
        content: {
            description: 'テキスト<br />空の場合は`タイトル`が表示される', // Descriptionに表示するテキスト
            control: {
                type: 'text', // number | range | array | object などがある
            },
            type: {
                name: 'string',
                required: true, // true時、Name部分のプロパティ右側に * が表示
            },
            defaultValue: 'テストテキスト', // 初期値
            table: {
                type: {
                    summary: 'string', // Descriptionに表示される型注釈
                },
                defaultValue: {
                    summary: 'タイトル', // Defaultに表示
                },
            },
        },
    },
}

const Template: Story<typeof Media> = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { Media },
    template: "<Media />",
});

export const MediaControl = Template.bind({})
MediaControl.args = {
  isVisibleTutorButton: true,
  colorMode: 'light',
}