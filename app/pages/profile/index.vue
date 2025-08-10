<template>
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <!-- Page header -->
        <div class="mb-8">
            <h1 class="text-2xl font-semibold text-gray-900">Profile</h1>
            <p class="text-gray-600 mt-1">Monitor your plan and API usage.</p>
        </div>

        <!-- User Card -->
        <div class="bg-white/60 backdrop-blur rounded-xl border border-white/40 shadow-sm p-6 mb-8">
            <div class="flex items-center gap-4">
                <div
                    class="h-14 w-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center text-xl font-semibold">
                    {{ userInitials }}
                </div>
                <div>
                    <div class="text-lg font-medium text-gray-900">{{ displayName }}</div>
                    <div class="text-sm text-gray-600">{{ displayEmailOrLogin }}</div>
                </div>
            </div>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- API Usage -->
            <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <div class="flex items-center justify-between mb-2">
                    <h2 class="text-base font-semibold text-gray-900">API Usage</h2>
                    <span class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium"
                        :class="usagePercent >= 100 ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'">
                        {{ Math.min(usagePercent, 100).toFixed(0) }}%
                    </span>
                </div>
                <div class="text-3xl font-bold text-blue-600 mb-2">
                    {{ apiCallsUsed }} / {{ apiCallsLimit }}
                </div>
                <div class="w-full bg-gray-200/70 rounded-full h-2.5 mb-2 overflow-hidden">
                    <div class="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                        :style="{ width: Math.min(usagePercent, 100) + '%' }" />
                </div>
                <p class="text-sm text-gray-600">
                    {{ Math.max(apiCallsLimit - apiCallsUsed, 0) }} calls remaining this month
                </p>
            </div>

            <!-- Current Plan -->
            <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h2 class="text-base font-semibold text-gray-900 mb-2">Current Plan</h2>
                <div class="text-2xl font-bold text-gray-900 capitalize">{{ planLabel }}</div>
                <p class="text-sm text-gray-600 mt-1">Includes {{ apiCallsLimit }} monthly requests.</p>
                <div class="mt-4">
                    <button
                        class="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 text-white px-4 py-2.5 text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                        :disabled="planLabel.toLowerCase() !== 'free'" @click="goToUpgrade">
                        {{ planLabel.toLowerCase() === 'free' ? 'Upgrade to Pro' : 'Manage Subscription' }}
                    </button>
                </div>
            </div>

            <!-- Helpful Links -->
            <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h2 class="text-base font-semibold text-gray-900 mb-2">Resources</h2>
                <ul class="space-y-2 text-sm">
                    <li>
                        <NuxtLink to="/about" class="text-blue-600 hover:text-blue-700">API Docs & Limits</NuxtLink>
                    </li>
                </ul>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
defineComponent({ name: "ProfilePage" });

definePageMeta({ middleware: ["auth"] });

type SessionUser = {
    name?: string
    login?: string
    email?: string
    subscriptionTier?: string
    apiCallsUsed?: number
    apiCallsLimit?: number
}

const { user } = useUserSession();

const displayName = computed(() => {
    const u = (user.value || {}) as SessionUser;
    return u.name || u.login || u.email || "User";
});

const displayEmailOrLogin = computed(() => {
    const u = (user.value || {}) as SessionUser;
    return u.email || (u.login ? `@${u.login}` : "");
});

const userInitials = computed(() => {
    const name = displayName.value.trim();
    const parts = name.split(" ").filter(Boolean);
    const first = parts[0]?.[0] ?? "U";
    const second = parts.length > 1 ? (parts[1]?.[0] ?? "") : (name.length > 1 ? name[1] : "");
    return (first + (second || "")).toUpperCase();
});

const apiCallsUsed = computed(() => {
    const u = (user.value || {}) as SessionUser;
    return typeof u.apiCallsUsed === "number" ? u.apiCallsUsed : 0;
});

const apiCallsLimit = computed(() => {
    const u = (user.value || {}) as SessionUser;
    return typeof u.apiCallsLimit === "number" ? u.apiCallsLimit : 100;
});

const usagePercent = computed(() => {
    const used = apiCallsUsed.value;
    const limit = apiCallsLimit.value || 1;
    return (used / limit) * 100;
});

const planLabel = computed(() => {
    const u = (user.value || {}) as SessionUser;
    return (u.subscriptionTier || "Free").toString();
});

function goToUpgrade() {
    // Placeholder route for upgrade flow; replace with billing portal later
    navigateTo("/pricing");
}
</script>