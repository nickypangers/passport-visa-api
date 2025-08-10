<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-800 mb-2">Visa Requirements Matrix</h1>
        <p class="text-gray-600">
          Compare visa requirements for different passports across destinations
        </p>
      </div>

      <!-- Legend -->
      <div class="bg-white rounded-lg shadow-md p-4 mb-6">
        <h3 class="text-lg font-semibold text-gray-700 mb-3">Legend</h3>
        <div class="flex flex-wrap gap-4 text-sm">
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 bg-green-100 border border-green-300 rounded" />
            <span>Visa Free</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 bg-yellow-100 border border-yellow-300 rounded" />
            <span>Visa on Arrival / eVisa / ETA</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 bg-red-100 border border-red-300 rounded" />
            <span>Visa Required</span>
          </div>
        </div>
      </div>

      <!-- Table Container -->
      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th
                  class="sticky left-0 bg-gray-50 px-6 py-4 text-left text-sm font-semibold text-gray-700 border-r border-gray-200 min-w-[200px]">
                  Destination
                </th>
                <th v-for="(v, index) in 5" :key="`source-passport-${v}`"
                  class="px-4 py-4 text-center border-r border-gray-200 min-w-[200px]">
                  <div class="space-y-3">
                    <div class="text-sm font-semibold text-gray-700">Passport {{ index + 1 }}</div>
                    <select v-model="sources[index]"
                      class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                      @change="onSourceChange(index)">
                      <option :value="null" disabled>
                        Select Passport
                      </option>
                      <option v-for="country in countries" :key="country.id" :value="country.id">
                        {{ country.name }}
                      </option>
                    </select>
                    <button v-if="sources[index]" class="text-xs text-red-600 hover:text-red-800 underline"
                      @click="clearSource(index)">
                      Clear
                    </button>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="country in countries" :key="country.id" class="hover:bg-gray-50 transition-colors">
                <td class="sticky left-0 bg-white px-6 py-4 text-sm font-medium text-gray-900 border-r border-gray-200">
                  {{ country.name }}
                </td>
                <td v-for="(source, index) in sources" :key="`${country.id}-in-source-${index}`"
                  :class="getCellClass(index, country.id)"
                  class="px-4 py-4 text-center text-sm border-r border-gray-200 transition-all duration-200">
                  <div v-if="sources[index] === country.id" class="text-gray-600 font-medium">
                    -
                  </div>
                  <div v-else-if="visaResults[index] && getVisaCellData(index, country.id)">
                    <div class="font-semibold mb-1">
                      {{ getVisaCellData(index, country.id)?.category.name }}
                    </div>
                    <div v-if="getVisaCellData(index, country.id)?.duration" class="text-xs opacity-75">
                      {{ getVisaCellData(index, country.id)?.duration }} days
                    </div>
                  </div>
                  <div v-else-if="sources[index]" class="text-gray-500 italic">
                    <div class="animate-pulse">Loading...</div>
                  </div>
                  <div v-else class="text-gray-400 italic text-xs">
                    Select passport above
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Footer -->
      <div class="text-center mt-8 text-gray-500 text-sm">
        <p>Visa requirements may change. Always check with official sources before traveling.</p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">

import type { CountryResponse } from "~~/shared/utils/validator";

const appStore = useAppStore();

const countries = computed(() => appStore.countries);

const sources = ref<(number | null)[]>([null, null, null, null, null]);

const visaResults = ref<(CountryResponse | null)[]>([null, null, null, null, null]);

function getVisaCellData(sourceIndex: number, destinationId: number) {
  const source = sources.value[sourceIndex];
  if (source === null) return null;

  const destination = countries.value.find((c) => c.id === destinationId);
  if (!destination) return null;

  const result = visaResults.value[sourceIndex];
  if (result === null) return null;

  return result?.data.find((d) => d.name === destination.name);
}

function getCellClass(sourceIndex: number, destinationId: number) {
  const visaData = getVisaCellData(sourceIndex, destinationId);
  if (!visaData) return "";

  const categoryCode = visaData.category.code.toLowerCase();

  // Style based on common visa category codes
  switch (categoryCode) {
    case "vf":
      return "bg-green-100 border-green-300 text-green-800";
    case "vr":
      return "bg-red-100 border-red-300 text-red-800";
    case "voa":
    case "evisa":
    case "eta":
      return "bg-yellow-100 border-yellow-300 text-yellow-800";
    default:
      return "bg-gray-100 border-gray-300 text-gray-800";
  }
}

function clearSource(index: number) {
  sources.value[index] = null;
}

function onSourceChange(index: number) {
  if (sources.value[index] === null) return;

  fetchVisaResult(sources.value[index]!).then((result) => {
    visaResults.value[index] = result;
  });
}

onMounted(async () => {
  if (countries.value.length === 0) {
    await appStore.fetchCountries();
  }
});

async function fetchVisaResult(sourceId: number | null) {
  if (sourceId === null) return null;

  const result = await $fetch("/api/countries", {
    method: "POST",
    body: { country: sourceId },
  });

  return result;
}
</script>
