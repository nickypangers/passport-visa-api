<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50">
        <div class="bg-white rounded-lg shadow-md p-8 max-w-md w-full">
            <h2 class="text-2xl font-bold text-gray-800 mb-4">Login</h2>
            <form @submit.prevent="login()">
                <div class="mb-4">
                    <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                    <input id="email" v-model="credentials.email" type="email" required
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50">
                </div>
                <div class="mb-4">
                    <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                    <input id="password" v-model="credentials.password" type="password" required
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50">
                </div>
                <div class="mb-4">
                    <button type="submit"
                        class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">Login</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">

const { fetch: refreshSession } = useUserSession();
const credentials = reactive({
    email: '',
    password: '',
});

async function login() {
    $fetch("/api/login", {
        method: 'POST',
        body: credentials,
    }).then(async () => {
        await refreshSession();
        await navigateTo('/');
    }).catch(() => alert('Invalid credentials'));
}

</script>