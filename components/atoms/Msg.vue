<template>
    <p :class="['font-weight-' + fontWeight]" :style="{color: color, fontSize: fontSize, lineHeight: lineHeight, padding: padding}">
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
        },
        padding: {
            type: String
        }
    }
});
</script>