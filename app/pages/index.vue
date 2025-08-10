<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4"
  >
    <!-- Header -->
    <div class="text-center mb-8">
      <h1 class="text-4xl font-bold text-gray-800 mb-2">Passport Visa API</h1>
      <p class="text-gray-600">Check visa requirements for your travel destination</p>
    </div>

    <!-- Main Card -->
    <div class="bg-white rounded-2xl shadow-xl p-8 w-full max-w-4xl">
      <!-- Country Selection -->
      <div class="grid md:grid-cols-2 gap-6 mb-8">
        <!-- Passport Country -->
        <div class="space-y-2">
          <label class="block text-sm font-semibold text-gray-700"> 🛂 Passport Country </label>
          <select
            v-model="passportCountryId"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white hover:border-gray-400"
          >
            <option
              :value="null"
              disabled
              class="text-gray-400"
            >
              Select your passport country
            </option>
            <option
              v-for="(country, id) in countries"
              :key="`passport-country-${id}`"
              :value="country.id"
              class="text-gray-800"
            >
              {{ country.name }}
            </option>
          </select>
        </div>

        <!-- Destination Country -->
        <div class="space-y-2">
          <label class="block text-sm font-semibold text-gray-700"> 🌍 Destination Country </label>
          <select
            v-model="destinationCountryId"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white hover:border-gray-400"
          >
            <option
              :value="null"
              disabled
              class="text-gray-400"
            >
              Select your destination
            </option>
            <option
              v-for="(country, id) in countries"
              :key="`destination-country-${id}`"
              :value="country.id"
              class="text-gray-800"
            >
              {{ country.name }}
            </option>
          </select>
        </div>
      </div>

      <!-- Check Button -->
      <div class="text-center mb-6">
        <button
          :disabled="!passportCountryId || !destinationCountryId || loading"
          class="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed transform hover:scale-105"
          @click="checkVisaRequirements"
        >
          <span v-if="loading">Checking...</span>
          <span v-else>Check Visa Requirements</span>
        </button>
      </div>

      <!-- Error Display -->
      <div
        v-if="error"
        class="mt-6"
      >
        <div class="bg-red-50 border border-red-200 rounded-lg p-6">
          <div class="flex items-start space-x-3">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                <svg
                  class="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-red-900 mb-2">Error</h3>
              <p class="text-red-800">{{ error }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Result Display -->
      <div
        v-if="result && result.id"
        class="mt-6"
      >
        <div
          :class="`${getVisaColorScheme.containerBg} border ${getVisaColorScheme.containerBorder} rounded-lg p-6`"
        >
          <div class="flex items-start space-x-3">
            <div class="flex-shrink-0">
              <div
                :class="`w-8 h-8 ${getVisaColorScheme.iconBg} rounded-full flex items-center justify-center`"
              >
                <!-- Green Checkmark for Visa Free -->
                <svg
                  v-if="result.category && getVisaColorScheme.iconBg === 'bg-green-500'"
                  class="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                <!-- Red Cross for Visa Required -->
                <svg
                  v-else-if="result.category && getVisaColorScheme.iconBg === 'bg-red-500'"
                  class="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
                <!-- Orange Dash for Other Categories -->
                <svg
                  v-else-if="result.category && getVisaColorScheme.iconBg === 'bg-orange-500'"
                  class="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clip-rule="evenodd"
                  />
                </svg>
                <!-- Default Gray Checkmark -->
                <svg
                  v-else
                  class="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <div class="flex-1">
              <h3 :class="`text-lg font-semibold ${getVisaColorScheme.textTitle} mb-4`">
                Visa Information Found
              </h3>

              <div class="grid md:grid-cols-2 gap-4 mb-4">
                <div
                  v-if="result.passport"
                  :class="`bg-white rounded-lg p-4 border ${getVisaColorScheme.cardBorder}`"
                >
                  <h4 :class="`font-semibold ${getVisaColorScheme.cardTitle} mb-2`">
                    🛂 Passport Country
                  </h4>
                  <p :class="getVisaColorScheme.textContent">
                    {{ result.passport.name }} ({{ result.passport.code }})
                  </p>
                </div>

                <div
                  v-if="result.destination"
                  :class="`bg-white rounded-lg p-4 border ${getVisaColorScheme.cardBorder}`"
                >
                  <h4 :class="`font-semibold ${getVisaColorScheme.cardTitle} mb-2`">
                    🌍 Destination
                  </h4>
                  <p :class="getVisaColorScheme.textContent">
                    {{ result.destination.name }} ({{ result.destination.code }})
                  </p>
                </div>
              </div>

              <div class="grid md:grid-cols-2 gap-4">
                <div
                  v-if="result.category"
                  :class="`bg-white rounded-lg p-4 border ${getVisaColorScheme.cardBorder}`"
                >
                  <h4 :class="`font-semibold ${getVisaColorScheme.cardTitle} mb-2`">
                    📋 Visa Category
                  </h4>
                  <p :class="getVisaColorScheme.textContent">
                    {{ result.category.name }} ({{ result.category.code }})
                  </p>
                </div>

                <div
                  v-if="result.dur"
                  :class="`bg-white rounded-lg p-4 border ${getVisaColorScheme.cardBorder}`"
                >
                  <h4 :class="`font-semibold ${getVisaColorScheme.cardTitle} mb-2`">⏰ Duration</h4>
                  <p :class="getVisaColorScheme.textContent">{{ result.dur }} days</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- No Result Display -->
      <div
        v-else-if="result && !result.id"
        class="mt-6"
      >
        <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div class="flex items-start space-x-3">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                <svg
                  class="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-yellow-900 mb-2">No Visa Information Found</h3>
              <p class="text-yellow-800">
                No visa requirements found for this travel combination. Please check with official
                sources.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="mt-8 text-center text-gray-500 text-sm">
      <p>Always verify visa requirements with official government sources before traveling</p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { VisaResponse } from "@@/shared/utils/validator";

  const appStore = useAppStore();
  const countries = computed(() => appStore.countries);

  const passportCountryId = ref<number | null>(null);
  const destinationCountryId = ref<number | null>(null);

  const result = ref<VisaResponse | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Color scheme based on visa category
  const getVisaColorScheme = computed(() => {
    if (!result.value?.category) {
      return {
        containerBg: "bg-gray-50",
        containerBorder: "border-gray-200",
        iconBg: "bg-gray-500",
        textTitle: "text-gray-900",
        textContent: "text-gray-700",
        cardBorder: "border-gray-100",
        cardTitle: "text-gray-800",
      };
    }

    const categoryName = result.value.category.name.toLowerCase();
    const categoryCode = result.value.category.code.toLowerCase();

    // Check if visa is required (red)
    if (
      categoryName.includes("required") ||
      categoryName.includes("visa required") ||
      categoryCode.includes("req") ||
      categoryCode === "vr"
    ) {
      return {
        containerBg: "bg-red-50",
        containerBorder: "border-red-200",
        iconBg: "bg-red-500",
        textTitle: "text-red-900",
        textContent: "text-red-800",
        cardBorder: "border-red-100",
        cardTitle: "text-red-800",
      };
    }

    // Check if visa is free (green)
    if (
      categoryName.includes("free") ||
      categoryName.includes("visa free") ||
      categoryName.includes("no visa") ||
      categoryCode.includes("free") ||
      categoryCode === "vf" ||
      categoryCode === "nv"
    ) {
      return {
        containerBg: "bg-green-50",
        containerBorder: "border-green-200",
        iconBg: "bg-green-500",
        textTitle: "text-green-900",
        textContent: "text-green-800",
        cardBorder: "border-green-100",
        cardTitle: "text-green-800",
      };
    }

    // Default for other categories (orange)
    return {
      containerBg: "bg-orange-50",
      containerBorder: "border-orange-200",
      iconBg: "bg-orange-500",
      textTitle: "text-orange-900",
      textContent: "text-orange-800",
      cardBorder: "border-orange-100",
      cardTitle: "text-orange-800",
    };
  });

  const checkVisaRequirements = async () => {
    if (!passportCountryId.value || !destinationCountryId.value) {
      return;
    }

    loading.value = true;
    error.value = null;

    try {
      const response = await $fetch<VisaResponse>("/api/visas", {
        method: "POST",
        body: {
          passport: passportCountryId.value,
          destination: destinationCountryId.value,
        },
      });

      result.value = response;
    } catch (err) {
      error.value = "Failed to fetch visa requirements. Please try again.";
      console.error("Visa API error:", err);
    } finally {
      loading.value = false;
    }
  };
</script>

<style scoped></style>
