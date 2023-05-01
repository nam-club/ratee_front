<template>
    <v-card>
        <v-container class="bg-surface-variant">
            <v-row class="justify-center">
                <v-col xs12 sm6 md6 align-self="center">
                    <Msg>{{ question.title }}</Msg>
                </v-col>
                <v-col xs12 sm6 md6>
                    <v-container class="bg-surface-variant">
                        <v-row class="justify-center" v-for="(item, index) in question.items" :key="index">
                            <v-col xs12 sm12 md12 align-self="center">
                                <Button>
                                    {{ item }}
                                </Button>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
import Msg from '@/components/atoms/Msg.vue'
import Button from '@/components/atoms/Button.vue'
export default defineComponent({
    components: {
        Msg,
        Button
    },
    setup() {
        const question = ref({ title: "好きな動物は？", items: ["イヌ", "ネコ", "ゾウ", "キリン"] });

        return {
            question
        }
    }
})
</script>