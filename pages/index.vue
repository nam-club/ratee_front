<template>
    <div>
        <Top />
        <v-btn @click="incrementCounter">カウンター: {{ counter }}</v-btn>
        <!--IconButton :color="color" :icon="icons.mdiAccount" /-->
    </div>
</template>

<script>
import { ref, computed } from 'vue'
import {
    mdiAccount,
    mdiDelete,
    mdiPencil,
    mdiShareVariant,
} from '@mdi/js'
import Top from '@/components/templates/Top.vue'

export default {
    components: {
        Top
    },
    setup() {
        const message = ref('Nuxt3 と Composition API の使い方')
        const counter = ref(0)

        const incrementCounter = () => {
            counter.value++
        }

        const icons = ref({
            mdiAccount,
            mdiPencil,
            mdiShareVariant,
            mdiDelete,
        })

        return {
            message,
            counter,
            incrementCounter,
            icons
        }
    }
}
</script>