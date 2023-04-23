<template>
    <div>
        <!--IconButton /-->
        <h1>{{ message }}</h1>
        <v-btn @click="incrementCounter">カウンター: {{ counter }}</v-btn>
    </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
    setup() {
        const message = ref('Nuxt3 と Composition API の使い方')
        const counter = ref(0)

        const incrementCounter = () => {
            counter.value++
        }

        return {
            message,
            counter,
            incrementCounter
        }
    }
}
</script>