<template>
    <div class="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex flex-col items-center justify-start p-6">
        <!-- Header -->
        <div class="text-center mt-8 mb-10">
            <h1 class="text-4xl font-bold text-gray-900 mb-2">Simple, transparent pricing</h1>
            <p class="text-gray-600">Choose the plan that fits your API usage. Upgrade or cancel anytime.</p>
        </div>

        <!-- Billing Toggle -->
        <div class="mb-8">
            <div class="inline-flex items-center bg-white rounded-full shadow-sm border border-gray-200 p-1">
                <button class="px-4 py-2 text-sm font-medium rounded-full transition-all"
                    :class="billingCycle === 'monthly' ? 'bg-blue-600 text-white shadow' : 'text-gray-700 hover:text-gray-900'"
                    @click="billingCycle = 'monthly'">
                    Monthly
                </button>
                <button class="px-4 py-2 text-sm font-medium rounded-full transition-all"
                    :class="billingCycle === 'yearly' ? 'bg-blue-600 text-white shadow' : 'text-gray-700 hover:text-gray-900'"
                    @click="billingCycle = 'yearly'">
                    Yearly <span
                        class="ml-1 text-[11px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">Save
                        15%</span>
                </button>
            </div>
        </div>

        <!-- Featured CTA for Premium/Pro -->
        <div v-if="featuredTier" class="w-full max-w-6xl mb-6">
            <div
                class="flex flex-col md:flex-row items-center justify-between gap-4 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
                <div class="flex items-center gap-3 text-blue-900">
                    <Icon name="mdi:star-circle" class="w-6 h-6 text-blue-600" />
                    <span class="font-medium">{{ featuredTier.name }} is our most popular plan</span>
                </div>
                <div>
                    <button
                        class="inline-flex items-center justify-center rounded-lg bg-blue-600 text-white px-4 py-2 text-sm font-medium hover:bg-blue-700 transition-colors"
                        @click="onSelectTier(featuredTier)">
                        Choose {{ featuredTier.name }}
                    </button>
                </div>
            </div>
        </div>

        <!-- Plans -->
        <div class="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6">
            <div v-if="!orderedTiers.length" class="col-span-1 md:col-span-3">
                <div class="bg-white rounded-xl border border-gray-200 p-6 text-center text-gray-600">No subscription
                    tiers available.</div>
            </div>

            <div v-for="tier in orderedTiers" :key="tier.name"
                class="relative bg-white rounded-2xl shadow-sm p-6 flex flex-col"
                :class="isFeatured(tier) ? 'border-2 border-blue-300' : 'border border-gray-200'">
                <span v-if="isFeatured(tier)"
                    class="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center rounded-full bg-blue-600 text-white text-xs font-semibold px-3 py-1 shadow">Most
                    popular</span>

                <div
                    :class="['mb-2 text-sm font-semibold uppercase tracking-wide', isFeatured(tier) ? 'text-blue-700' : 'text-gray-600']">
                    {{ tier.name }}</div>

                <div class="flex items-end gap-2 mb-4">
                    <template v-if="!isContactSales(tier)">
                        <template v-if="billingCycle === 'yearly'">
                            <span v-if="isYearlyDiscounted(tier)" class="text-lg text-gray-400 line-through">{{
                                formatPrice(yearlyOriginalPrice(tier)) }}</span>
                            <span class="text-4xl font-bold text-gray-900">{{ formatPrice(yearlyDiscountedPrice(tier))
                                }}</span>
                            <span class="text-gray-500 mb-1">/ yr</span>
                            <span v-if="isYearlyDiscounted(tier)"
                                class="ml-2 text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-100">Save
                                {{ getDiscountedPercentage(tier) }}%</span>
                        </template>
                        <template v-else>
                            <span class="text-4xl font-bold text-gray-900">{{ formatPrice(priceForTier(tier,
                                billingCycle))
                            }}</span>
                            <span class="text-gray-500 mb-1">/ mo</span>
                        </template>
                    </template>
                    <template v-else>
                        <span class="text-2xl font-semibold text-gray-900">Contact sales</span>
                    </template>
                </div>

                <p class="text-gray-600 mb-6">{{ tier.description }}</p>

                <ul class="space-y-3 text-sm text-gray-700 flex-1">
                    <li v-for="(feature, idx) in (tier.features?.length ? tier.features : featuresByName(tier.name))"
                        :key="idx" class="flex items-start gap-2">
                        <Icon name="mdi:check-circle" class="w-5 h-5 text-green-500 mt-0.5" />
                        {{ feature }}
                    </li>
                </ul>

                <div class="mt-6">
                    <button
                        class="w-full inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors"
                        :class="ctaPrimaryClass(tier)" @click="onSelectTier(tier)">
                        {{ ctaLabel(tier) }}
                    </button>
                </div>
            </div>
        </div>

        <!-- FAQ -->
        <div class="w-full max-w-4xl mt-12">
            <div class="bg-white rounded-2xl border border-gray-200 p-6">
                <h2 class="text-xl font-semibold text-gray-900 mb-4">Frequently asked questions</h2>
                <div class="space-y-4 text-gray-700 text-sm">
                    <details class="group">
                        <summary class="cursor-pointer select-none font-medium text-gray-900">Can I change or cancel
                            anytime?</summary>
                        <div class="mt-2 text-gray-600">Yes, you can upgrade, downgrade, or cancel at any time from your
                            profile.</div>
                    </details>
                    <details class="group">
                        <summary class="cursor-pointer select-none font-medium text-gray-900">Do you offer a free trial?
                        </summary>
                        <div class="mt-2 text-gray-600">You can start on the Free plan and upgrade to Pro when ready.
                        </div>
                    </details>
                    <details class="group">
                        <summary class="cursor-pointer select-none font-medium text-gray-900">What happens if I hit my
                            limit?</summary>
                        <div class="mt-2 text-gray-600">We’ll return a 429 status until your quota resets. Upgrade to
                            increase monthly limits.</div>
                    </details>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
defineComponent({ name: "PricingPage" })

useHead({
    title: "Pricing - Passport Visa API",
    meta: [
        { name: "description", content: "Simple pricing for the Passport Visa API with Free, Pro, and Business plans." },
    ],
});

type BillingCycle = "monthly" | "yearly"

const billingCycle = ref<BillingCycle>("monthly")

type ApiTier = {
    id: number
    name: string
    sku: string
    description: string
    features?: string[]
    price: number | null
    stripePriceId: string | null
}

type CombinedTier = {
    name: string
    description: string
    features: string[]
    monthlyPrice: number | null
    yearlyPrice: number | null
    monthlyStripePriceId: string | null
    yearlyStripePriceId: string | null
}

// Use SSR-aware data fetching so payload is serialized and hydration stays in sync
const { data: apiTiers } = await useAsyncData<ApiTier[]>(
    "subscription-tiers",
    () => $fetch<ApiTier[]>("/api/subscription_tiers/list")
)

const combinedTiers = computed<CombinedTier[]>(() => {
    const byName: Record<string, CombinedTier> = {}
    for (const t of (apiTiers.value || [])) {
        const key = t.name.toLowerCase()
        if (!byName[key]) {
            byName[key] = {
                name: t.name,
                description: t.description,
                features: Array.isArray(t.features) ? t.features : [],
                monthlyPrice: null,
                yearlyPrice: null,
                monthlyStripePriceId: null,
                yearlyStripePriceId: null,
            }
        }
        const sku = (t.sku || "").toLowerCase()
        const isMonthly = sku.endsWith("monthly")
        const isYearly = sku.endsWith("yearly")
        if (isMonthly) {
            byName[key].monthlyPrice = t.price
            byName[key].monthlyStripePriceId = t.stripePriceId
        } else if (isYearly) {
            byName[key].yearlyPrice = t.price
            byName[key].yearlyStripePriceId = t.stripePriceId
        }
    }
    return Object.values(byName)
})


const { loggedIn } = useUserSession()

function formatPrice(value: number) {
    if (value === 0) return "$0"
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value)
}


// Derived helpers to map API results → UI
const orderedTiers = computed(() => {
    // Prefer Premium as the featured middle plan, fallback to Pro
    const normalized = (combinedTiers.value || []).map(t => ({ ...t, key: t.name.toLowerCase() }))
    const hasPremium = normalized.some(t => t.key === "premium")
    const featuredKey = hasPremium ? "premium" : "pro"
    const weights: Record<string, number> = {
        free: 0,
        [featuredKey]: 1,
        business: 2,
    }
    return [...normalized].sort((a, b) => (weights[a.key] ?? 99) - (weights[b.key] ?? 99))
})

const featuredTier = computed(() => orderedTiers.value.find(t => ["premium", "pro"].includes(t.name.toLowerCase())) || null)

function isFeatured(tier: CombinedTier) {
    const key = tier.name.toLowerCase()
    return key === "premium" || key === "pro"
}

function priceForTier(tier: CombinedTier, cycle: BillingCycle) {
    // Server returns a single integer price (assumed monthly, USD). Apply 15% yearly discount.

    const monthly = tier.monthlyPrice
    if (cycle === "monthly") return (monthly ?? 0) as number
    return (tier.yearlyPrice ?? 0) as number
}

function yearlyOriginalPrice(tier: CombinedTier) {
    return tier.monthlyPrice ? tier.monthlyPrice * 12 : 0
}

function yearlyDiscountedPrice(tier: CombinedTier) {
    return priceForTier(tier, "yearly")
}

function isYearlyDiscounted(tier: CombinedTier) {
    const original = yearlyOriginalPrice(tier)
    const discounted = yearlyDiscountedPrice(tier)
    if (!original) return false
    return original !== discounted
}

function getDiscountedPercentage(tier: CombinedTier) {
    const monthly = tier.monthlyPrice ?? null
    const yearly = tier.yearlyPrice ?? null
    if (monthly == null || monthly <= 0) return 0
    if (yearly == null) return 0
    const original = monthly * 12
    if (original <= 0) return 0
    const discount = Math.max(0, original - yearly)
    if (discount <= 0) return 0
    return Math.round((discount / original) * 100)
}

function featuresByName(name: string): string[] {
    switch (name.toLowerCase()) {
        case "free":
            return ["100 requests / month", "Standard rate limits", "Community support"]
        case "pro":
            return ["50,000 requests / month", "Higher rate limits + priority queueing", "Email support", "3 API keys, 3 team members"]
        case "business":
            return ["500,000+ requests / month", "Highest rate limits, priority support", "SSO/SAML, Audit logs, SLA", "Unlimited API keys & team members"]
        default:
            return ["Includes core API access"]
    }
}

function ctaPrimaryClass(tier: CombinedTier) {
    const base = "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors"
    return isFeatured(tier) ? "bg-blue-600 text-white hover:bg-blue-700 " + base : "border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 " + base
}

function ctaLabel(tier: CombinedTier) {
    const name = tier.name.toLowerCase()
    if (isContactSales(tier)) return "Contact sales"
    if (name === "free") return "Get started"
    // if (name === "pro") return loggedIn.value ? "Upgrade to Pro" : "Start Pro Trial"
    if (name === "pro") return "Upgrade to Pro"
    if (name === "business") return "Contact sales"
    return "Select plan"
}

function onSelectTier(tier: CombinedTier) {
    const name = tier.name.toLowerCase()
    if (isContactSales(tier) || name === "business") {
        window.location.href = "mailto:sales@example.com?subject=Passport%20Visa%20API%20Business%20Plan"
        return
    }

    if (!loggedIn.value) {
        navigateTo("/api/auth/github")
        return
    }
    requestCheckoutSession(tier)

    // navigateTo("/profile")
}

function isContactSales(tier: CombinedTier) {
    // Treat as contact sales if the selected cycle does not have a price
    return (billingCycle.value === "monthly" && tier.monthlyPrice == null)
        || (billingCycle.value === "yearly" && tier.yearlyPrice == null)
}

// Checkout session creation is handled server-side; no client function here
async function requestCheckoutSession(tier: CombinedTier) {
    const apiTier = (apiTiers.value || []).find(t => t.sku === `${tier.name.toLowerCase()}-${billingCycle.value}`)
    const stripePriceId = apiTier?.stripePriceId
    if (!stripePriceId) {
        console.error("No stripe price id found for tier", tier)
        return
    }

    const { data: session } = await useFetch("/api/checkout/create-session", {
        method: "POST",
        body: {
            stripePriceId,
        },
    })

    if (!session.value) {
        console.error("Failed to create checkout session", session.value)
        return
    }

    navigateTo(session.value.sessionUrl, { external: true })

}
</script>