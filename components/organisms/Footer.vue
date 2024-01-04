<template>
    <div>
        <v-footer v-if="!mobile" class="footer" style="height: 12%; width: 100%;">
            <v-row class="fill-height" align="center" justify="center">
                <v-col cols="auto" style="width: 20%;">
                    <nuxt-link to="/questionnaire/create" style="text-decoration: none; color: inherit;">
                        <Button :textColor="btnTextColor" :variant="btnVariant" :buttonStyle="btnStyle">
                            {{ buttonText }}
                        </Button>
                    </nuxt-link>
                </v-col>
            </v-row>
        </v-footer>
        <nuxt-link v-else to="/questionnaire/create"
            style="text-decoration: none; color: inherit; position: fixed; right: 0; bottom: 6%; margin: 20px; z-index: 1000;">
            <IconButton :icon="icons.mdiPlus" :size="large" :variant="iconBtnVariant" />
        </nuxt-link>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useDisplay } from 'vuetify'
import { mdiPlus } from '@mdi/js';
import Button from '@/components/atoms/Button.vue'

export default defineComponent({
    components: {
        Button
    },
    props: {
        // ボタンのテキストを定義
        buttonText: {
            type: String,
        },
    },
    setup() {
        const btnTextColor = ref("white");
        const btnVariant = ref("outlined");
        const iconBtnVariant = ref("elevated");
        const btnStyle = ref({ fontSize: '1.5em', height: '100%', width: '100%', padding: '6%', display: 'block' });
        const { mobile } = useDisplay()

        const icons = ref({
            mdiPlus,
        })

        return {
            btnTextColor,
            btnStyle,
            btnVariant,
            iconBtnVariant,
            mobile,
            icons
        }
    }
})
</script>

<style scoped>
.footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    /* 透過した黒色 */
    z-index: 100;
}
</style>