<script setup>
useHead({
  link: [{ rel: 'icon', type: 'image/png', href: 'favicon.ico' }],
});

const appDataStore = useAppDataStore();
await callOnce('countries', () => appDataStore.fetchCountries());
</script>
<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
