<template>
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <!-- Page header -->
        <div class="mb-8">
            <h1 class="text-2xl font-semibold text-gray-900">API Tokens</h1>
            <p class="text-gray-600 mt-1">Create and manage tokens for authenticating API requests.</p>
        </div>

        <!-- Create Token Card -->
        <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-8">
            <form class="flex flex-col gap-4" @submit.prevent="createToken">
                <div>
                    <label for="tokenName" class="block text-sm font-medium text-gray-700">Token name</label>
                    <input id="tokenName" v-model="newTokenName" type="text" maxlength="64"
                        placeholder="e.g. Server integration, CLI, Zapier" :aria-invalid="!!nameError"
                        class="mt-1 block w-full rounded-lg border-0 px-3 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-600 sm:text-sm transition"
                        :class="{ 'ring-red-500 focus:ring-red-500': !!nameError }">
                    <p v-if="nameError" class="text-sm text-red-600 mt-1">{{ nameError }}</p>
                </div>
                <div class="flex items-center gap-3">
                    <button type="submit"
                        class="inline-flex items-center rounded-lg bg-blue-600 text-white px-4 py-2.5 text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                        :disabled="creating || !newTokenName.trim()">
                        {{ creating ? 'Creating…' : 'Create token' }}
                    </button>
                    <p v-if="createdPlainToken" class="text-sm text-gray-700">
                        <span class="font-medium">New token:</span>
                        <code class="bg-gray-100 rounded px-2 py-1 break-all">{{ createdPlainToken }}</code>
                        <button type="button" class="ml-2 text-blue-600 hover:text-blue-700"
                            @click="copyToken">Copy</button>
                    </p>

                </div>
            </form>
        </div>

        <!-- Tokens Table -->
        <div class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name
                        </th>
                        <th scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Token
                        </th>
                        <th scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Preview
                        </th>
                        <th scope="col" class="px-6 py-3 text-right"><span class="sr-only">Actions</span></th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="t in tokens" :key="t.id">
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ t.name }}</td>
                        <td class="px-6 py-4 text-sm">
                            <template v-if="t.plainToken">
                                <code v-if="t.revealed"
                                    class="bg-gray-100 rounded px-2 py-1 break-all">{{ t.plainToken }}</code>
                                <span v-else class="text-gray-500">Hidden</span>
                            </template>
                            <span v-else class="text-gray-500">Hidden</span>
                        </td>
                        <td class="px-6 py-4 text-sm text-gray-500">
                            <span v-if="t.lastSix">••••••{{ t.lastSix }}</span>
                            <span v-else>—</span>
                        </td>
                        <td class="px-6 py-4 text-right text-sm align-middle">
                            <div class="inline-flex items-center gap-1.5">
                                <button type="button"
                                    class="inline-grid h-8 w-8 place-items-center rounded-md transition text-gray-500 hover:text-gray-700 hover:bg-gray-100 leading-none"
                                    :aria-label="t.revealed ? 'Hide token' : 'Reveal token'"
                                    :title="'Reveal or hide token'" @click="handleToggleReveal(t)">
                                    <!-- Eye / Eye-slash icon -->
                                    <svg v-if="!t.revealed" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                        fill="currentColor" class="h-5 w-5 block">
                                        <path
                                            d="M12 5c-7 0-10 7-10 7s3 7 10 7 10-7 10-7-3-7-10-7Zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10Z" />
                                    </svg>
                                    <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                        fill="currentColor" class="h-5 w-5 block">
                                        <path
                                            d="M3.28 2.22a.75.75 0 0 0-1.06 1.06l2.086 2.087A11.648 11.648 0 0 0 2 12s3 7 10 7c2.142 0 3.964-.564 5.472-1.415l3.248 3.247a.75.75 0 1 0 1.06-1.06L3.28 2.22Zm5.464 6.524 1.58 1.58a3 3 0 0 0 3.352 3.352l1.58 1.58A5 5 0 0 1 8.744 8.744Zm3.256-3.744c7 0 10 7 10 7a12.277 12.277 0 0 1-2.164 3.238l-1.086-1.086A10.773 10.773 0 0 0 20 12s-3-7-10-7c-.754 0-1.476.07-2.167.198l1.197 1.197c.313-.014.637-.02.97-.02Z" />
                                    </svg>
                                </button>
                                <button type="button"
                                    class="inline-grid h-8 w-8 place-items-center rounded-md transition text-gray-500 hover:text-gray-700 hover:bg-gray-100 leading-none"
                                    aria-label="Copy token" :title="'Copy token'" @click="handleCopyClick(t)">
                                    <!-- Clipboard icon -->
                                    <Icon name="mdi:content-copy" class="h-5 w-5 block" />
                                </button>
                                <button type="button"
                                    class="inline-grid h-8 w-8 place-items-center rounded-md transition text-gray-500 hover:text-gray-700 hover:bg-gray-100 leading-none"
                                    aria-label="Copy token" :title="'Copy token'" @click="handleDeleteClick(t)">
                                    <Icon name="mdi:delete" class="h-5 w-5 block" />
                                </button>
                            </div>
                        </td>
                    </tr>
                    <tr v-if="!loading && tokens.length === 0">
                        <td :colspan="columnsCount" class="px-6 py-6 text-center text-gray-500 text-sm">No tokens yet.
                            Create your
                            first token above.</td>
                    </tr>
                    <tr v-if="loading">
                        <td :colspan="columnsCount" class="px-6 py-6 text-center text-gray-500 text-sm">Loading…</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: ["auth"] });

type TokenRow = { id: number; name: string; plainToken?: string; createdAt?: string; revealed?: boolean; lastSix?: string };

const newTokenName = ref("");
const nameError = ref("");
const creating = ref(false);
const loading = ref(false);
const tokens = ref<TokenRow[]>([]);
const createdPlainToken = ref("");
const columnsCount = 4; // Name, Token, Preview, Actions

async function fetchTokens() {
    loading.value = true;
    try {
        const data = await $fetch<Array<{ id: number; name: string; lastSix?: string }>>("/api/tokens");
        tokens.value = data.map((t) => ({ id: t.id, name: t.name, lastSix: t.lastSix, revealed: false }));
    } catch {
        // noop UI-only
    } finally {
        loading.value = false;
    }
}

async function createToken() {
    nameError.value = "";
    const name = newTokenName.value.trim();
    if (!name) {
        nameError.value = "Token name is required";
        return;
    }
    creating.value = true;
    try {
        const res = await $fetch<{ id: number; name: string; token: string; lastSix?: string }>("/api/tokens", {
            method: "POST",
            body: { name },
        });
        createdPlainToken.value = res.token;
        tokens.value = [{ id: res.id, name: res.name, plainToken: res.token, lastSix: res.lastSix, revealed: false }, ...tokens.value];
        newTokenName.value = "";
    } catch (err: unknown) {
        let message = "Failed to create token";
        if (typeof err === "object" && err !== null && "data" in err) {
            const data = (err as Record<string, unknown>).data;
            if (data && typeof data === "object" && "message" in data && typeof (data as Record<string, unknown>).message === "string") {
                message = (data as Record<string, unknown>).message as string;
            }
        }
        nameError.value = message;
    } finally {
        creating.value = false;
    }
}

async function copyToken() {
    if (!createdPlainToken.value) return;
    await navigator.clipboard.writeText(createdPlainToken.value);
}

async function copySpecificToken(token: string) {
    await navigator.clipboard.writeText(token);
}

async function handleToggleReveal(row: TokenRow) {
    if (row.revealed) {
        row.revealed = false;
        return;
    }
    // If we already have it (freshly created), just reveal it
    if (row.plainToken) {
        row.revealed = true;
        return;
    }
    // Otherwise fetch from server
    try {
        const data = await $fetch<{ token: string }>(`/api/tokens/${row.id}/reveal`);
        row.plainToken = data.token;
        row.revealed = true;
    } catch {
        window.alert("Unable to reveal token. It may not be recoverable.");
    }
}

async function handleCopyClick(row: TokenRow) {
    if (!row.plainToken) {
        // try to reveal then copy
        try {
            const data = await $fetch<{ token: string }>(`/api/tokens/${row.id}/reveal`);
            row.plainToken = data.token;
        } catch {
            window.alert("Unable to copy. The token cannot be revealed.");
            return;
        }
    }
    copySpecificToken(row.plainToken as string);
}

async function handleDeleteClick(row: TokenRow) {
    if (!confirm("Are you sure you want to delete this token?")) {
        return;
    }
    await deleteToken(row);
}


async function deleteToken(row: TokenRow) {
    try {
        const result = await $fetch(`/api/tokens/${row.id}`, { method: "DELETE" });
        console.log(result);
        if (result.success) {
            tokens.value = tokens.value.filter((t) => t.id !== row.id);
        } else {
            window.alert("Unable to delete token.");
        }
    } catch (error) {
        console.error("Error deleting token:", error);
        window.alert("Failed to delete token. Please try again.");
    }
}

onMounted(fetchTokens);
</script>

<style scoped></style>