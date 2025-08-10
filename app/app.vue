<template>
  <div class="antialiased text-gray-900 bg-white font-sans">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
  const appStore = useAppStore();
  await callOnce("countries", () => appStore.fetchCountries());
</script>
