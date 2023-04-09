<template>
    <div>
        <h1>Main Page</h1>
        <VBtn>Vuetify のボタン</VBtn>
        <IconButton icon="mdi-heart" color="red" onClick="handleClick" />
        <IconButton icon="mdi-star" color="yellow" onClick="handleClick" />
        <IconButton icon="mdi-share-variant" color="green" onClick="handleClick" />
        <IconButton icon="mdi-plus" label="Count Up" onClick="increment" />
        <p>{{ count }}</p>
    </div>
</template>
<script setup>
import { ref } from '@nuxtjs/composition-api'
import IconButton from './components/atoms/IconButton.vue'

const count = ref <number> (0)

const increment = () => count.value++;

function handleClick() {
    alert('IconButton is clicked!')
}
</script>