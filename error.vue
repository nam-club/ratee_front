<template>
    <v-app class="bg-secondary-darken-2" style="display: flex; flex-direction: column;">
        <v-card class="bg-secondary errorCard">
            <Msg fontSize = "5em" fontWeight = "bold">{{ error.statusCode }}</Msg>
            <Msg class="errorMsg" fontSize = "3em">{{ error.message }}</Msg>
            <nuxt-link to="/" style="text-decoration: none; color: inherit;">
                <Button :textColor="btnTextColor" :variant="btnVariant" :buttonStyle="btnStyle">
                    ホームに戻る
                </Button>
            </nuxt-link>
        </v-card>
    </v-app>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Kosugi+Maru&family=M+PLUS+1p&family=M+PLUS+Rounded+1c&display=swap');

body {
    font-family: 'Kosugi Maru', sans-serif;
}

.errorCard {
    padding: 2% 5%;
    margin: 3%;
    text-align: center;
}

.errorMsg {
    margin: 2%;
}
</style>

<script lang="ts">
import Button from '@/components/atoms/Button.vue'
import Msg from '@/components/atoms/Msg.vue'

export default defineComponent({
    components: {
        Button,
        Msg
    },
    props: {
        error: {
            type: Object,
        }
    },
    setup() {
        const btnVariant = ref("elevated");
        const btnStyle = ref({ fontSize: '1.5em', height: '100%', width: '50%', margin: '3%', padding: '2%' });

        return {
            btnVariant,
            btnStyle
        }
    }
})
</script>
