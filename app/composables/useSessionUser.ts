// useSessionUser.ts - Composable for consistent session user access

import type { SessionUser, MinimalSessionUser, SessionUserWithSubscription } from "#shared/types/session";

/**
 * Composable for accessing the current session user with proper typing
 * @returns Object with typed session user data and utility functions
 */
export function useSessionUser() {
    const { user, loggedIn } = useUserSession();

    /**
     * Get the current session user with full typing
     */
    const sessionUser = computed<SessionUser | null>(() => {
        return user.value as SessionUser | null;
    });

    /**
 * Get the current session user with minimal typing (for server-side use)
 */
    const minimalSessionUser = computed<MinimalSessionUser | null>(() => {
        const u = user.value;
        if (!u) return null;
        return {
            name: u.name,
            email: u.email,
        };
    });

    /**
     * Get the current session user with subscription info
     */
    const sessionUserWithSubscription = computed<SessionUserWithSubscription | null>(() => {
        const u = user.value as SessionUser | null;
        if (!u) return null;

        return {
            ...u,
            subscriptionTier: "Free",
            apiCallsUsed: 0,
            apiCallsLimit: 100,
        };
    });

    /**
     * Get user display name (name, login, or email fallback)
     */
    const displayName = computed(() => {
        const u = sessionUser.value;
        if (!u) return "User";
        return u.name || u.email || "User";
    });

    /**
     * Get user display email
     */
    const displayEmailOrLogin = computed(() => {
        const u = sessionUser.value;
        if (!u) return "";
        return u.email || "";
    });

    /**
     * Get user initials for avatar display
     */
    const userInitials = computed(() => {
        const name = displayName.value.trim();
        const parts = name.split(" ").filter(Boolean);
        const first = parts[0]?.[0] ?? "U";
        const second = parts.length > 1 ? (parts[1]?.[0] ?? "") : (name.length > 1 ? name[1] : "");
        return (first + (second || "")).toUpperCase();
    });

    /**
     * Get API usage statistics
     */
    const apiUsage = computed(() => {
        const u = sessionUser.value;
        if (!u) return { used: 0, limit: 100, percent: 0 };

        // Default values since these properties don't exist in the reverted type
        const used = 0;
        const limit = 100;
        const percent = 0;

        return { used, limit, percent };
    });

    /**
     * Get current subscription plan
     */
    const subscriptionPlan = computed(() => {
        const u = sessionUser.value;
        if (!u) return "Free";
        return "Free";
    });

    return {
        // Raw session data
        user: sessionUser,
        minimalUser: minimalSessionUser,
        userWithSubscription: sessionUserWithSubscription,
        loggedIn,

        // Computed display values
        displayName,
        displayEmailOrLogin,
        userInitials,

        // Usage and subscription info
        apiUsage,
        subscriptionPlan,

        // Utility functions
        isAuthenticated: computed(() => loggedIn.value),
        hasSubscription: computed(() => {
            return false; // Default to false since subscriptionTier doesn't exist in reverted type
        }),
    };
}
