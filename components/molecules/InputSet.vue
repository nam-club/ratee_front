<template>
    <h2 v-if="caption">{{ caption }}</h2>
    <div v-if="type === 'textField'">
        <v-text-field v-model="computedTextModel" :label="labelText" />
    </div>
    <div v-else-if="type === 'textsField'">
        <v-container>
            <v-row v-for="(t, i) in computedTextsModel" :key="i" no-gutters>
                <v-col cols="1">
                    <p>{{ i + 1 }}</p>
                </v-col>
                <v-col cols="11">
                    <v-text-field v-model="computedTextsModel[i]" />
                </v-col>
            </v-row>
            <v-row no-gutters>
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
                    <v-text-field v-model="newChip" :label="labelText" />
                </v-col>
                <v-col cols="1" />
                <v-col cols="2" justify="center">
                    <Button :onClick="addChip" :textColor="tagTextColor" :buttonStyle="tagBtnStyle">追加</Button>
                </v-col>
            </v-row>
            <v-row no-gutters>
                <v-col cols="auto" v-for="(c, i) in computedChipsModel" :key="i">
                    <v-chip v-model="computedChipsModel[i]" class="ma-2" closable @close="removeChip(i)">
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

<script>
import { defineComponent } from 'vue'
import { mdiPlus, mdiMagnify } from '@mdi/js';
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
            type: []
        },
        textAreaModel: {
            type: String
        },
        selectModel: {
            type: String
        },
        chipsModel: {
            type: []
        },
        checkModel: {
            type: Boolean,
            default: false
        },
        onClick: {
            type: Function,
            default: () => { },
        },
    },
    computed: {
        computedTextModel: {
            get() {
                // propsで受け取った親モデルの値をcomputedTextModelに反映する
                return this.textModel
            },
            set(value) {
                // computedTextModelの値が変更された際はここに入ってくる
                // $emitで親コンポーネントのmodelに反映する
                this.$emit('input', value)
            }
        },
        computedTextsModel: {
            get() {
                return this.textsModel
            },
            set(value) {
                this.$emit('update', value)
            }
        },
        computedTextAreaModel: {
            get() {
                // propsで受け取った親モデルの値をcomputedTextAreaModelに反映する
                return this.textAreaModel
            },
            set(value) {
                // computedTextAreaModelの値が変更された際はここに入ってくる
                // $emitで親コンポーネントのmodelに反映する
                this.$emit('input', value)
            }
        },
        computedSelectModel: {
            get() {
                return this.selectModel
            },
            set(value) {
                this.$emit('update:selectModel', value)
            }
        },
        computedChipsModel: {
            get() {
                return this.chipsModel
            },
            set(value) {
                this.$emit('update', value)
            }
        },
        computedCheckModel: {
            get() {
                return this.checkModel
            },
            set(value) {
                this.$emit('update:checkModel', value)
            }
        },
    },
    setup(props) {
        const icons = ref({
            mdiPlus,
            mdiMagnify
        })

        const newChip = ref('')
        const chips = ref([])

        const addTexts = () => {
            props.textsModel.push('');
            this.$emit('update:textsModel', props.textsModel)
        }

        const addChip = () => {
            props.chipsModel.push(newChip.value)
            newChip.value = ''
            this.$emit('update:chipsModel', props.chipsModel)
        }

        const removeChip = (index) => {
            chips.value.splice(index, 1)
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
            addChip,
            removeChip,
        }
    },
})
</script>