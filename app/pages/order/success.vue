<template>
    <div class="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-6">
        <div class="w-full max-w-lg bg-white border border-gray-200 rounded-2xl shadow-sm p-8 text-center">
            <div class="mx-auto mb-4 w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
                <Icon name="mdi:check-circle" class="w-9 h-9 text-green-600" />
            </div>
            <h1 class="text-2xl font-semibold text-gray-900">Payment successful</h1>
            <p class="mt-2 text-gray-600">Your subscription is now active. You can manage your API keys and billing from
                your profile.</p>

            <p v-if="sessionId" class="mt-4 text-xs text-gray-400">Ref: {{ sessionId }}</p>

            <div class="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                    class="inline-flex items-center justify-center rounded-lg bg-green-600 text-white px-4 py-2.5 text-sm font-medium hover:bg-green-700 transition-colors"
                    @click="navigateTo('/profile')">
                    Go to profile
                </button>
                <button
                    class="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-900 px-4 py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors"
                    @click="navigateTo('/')">
                    Back to home
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineComponent({ name: "OrderSuccessPage" })

useHead({
    title: "Order Success - Passport Visa API",
})

const route = useRoute()
const sessionId = computed(() => String(route.query.session_id || ""))
</script>
