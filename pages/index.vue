<template>
    <div>
        <Top />
    </div>
</template>

<script>
import Top from '@/components/templates/Top.vue'
import { ref, onMounted } from 'vue'

export default {
    components: {
        Top
    },

    /*setup() {
        const data = ref(null)

        onMounted(async () => {
            try {
                const response = await fetch('https://6qwkjs22n6.execute-api.ap-northeast-1.amazonaws.com/dev/v1/questionnaires')
                if (response.ok) {
                    data.value = await response.json()
                    console.log(data.value)
                } else {
                    console.log(response)
                    console.error('APIの呼び出しに失敗しました:', response.statusText)
                }
            } catch (error) {
                console.error('APIの呼び出しに失敗しました:', error)
            }
        })

        return {
            data
        }
    }*/
}
</script>
