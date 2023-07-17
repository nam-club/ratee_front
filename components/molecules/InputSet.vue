<template>
    <h2>{{ caption }}</h2>
    <div v-if="type === 'textField'">
        <v-container v-if="listNum > 1">
            <v-row v-for="n in listNum" :key="n" no-gutters>
                <v-col cols="1">
                    <p>{{ n }}</p>
                </v-col>
                <v-col cols="11">
                    <v-text-field :label="labelText" />
                </v-col>
            </v-row>
            <v-row no-gutters>
                <v-col cols="1" />
                <v-col cols="1">
                    <IconButton :icon="icons.mdiPlus" :size="small" />
                </v-col>
                <v-col cols="auto">
                    <Msg fontWeight="normal" size="1.5em">{{ addText }}</Msg>
                </v-col>
            </v-row>
        </v-container>
        <v-text-field v-else-if="listNum === 1" v-model="computedModel" :label="labelText" />
        <p>{{ inputValue }}</p>
    </div>
    <div v-else-if="type === 'selectBox'">
        <v-select :label="labelText" :items="selectItems"></v-select>
    </div>
    <div v-else-if="type === 'tagBox'">
        <v-container>
            <v-row no-gutters>
                <v-col cols="9">
                    <v-text-field v-model="newChip" :label="labelText" />
                </v-col>
                <v-col cols="1" />
                <v-col cols="2" justify="center">
                    <Button :onClick="addChip" :buttonStyle="tagBtnStyle">追加</Button>
                </v-col>
            </v-row>
            <v-row no-gutters>
                <v-col cols="12">
                    <v-chip v-for="(chip, i) in chips" :key="i" class="ma-2" closable @close="removeChip(i)">
                        {{ chip }}
                    </v-chip>
                </v-col>
            </v-row>
        </v-container>
    </div>
    <div v-else-if="type === 'checkBox'">
        <v-checkbox :label="labelText" type="checkbox"></v-checkbox>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mdiPlus } from '@mdi/js';
import Button from '@/components/atoms/Button.vue'
import IconButton from '@/components/atoms/IconButton.vue'
import Msg from '@/components/atoms/Msg.vue'

export default defineComponent({
    components: {
        Button,
        IconButton,
        Msg
    },
    // modelの設定を行う
    model: {
        prop: 'textModel', //　親モデルの値を'textModel'というkeyで受け取る
        event: 'input' // イベント種別
    },
    props: {
        type: {
            type: String,
            required: true
        },
        listNum: {
            type: Number,
            required: true
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
            type: String,
            required: true,
        },
    },
    computed: {
        computedModel: {
            get() {
                // propsで受け取った親モデルの値をcomputedModelに反映する
                console.log(this.textModel)
                return this.textModel
            },
            set(value) {
                console.log(value);
                // computedModelの値が変更された際はここに入ってくる
                // $emitで親コンポーネントのmodelに反映する
                this.$emit('input', value)
            }
        }
    },
    setup() {
        const icons = ref({
            mdiPlus
        })

        const newChip = ref('');
        const chips = ref([]);

        function addChip() {
            chips.value.push(newChip.value);
            newChip.value = '';
        }

        function removeChip(index) {
            chips.value.splice(index, 1);
        }

        const tagBtnStyle = ref({ color: '#515254', fontSize: '1.2em', height: '70%', width: '100%', display: 'block' });

        return {
            icons,
            tagBtnStyle,
            newChip,
            chips,
            addChip,
            removeChip
        }
    }
})
</script>