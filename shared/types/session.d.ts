// session.d.ts - Centralized session user type definitions

export interface SessionUser {
    id?: number;
    name?: string;
    email?: string;
    providerId?: number;
    roleId?: number;
    emailVerified?: boolean;
    subscriptionTierId?: number;
    monthlyRequestLimit?: number;
}

// Type for minimal session user (when only basic info is needed)
export interface MinimalSessionUser {
    name?: string;
    email?: string;
}

// Type for session user with subscription info
export interface SessionUserWithSubscription extends SessionUser {
    subscriptionTier?: string;
    apiCallsUsed?: number;
    apiCallsLimit?: number;
}
