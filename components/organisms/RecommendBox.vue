<template>
    <div>
        <v-container>
            <Msg fontWeight="normal" fontSize="1.5em" style="margin:2% 0">あなたにおすすめのアンケート</Msg>
            <v-row>
                <v-col v-for="(recommend, index) in recommends" :key="index" cols="12" sm="4">
                    <nuxt-link :to="`/questionnaire/${recommend.id}`" style="text-decoration: none; color: inherit;">
                        <Button :buttonStyle="btnStyle">
                            {{ recommend.content }}
                        </Button>
                    </nuxt-link>
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
        const btnStyle = ref({ width: '100%'});

        return {
            btnStyle
        }
    }
})
</script>