<template>
    <nav class="fixed top-0 left-0 right-0 z-50 bg-white/20 backdrop-blur-sm border-b border-white/5">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <!-- Tab Navigation -->
                <div class="flex space-x-8">
                    <NuxtLink to="/"
                        class="relative group px-3 py-2 text-sm font-medium transition-all duration-200 hover:text-blue-600"
                        :class="$route.path === '/' ? 'text-blue-600' : 'text-gray-600'">
                        Home
                        <ClientOnly>
                            <span v-if="$route.path === '/'"
                                class="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-full" />
                            <span v-else
                                class="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 rounded-full group-hover:w-full transition-all duration-200" />
                        </ClientOnly>
                    </NuxtLink>

                    <NuxtLink to="/matrix"
                        class="relative group px-3 py-2 text-sm font-medium transition-all duration-200 hover:text-blue-600"
                        :class="$route.path === '/matrix' ? 'text-blue-600' : 'text-gray-600'">
                        Matrix
                        <ClientOnly>
                            <span v-if="$route.path === '/matrix'"
                                class="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-full" />
                            <span v-else
                                class="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 rounded-full group-hover:w-full transition-all duration-200" />
                        </ClientOnly>
                    </NuxtLink>

                    <NuxtLink to="/pricing"
                        class="relative group px-3 py-2 text-sm font-medium transition-all duration-200 hover:text-blue-600"
                        :class="$route.path === '/pricing' ? 'text-blue-600' : 'text-gray-600'">
                        Pricing
                        <ClientOnly>
                            <span v-if="$route.path === '/pricing'"
                                class="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-full" />
                            <span v-else
                                class="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 rounded-full group-hover:w-full transition-all duration-200" />
                        </ClientOnly>
                    </NuxtLink>

                    <NuxtLink to="/about"
                        class="relative group px-3 py-2 text-sm font-medium transition-all duration-200 hover:text-blue-600"
                        :class="$route.path === '/about' ? 'text-blue-600' : 'text-gray-600'">
                        About
                        <ClientOnly>
                            <span v-if="$route.path === '/about'"
                                class="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-full" />
                            <span v-else
                                class="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 rounded-full group-hover:w-full transition-all duration-200" />
                        </ClientOnly>
                    </NuxtLink>
                </div>

                <div class="flex items-center">
                    <AuthState v-slot="{ loggedIn, clear }">
                        <div v-if="loggedIn" class="relative group">
                            <button
                                class="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-white/40 rounded-lg transition-all duration-200">
                                <Icon name="mdi:account-circle" class="w-5 h-5 text-gray-600" />
                                <span>{{ userLabel }}</span>
                                <Icon name="mdi:chevron-down" class="w-4 h-4 text-gray-500" />
                            </button>
                            <div
                                class="absolute right-0 top-full z-50 w-44 bg-white border border-gray-100 rounded-xl shadow-lg py-1 opacity-0 translate-y-1 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto focus-within:opacity-100 focus-within:translate-y-0 transition-all duration-150">
                                <NuxtLink to="/profile"
                                    class="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                    <Icon name="mdi:account" class="w-4 h-4" />
                                    Profile
                                </NuxtLink>
                                <NuxtLink to="/profile/tokens"
                                    class="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                    <Icon name="mdi:key-variant" class="w-4 h-4" />
                                    API Tokens
                                </NuxtLink>
                                <button
                                    class="w-full flex items-center gap-2 px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                                    @click="handleLogout(clear)">
                                    <Icon name="mdi:logout" class="w-4 h-4" />
                                    Logout
                                </button>
                            </div>
                        </div>
                        <div v-else>
                            <button
                                class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-white/30 rounded-lg transition-all duration-200 group"
                                @click="openInPopup('/api/auth/github')">
                                <Icon name="mdi:github"
                                    class="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
                                Sign in with GitHub
                            </button>
                        </div>
                    </AuthState>


                </div>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">

defineComponent({
    name: "HeaderComponent",
});

const { user, openInPopup } = useUserSession();

type SessionUser = {
    name?: string
    login?: string
    email?: string
}

const userLabel = computed(() => {
    const u = user.value as SessionUser | null;
    return u?.name ?? u?.login ?? u?.email ?? "Account";
});

const route = useRoute();

function isRouteProtectedByAuth(): boolean {
    const middleware = route.meta?.middleware as unknown;
    if (!middleware) return false;

    if (Array.isArray(middleware)) {
        return (middleware as string[]).includes("auth");
    }

    if (typeof middleware === "string") return middleware === "auth";

    return false;
}

async function handleLogout(clearFn: () => unknown | Promise<unknown>) {
    await Promise.resolve(clearFn());
    if (isRouteProtectedByAuth()) {
        await navigateTo("/");
    }
}

</script>