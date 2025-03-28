import { defineStore } from "pinia";
import type { Category, Country } from "~/server/utils/drizzle";

export const useAppDataStore = defineStore('appData', {
    state: () => ({ countries: [] as Country[], categories: [] as Category[] }),
    actions: {
        async fetchCountries() {
            const { data, status, error } = await useFetch('/api/countries')
            if (status.value !== 'success') {
                console.error(error.value);
            }
            if (!data.value) return;
            this.countries = data.value;
        },
        async fetchCategories() {
            const { data, status, error } = await useFetch('/api/categories')
            if (status.value !== 'success') {
                console.error(error.value);
            }
            if (!data.value) return;
            this.categories = data.value;
        },
        async fetchData() {
            await Promise.all([this.fetchCategories(), this.fetchCountries()])
        }
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAppDataStore, import.meta.hot!));
}