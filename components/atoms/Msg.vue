<template>
    <p :class="[color + '--text', 'font-weight-' + fontWeight]" :style="{fontSize: fontSize, lineHeight: lineHeight}">
        <slot></slot>
    </p>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Msg',
    props: {
        color: {
            type: String,
            default: 'black'
        },
        fontSize: {
            type: String,
            default: '1em'
        },
        fontWeight: {
            type: String,
            default: 'normal'
        },
        lineHeight: {
            type: String,
            default: '1'
        }
    }
});
</script>