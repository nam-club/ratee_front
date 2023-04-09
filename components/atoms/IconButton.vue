<template>
    <v-btn :color="color" :dark="dark" :fab="fab" :icon="icon" :large="large" :left="left" :right="right" :round="round"
        :small="small" :tile="tile" :disabled="disabled" @click="onClick">
        <v-icon>{{ icon }}</v-icon>
    </v-btn>
</template>
  
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
    props: {
        icon: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            default: 'primary',
        },
        dark: {
            type: Boolean,
            default: true,
        },
        fab: {
            type: Boolean,
            default: true,
        },
        large: {
            type: Boolean,
            default: true,
        },
        left: {
            type: Boolean,
            default: false,
        },
        right: {
            type: Boolean,
            default: false,
        },
        round: {
            type: Boolean,
            default: true,
        },
        small: {
            type: Boolean,
            default: true,
        },
        tile: {
            type: Boolean,
            default: true,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        onClick: {
            type: Function,
            default: () => { },
        },
    },
});
</script>
  