<template>
    <div>
        <header class="flex justify-between items-center p-4 bg-default-400">
            <h1 class="text-lg font-bold">Passport Visa API</h1>
            <a href="https://github.com/nickypangers/passport-visa-api/issues" target="_blank">
                <UButton trailing-icon="i-lucide-github">Report a Mistake</UButton>
            </a>
        </header>
        <main>
            <slot />
        </main>
        <footer class="flex justify-center items-center p-4 bg-default-300">
            <p class="text-sm">
                <a href="https://github.com/nickypangers/passport-visa-api" target="_blank"
                    class="text-blue-500 hover:text-underline">Help contribute on Github</a>
            </p>
            <span class="mx-2">|</span>
            <p class="text-sm">
                Created by
                <a href="https://github.com/nickypangers" target="_blank" class="text-blue-500 hover:underline">
                    <span>@nickypangers</span>
                </a>
            </p>
        </footer>
    </div>
</template>
<style scoped>
main {
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 64px * 2);
    /* Adjust 64px to match the header height */
}
</style>