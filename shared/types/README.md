# Session User Types

This directory contains centralized type definitions for session user data that can be used throughout the application.

## Types

### `SessionUser`
The main session user interface that includes all possible user properties:

```typescript
interface SessionUser {
  // Core user properties
  id: number;
  email: string;
  name?: string;
  login?: string;
  emailVerified: boolean;
  providerId: number;
  roleId: number | null;
  
  // Subscription and usage properties
  subscriptionTierId?: number;
  subscriptionTier?: string;
  apiCallsUsed?: number;
  apiCallsLimit?: number;
  monthlyRequestLimit?: number;
  
  // Additional properties that might be added by OAuth providers
  image?: string;
  avatar_url?: string;
  
  // Timestamps
  createdAt?: Date;
  updatedAt?: Date;
}
```

### `MinimalSessionUser`
A minimal version for server-side use when only basic user info is needed:

```typescript
interface MinimalSessionUser {
  id: number;
  email?: string;
}
```

### `SessionUserWithSubscription`
Extended version that guarantees subscription properties are present:

```typescript
interface SessionUserWithSubscription extends SessionUser {
  subscriptionTier: string;
  apiCallsUsed: number;
  apiCallsLimit: number;
}
```

## Usage

### In Vue Components

Use the `useSessionUser` composable for consistent access:

```vue
<script setup lang="ts">
const { 
  user, 
  displayName, 
  userInitials, 
  apiUsage, 
  subscriptionPlan 
} = useSessionUser();

// Access user data
const userName = displayName.value;
const { used, limit, percent } = apiUsage.value;
</script>
```

### In Server-Side API Routes

Import the types directly:

```typescript
import type { SessionUser, MinimalSessionUser } from '#shared/types/session';

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);
  const sessionUser = session?.user as SessionUser | undefined;
  
  if (!sessionUser?.id) {
    throw createAppError({ statusCode: 401, message: "Unauthorized" });
  }
  
  // Use sessionUser with full typing
});
```

### Direct Type Import

You can also import the types directly in any file:

```typescript
import type { SessionUser } from '#shared/types/session';

const user: SessionUser = {
  id: 1,
  email: 'user@example.com',
  name: 'John Doe',
  // ... other properties
};
```

## Benefits

1. **Consistency**: All components use the same type definition
2. **Type Safety**: Full TypeScript support with IntelliSense
3. **Maintainability**: Single source of truth for user data structure
4. **Flexibility**: Multiple interfaces for different use cases
5. **Reusability**: Can be used in both client and server code

## Migration

To migrate existing code:

1. Remove local `SessionUser` type definitions
2. Import from `#shared/types/session` or use `useSessionUser` composable
3. Update type assertions to use the centralized types

Example migration:
```typescript
// Before
type SessionUser = {
  name?: string;
  email?: string;
}

// After
import type { SessionUser } from '#shared/types/session';
// or use the composable
const { user } = useSessionUser();
```
