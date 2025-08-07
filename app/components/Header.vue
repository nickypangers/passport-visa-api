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
                    <div v-if="user">
                        <div class="flex items-center gap-4">
                            <p class="text-sm font-medium text-gray-600">{{ user?.name || user?.login }}</p>
                            <button
                                class="px-3 py-1.5 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
                                @click="clear()">
                                Logout
                            </button>
                        </div>
                    </div>
                    <div v-else>
                        <button
                            class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-white/30 rounded-lg transition-all duration-200 group"
                            @click="login">
                            <Icon name="mdi:github"
                                class="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
                            Sign in with GitHub
                        </button>
                    </div>
                    <!-- GitHub Link -->
                    <!-- <div class="flex items-center">
                        <a href="https://github.com/nickypangers/passport-visa-api" target="_blank"
                            rel="noopener noreferrer"
                            class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-white/30 rounded-lg transition-all duration-200 group">
                            <Icon name="mdi:external-link"
                                class="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
                            GitHub
                        </a>
                    </div> -->
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">

defineComponent({
    name: 'HeaderComponent',
})

const { user, session, clear } = useUserSession();

function login() {
    navigateTo('/api/auth/github')
}

console.log(user.value);
console.log(session.value);

</script>