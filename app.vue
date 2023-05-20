<template>
    <div>
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>

<script>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()

    onMounted(() => {
      router.push('/Top')
    })

    return {}
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=M+PLUS+1p&display=swap');

body {
  font-family: 'M PLUS 1p', sans-serif;
}
</style>