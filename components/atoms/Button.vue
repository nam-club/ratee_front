<template>
    <v-btn :color="bgColor" :disabled="disabled" :variant="variant" :style="{ color: textBtnColor, ...buttonStyle }"
        :class="['font-weight-' + fontWeight]" @click="handleClick">
        <slot></slot>
    </v-btn>
</template>
  
<script>
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        color: {
            type: String,
            default: '',
        },
        clickedColor: {
            type: String,
            default: ''
        },
        textColor: {
            type: String,
            default: ''
        },
        clickedTextColor: {
            type: String,
            default: ''
        },
        variant: {
            type: String,
            default: "outlined"
        },
        fontWeight: {
            type: String,
            default: 'normal'
        },
        disabled: {
            type: Boolean,
            default: false
        },
        buttonStyle: {
            type: Object,
            default: () => ({}),
        },
        onClick: {
            type: Function,
            default: () => { },
        },
    },
    setup(props) {
        const bgColor = ref(''); // 背景色
        bgColor.value = props.color;
        const textBtnColor = ref(''); // テキスト色
        textBtnColor.value = props.textColor;

        const handleClick = () => {
            if (bgColor.value === '') {
                bgColor.value = props.clickedColor;
            } else {
                bgColor.value = props.color; // 元の色に戻す
            }
            if (textBtnColor.value === '') {
                textBtnColor.value  = props.clickedTextColor;
            } else {
                textBtnColor.value = props.textColor; // 元の色に戻す
            }
            props.onClick();
        };

        return {
            bgColor,
            textBtnColor,
            handleClick
        }
    }
})
</script>