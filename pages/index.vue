<template>
    <div>
        <h1>Main Page</h1>
        <VBtn>Vuetify のボタン</VBtn>
        <button class="couponButton" @click="handleClick">Coupon Get</button>
        <LazyCoupon v-if="show" />
    </div>
</template>
<script setup>
const show = ref(false);

const handleClick = () => {
    show.value = true;
};
</script>

<style lang="postcss" scoped>
.couponButton {
  @apply inline-block bg-blue-100 rounded-full px-3 py-1 text-sm font-semibold text-yellow-500;
  &:hover {
    @apply bg-blue-200;
  }
}
</style>