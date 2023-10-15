<template>
    <h2 v-if="caption">{{ caption }}</h2>
    <div v-if="type === 'textField'">
        <v-text-field v-model="computedTextModel" :label="labelText" clearable
            :rules="[rules.required, rules.textLength]" />
    </div>
    <div v-else-if="type === 'textsField'">
        <v-container>
            <v-row v-for="(t, i) in computedTextsModel" :key="i" no-gutters>
                <v-col cols="1">
                    <p>{{ i + 1 }}</p>
                </v-col>
                <v-col cols="10">
                    <v-text-field v-model="computedTextsModel[i]" clearable :rules="[rules.required, rules.textLength]" />
                </v-col>
                <v-col cols="1" v-if="computedTextsModel.length > rules.textsMinLength">
                    <IconButton :icon="icons.mdiClose" :size="small" :onClick="($event: Event) => { $event.stopPropagation(); removeTexts(i); }" />
                </v-col>
            </v-row>
            <v-row no-gutters v-if="computedTextsModel.length < rules.textsMaxLength">
                <v-col cols="1" />
                <v-col cols="1">
                    <IconButton :icon="icons.mdiPlus" :size="small" :onClick="addTexts" />
                </v-col>
                <v-col cols="auto">
                    <Msg fontWeight="normal" fontSize="1.5em">{{ addText }}</Msg>
                </v-col>
            </v-row>
        </v-container>
    </div>
    <div v-else-if="type === 'textArea'">
        <v-textarea counter :label="labelText" :rules="rules" v-model="computedTextAreaModel"></v-textarea>
    </div>
    <div v-else-if="type === 'selectBox'">
        <v-select :label="labelText" :items="selectItems" v-model="computedSelectModel"></v-select>
    </div>
    <div v-else-if="type === 'chipBox'">
        <v-container>
            <v-row no-gutters>
                <v-col cols="9">
                    <v-text-field v-model="newChip" :label="labelText" :rules="[rules.textLength]" />
                </v-col>
                <v-col cols="1" />
                <v-col cols="2" justify="center" v-if="computedChipsModel.length < rules.tagsMaxLength">
                    <Button :onClick="addChip" :textColor="tagTextColor" :buttonStyle="tagBtnStyle">追加</Button>
                </v-col>
            </v-row>
            <v-row no-gutters>
                <v-col cols="auto" v-for="(c, i) in computedChipsModel" :key="i">
                    <v-chip v-model="computedChipsModel[i]" class="ma-2" closable @click:close="($event: Event) => { $event.stopPropagation(); removeChip(i); }">
                        {{ computedChipsModel[i] }}
                    </v-chip>
                </v-col>
            </v-row>
        </v-container>
    </div>
    <div v-else-if="type === 'checkBox'">
        <v-checkbox v-model="computedCheckModel" :label="labelText" type="checkbox" hide-details />
    </div>
    <div v-if="type === 'searchBox'">
        <v-container>
            <v-row>
                <v-col cols="10">
                    <v-text-field v-model="computedTextModel" :label="labelText" />
                </v-col>
                <v-col cols="2">
                    <v-btn icon :onClick="() => onClick()">
                        <v-icon>{{ icons.mdiMagnify }}</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mdiClose, mdiPlus, mdiMagnify } from '@mdi/js';
import Button from '@/components/atoms/Button.vue'
import IconButton from '@/components/atoms/IconButton.vue'
import Msg from '@/components/atoms/Msg.vue'

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
        const icons = ref({
            mdiClose,
            mdiPlus,
            mdiMagnify
        })

        const newChip = ref('')
        const chips = ref([])

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
            if (props.chipsModel) {
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
            icons,
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