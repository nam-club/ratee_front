<template>
    <p :class="['text--' + color, 'text-' + size]">
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
            default: 'body-1'
        }
    }
});
</script>