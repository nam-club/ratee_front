<template>
    <div>
        <Msg fontWeight="normal" fontSize="1.5em">あなたにおすすめのアンケート</Msg>
        <v-container>
            <v-row>
                <v-col v-for="(recommend, index) in recommends" :key="index" cols="12" sm="2">
                    <v-card class="mx-auto" style="margin:1%">
                        <v-card-text class="text-center">
                            <Msg fontWeight="normal" fontSize="1.5em" :lineHeight="'1.5'">{{ recommend.content }}</Msg>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script lang="ts">
import Msg from '@/components/atoms/Msg.vue'
import { Questionnaire } from '~/composables/questionnaireStates';

export default defineComponent({
    components: {
        Msg,
    },
    props: {
        recommends: {
            type: Array as PropType<Questionnaire[]>
        },
    },
    setup() {


        return {

        }
    }
})
</script>