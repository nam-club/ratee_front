<template>
    <div>
        <button @click="enableCustomLayout">Update layout</button>
    </div>
    <Navbar />
</template>
<script setup>
function enableCustomLayout() {
    setPageLayout('custom');
}
definePageMeta({
    layout: false,
});
</script>