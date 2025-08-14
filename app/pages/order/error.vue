<template>
    <div class="min-h-screen bg-gradient-to-br from-red-50 to-rose-100 flex items-center justify-center p-6">
        <div class="w-full max-w-lg bg-white border border-gray-200 rounded-2xl shadow-sm p-8 text-center">
            <div class="mx-auto mb-4 w-14 h-14 rounded-full bg-red-100 flex items-center justify-center">
                <Icon name="mdi:alert-circle" class="w-9 h-9 text-red-600" />
            </div>

            <h1 class="text-2xl font-semibold text-gray-900">Payment not completed</h1>
            <p class="mt-2 text-gray-600">
                {{ displayMessage }}
            </p>

            <p v-if="sessionId" class="mt-4 text-xs text-gray-400">Ref: {{ sessionId }}</p>

            <div class="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                    class="inline-flex items-center justify-center rounded-lg bg-red-600 text-white px-4 py-2.5 text-sm font-medium hover:bg-red-700 transition-colors"
                    @click="navigateTo('/pricing')">
                    Try again
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
defineComponent({ name: "OrderErrorPage" });

useHead({
    title: "Order Error - Passport Visa API",
});

const route = useRoute();
const sessionId = computed(() => String(route.query.session_id || ""));
const message = computed(() => String(route.query.message || ""));

const displayMessage = computed(() =>
    message.value
        ? message.value
        : "Your payment was canceled or failed. No charges were made. You can try again from the pricing page."
);
</script>
