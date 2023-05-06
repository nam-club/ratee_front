<template>
    <p :class="[color + '--text', 'font-weight-' + fontWeight]" :style="{fontSize: size}">
        <slot></slot>
    </p>
</template>
  
<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Msg',
    props: {
        color: {
            type: String,
            default: 'black'
        },
        size: {
            type: String,
            default: '1em'
        },
        fontWeight: {
            type: String,
            default: 'normal'
        }
    }
});
</script>