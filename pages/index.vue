<script setup>

const appDataStore = useAppDataStore();

const passportCountryId = ref(null);
const destinationCountryId = ref(null);

const result = ref(null);

const debouncedGetResult = _debounce(() => {
    console.log('Debounced');
    if (passportCountryId.value && destinationCountryId.value && passportCountryId.value != destinationCountryId.value) {
        getResult();
    }
}, 500);

watch([passportCountryId, destinationCountryId], () => {
    console.log('Passport country:', passportCountryId.value);
    console.log('Destination country:', destinationCountryId.value);

    debouncedGetResult();
});

const query = computed(() => {
    return {
        passport: passportCountryId.value,
        destination: destinationCountryId.value,
    }
})

async function getResult() {
    await $fetch('/api/visa', {
        query: {
            passport: passportCountryId && passportCountryId.value,
            destination: destinationCountryId && destinationCountryId.value,
        }
    }).then((data) => {
        result.value = data;
    });
}

</script>
<template>
    <div class="h-screen flex flex-col items-center justify-center space-y-6">
        <div class="flex space-x-8">
            <div class="flex flex-col">
                <p>Passport Country</p>

                <USelectMenu v-model="passportCountryId" placeholder="Select country" value-key="code" label-key="name"
                    :items="appDataStore.countries" label="Passport Country" class="w-48" />

            </div>
            <div class="flex flex-col">
                <p>Destination Country</p>
                <USelectMenu v-model="destinationCountryId" placeholder="Select country" value-key="code"
                    label-key="name" :items="appDataStore.countries" class="w-48" label="Destination Country" />

            </div>
        </div>
        <!--
        
                {
  "id": 1047,
  "passport": {
    "name": "Antigua and Barbuda",
    "code": "AG"
  },
  "destination": {
    "name": "Fiji",
    "code": "FJ"
  },
  "dur": 120,
  "category": {
    "name": "Visa Free",
    "code": "VF"
  }
}
-->

        <div class="w-full max-w-2xl">
            <div v-show="result" class="p-4 bg-gray-100 rounded shadow text-black">
                <p><strong>Category:</strong> {{ result?.category.name }}</p>
                <p v-show="result?.dur"><strong>Duration:</strong> {{ result?.dur }} days</p>
            </div>

        </div>
    </div>
</template>