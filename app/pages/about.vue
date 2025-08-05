<template>
  <div
    class="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex flex-col items-center justify-center p-4"
  >
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

        <h3 class="text-xl font-semibold text-gray-800 mb-3">Technology Stack</h3>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4 text-gray-600">
          <div class="bg-gray-50 rounded-lg p-3 text-center">
            <div class="font-semibold">Frontend</div>
            <div class="text-sm">Nuxt 3 + Vue 3</div>
          </div>
          <div class="bg-gray-50 rounded-lg p-3 text-center">
            <div class="font-semibold">Styling</div>
            <div class="text-sm">Tailwind CSS</div>
          </div>
          <div class="bg-gray-50 rounded-lg p-3 text-center">
            <div class="font-semibold">Database</div>
            <div class="text-sm">Drizzle ORM</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  useHead({
    title: 'About - Passport Visa API',
    meta: [
      {
        name: 'description',
        content: 'Learn more about the Passport Visa API project and its features',
      },
    ],
  });
</script>
