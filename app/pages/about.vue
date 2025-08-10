<template>
  <div
    class="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex flex-col items-center justify-center p-4">
    <!-- Header -->
    <div class="text-center mb-8">
      <h1 class="text-4xl font-bold text-gray-800 mb-2">About</h1>
      <p class="text-gray-600">Learn more about the Passport Visa API project</p>
    </div>

    <!-- Main Card -->
    <div class="bg-white rounded-2xl shadow-xl p-8 w-full max-w-4xl">
      <div class="prose prose-lg mx-auto">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">Project Overview</h2>
        <p class="text-gray-600 mb-6">
          This is a comprehensive visa requirement checking application that helps travelers
          determine visa requirements between different countries.
        </p>

        <h3 class="text-xl font-semibold text-gray-800 mb-3">Features</h3>
        <ul class="text-gray-600 space-y-2 mb-6">
          <li>• Real-time visa requirement checking</li>
          <li>• Comprehensive country database</li>
          <li>• Multiple visa categories support</li>
          <li>• Modern, responsive design</li>
        </ul>

        <a href="https://github.com/nickypangers/passport-visa-api" target="_blank"
          class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-white/30 rounded-lg transition-all duration-200 group">
          <Icon name="mdi:github" class="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
          GitHub Repo
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
useHead({
  title: "About - Passport Visa API",
  meta: [
    {
      name: "description",
      content: "Learn more about the Passport Visa API project and its features",
    },
  ],
});
</script>
