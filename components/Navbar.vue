<template>
    <nav>
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink class="badge" to="/sample">Sample</NuxtLink>
        <NuxtLink class="activeCard" to="/sample2">Sample2</NuxtLink>
        <NuxtLink to="https://google.com" target="_blank">Google</NuxtLink>
    </nav>
</template>

<style lang="postcss" scoped>
.badge {
  @apply inline-block bg-yellow-100 rounded-full px-3 py-1 text-sm font-semibold text-yellow-500;
  &:hover {
    @apply bg-yellow-200;
  }
}
.activeCard {
  @apply transform shadow-xl transition duration-300 ease-in-out;
}
</style>