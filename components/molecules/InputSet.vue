<template>
    <div style="display: flex; align-items: center;">
        <h2 v-if="caption">{{ caption }}</h2>
        <v-chip v-if="captionLabel" class="ma-2" color="#EF4444" label text-color="white">
            {{ captionLabel }}
        </v-chip>
    </div>
    <div v-if="type === 'textField'">
        <v-container>
            <v-row no-gutters>
                <v-text-field v-model="computedTextModel" :label="labelText" clearable
                    :rules="[rules.required, rules.textLength]" />
            </v-row>
        </v-container>
    </div>
    <div v-else-if="type === 'textsField'">
        <Msg v-if="errCondition" color="#EF4444">選択肢の内容が重複しています。</Msg>
        <v-container v-if="!mobile">
            <v-row v-for="(t, i) in computedTextsModel" :key="i" no-gutters style="margin:1% 0%">
                <v-col cols="11">
                    <v-text-field v-model="computedTextsModel[i]" clearable :rules="[rules.required, rules.textLength]" />
                </v-col>
                <v-col cols="1" v-if="computedTextsModel.length > rules.textsMinLength" class="d-flex justify-center">
                    <IconButton :icon="icons.mdiDeleteForever" :variant="btnVariant" color="#757575" size="x-large"
                        :onClick="($event: Event) => { $event.stopPropagation(); removeTexts(i); }" />
                </v-col>
            </v-row>
            <v-row no-gutters v-if="computedTextsModel.length < rules.textsMaxLength">
                <Button :onClick="addTexts">{{ addText }}</Button>
            </v-row>
        </v-container>
        <v-container v-else style="padding:0 0 5% 0">
            <v-row v-for="(t, i) in computedTextsModel" :key="i" no-gutters>
                <v-col cols="10">
                    <v-text-field v-model="computedTextsModel[i]" clearable :rules="[rules.required, rules.textLength]" />
                </v-col>
                <v-col cols="2" v-if="computedTextsModel.length > rules.textsMinLength" class="d-flex justify-center">
                    <IconButton :icon="icons.mdiDeleteForever" :variant="btnVariant" color="#757575" size="x-large"
                        :onClick="($event: Event) => { $event.stopPropagation(); removeTexts(i); }" />
                </v-col>
            </v-row>
            <v-row no-gutters v-if="computedTextsModel.length < rules.textsMaxLength">
                <Button :onClick="addTexts">{{ addText }}</Button>
            </v-row>
        </v-container>
    </div>
    <div v-else-if="type === 'textArea'">
        <v-textarea counter :label="labelText" :rules="[rules.required, rules.textLength]"
            v-model="computedTextAreaModel"></v-textarea>
    </div>
    <div v-else-if="type === 'selectBox'">
        <v-container>
            <v-row no-gutters>
                <v-select :label="labelText" :items="selectItems" v-model="computedSelectModel"></v-select>
            </v-row>
        </v-container>
    </div>
    <div v-else-if="type === 'chipBox'">
        <v-container>
            <v-row no-gutters>
                <v-text-field v-model="newChip" :label="labelText" :rules="[rules.textLength]" @keyup.enter="addChip" />
            </v-row>
            <v-row no-gutters>
                <v-col cols="auto" v-for="(c, i) in computedChipsModel" :key="i">
                    <v-chip v-model="computedChipsModel[i]" class="ma-2" closable
                        @click:close="($event: Event) => { $event.stopPropagation(); removeChip(i); }">
                        {{ computedChipsModel[i] }}
                    </v-chip>
                </v-col>
            </v-row>
        </v-container>
    </div>
    <div v-else-if="type === 'switchButton'">
        <v-switch color="primary" v-model="computedCheckModel" :label="labelText"></v-switch>
    </div>
    <div v-if="type === 'searchBox'">
        <v-text-field v-model="computedTextModel" :label="labelText" @keyup.enter="onClick()" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useDisplay } from 'vuetify'
import { mdiDeleteForever, mdiPlus, mdiMagnify } from '@mdi/js';
import Button from '@/components/atoms/Button.vue'
import IconButton from '@/components/atoms/IconButton.vue'
import Msg from '@/components/atoms/Msg.vue'
import {
    TAG_MIN_LENGTH, TAG_MAX_LENGTH
} from '@/constants';

export default defineComponent({
    components: {
        Button,
        IconButton,
        Msg
    },
    props: {
        type: {
            type: String,
            required: true
        },
        listNum: {
            type: Number,
        },
        caption: {
            type: String,
            required: true,
        },
        captionLabel: {
            type: String,
        },
        labelText: {
            type: String,
        },
        addText: {
            type: String,
        },
        selectItems: {
            type: [],
        },
        inputStyle: {
            type: Object,
            default: () => ({}),
        },
        textModel: {
            type: String
        },
        textsModel: {
            type: Array as () => string[],
        },
        textAreaModel: {
            type: String
        },
        selectModel: {
            type: String
        },
        chipsModel: {
            type: Array as () => string[],
        },
        checkModel: {
            type: Boolean,
            default: false
        },
        onClick: {
            type: Function,
            default: () => { },
        },
        // バリデーションルール
        rules: {
            type: Object,
            default: () => ({}),
        },
        errCondition: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        computedTextModel: {
            get(): string {
                // propsで受け取った親モデルの値をcomputedTextModelに反映する
                return this.textModel ? this.textModel : ''
            },
            set(value: string) {
                // computedTextModelの値が変更された際はここに入ってくる
                // $emitで親コンポーネントのmodelに反映する
                this.$emit('input', value)
            }
        },
        computedTextsModel: {
            get(): string[] {
                return this.textsModel ? this.textsModel : []
            },
            set(value: string) {
                this.$emit('update', value)
            }
        },
        computedTextAreaModel: {
            get(): string {
                // propsで受け取った親モデルの値をcomputedTextAreaModelに反映する
                return this.textAreaModel ? this.textAreaModel : ''
            },
            set(value: string) {
                // computedTextAreaModelの値が変更された際はここに入ってくる
                // $emitで親コンポーネントのmodelに反映する
                this.$emit('input', value)
            }
        },
        computedSelectModel: {
            get(): string {
                return this.selectModel ? this.selectModel : ''
            },
            set(value: string) {
                this.$emit('update:selectModel', value)
            }
        },
        computedChipsModel: {
            get(): string[] {
                return this.chipsModel ? this.chipsModel : []
            },
            set(value: string) {
                this.$emit('update', value)
            }
        },
        computedCheckModel: {
            get(): boolean {
                return this.checkModel
            },
            set(value: boolean) {
                this.$emit('update:checkModel', value)
            }
        },
    },
    setup(props, context) {
        const { mobile } = useDisplay();

        const icons = ref({
            mdiDeleteForever,
            mdiPlus,
            mdiMagnify
        })

        const btnVariant = ref("text");

        const newChip = ref('');
        const chips = ref([]);

        const addTexts = () => {
            if (props.textsModel) {
                props.textsModel.push('');
                context.emit('update:textsModel', props.textsModel)
            }
        }

        const removeTexts = (index: number) => {
            console.log('removeTexts called with index:', index);
            if (props.textsModel) {
                if (index >= 0 && index < props.textsModel.length) {  // インデックスが有効な範囲にあることを確認
                    // props.textsModelのクローンを作成
                    const updatedTextsModel = [...props.textsModel];
                    // クローン上で要素を削除
                    updatedTextsModel.splice(index, 1);
                    // 更新された配列を親コンポーネントに伝播
                    context.emit('update:textsModel', updatedTextsModel);
                } else {
                    console.error('Invalid index:', index);  // インデックスが無効な場合はエラーを表示
                }
            }
        }

        const addChip = () => {
            if (props.chipsModel && newChip.value.length >= TAG_MIN_LENGTH && newChip.value.length <= TAG_MAX_LENGTH) {
                props.chipsModel.push(newChip.value)
                newChip.value = ''
                context.emit('update:chipsModel', props.chipsModel)
            }
        }

        const removeChip = (index: number) => {
            console.log('removeChip called with index:', index);
            if (props.chipsModel) {
                if (index >= 0 && index < props.chipsModel.length) {  // インデックスが有効な範囲にあることを確認
                    // props.chipsModelのクローンを作成
                    const updatedChipsModel = [...props.chipsModel];
                    // クローン上で要素を削除
                    updatedChipsModel.splice(index, 1);
                    // 更新された配列を親コンポーネントに伝播
                    context.emit('update:chipsModel', updatedChipsModel);
                    console.log(props.chipsModel)
                } else {
                    console.error('Invalid index:', index);  // インデックスが無効な場合はエラーを表示
                }
            }
        }

        const tagTextColor = ref('#515254');
        const tagBtnStyle = ref({ fontSize: '1.2em', height: '70%', width: '100%', display: 'block' })

        return {
            mobile,
            icons,
            btnVariant,
            tagTextColor,
            tagBtnStyle,
            newChip,
            chips,
            addTexts,
            removeTexts,
            addChip,
            removeChip,
        }
    },
})
</script>