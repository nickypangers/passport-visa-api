import { defineStore } from 'pinia';
import type { Country } from '@@/server/utils/drizzle';

export const useAppStore = defineStore('appStore', {
  state: () => ({
    countries: [] as Country[],
  }),
  actions: {
    async fetchCountries() {
      const { data, status, error } = await useFetch<Country[]>('/api/countries');
      if (status.value !== 'success') {
        console.log(error.value);
      }
      if (!data.value) return;
      this.countries = data.value;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot!));
}
