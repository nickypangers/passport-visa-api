# Third-Party Authentication Implementation Plan

## Phase 1: @nuxt/auth-utils Setup (Official Nuxt Module)

### 1. Install Dependencies

```bash
npx nuxi@latest module add auth-utils
```

### 2. OAuth Provider Setup

#### Google OAuth:

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect: `http://localhost:3000/auth/google`

#### GitHub OAuth:

1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Create new OAuth App
3. Homepage URL: `http://localhost:3000`
4. Callback URL: `http://localhost:3000/auth/github`

#### Discord OAuth:

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Create new application
3. Go to OAuth2 section
4. Add redirect: `http://localhost:3000/auth/discord`

### 3. Environment Variables

```env
# Session Secret (auto-generated in development if not set)
NUXT_SESSION_PASSWORD=your-super-secret-key-minimum-32-characters

# OAuth Providers
NUXT_OAUTH_GOOGLE_CLIENT_ID=your_google_client_id
NUXT_OAUTH_GOOGLE_CLIENT_SECRET=your_google_client_secret

NUXT_OAUTH_GITHUB_CLIENT_ID=your_github_client_id
NUXT_OAUTH_GITHUB_CLIENT_SECRET=your_github_client_secret

NUXT_OAUTH_DISCORD_CLIENT_ID=your_discord_client_id
NUXT_OAUTH_DISCORD_CLIENT_SECRET=your_discord_client_secret
```

### 4. Database Schema Updates

#### Users Table (OAuth compatible):

```sql
-- Create users table for OAuth authentication
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  image TEXT,
  provider TEXT NOT NULL, -- 'google', 'github', 'discord'
  provider_id TEXT NOT NULL, -- OAuth provider user ID
  subscription_tier TEXT DEFAULT 'free', -- 'free', 'pro', 'enterprise'
  api_calls_used INTEGER DEFAULT 0,
  api_calls_limit INTEGER DEFAULT 100,
  subscription_expires TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create API keys table for monetization
CREATE TABLE api_keys (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  key_hash TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  tier TEXT DEFAULT 'free',
  created_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE
);

-- Create usage tracking table
CREATE TABLE api_usage (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  api_key_id INTEGER REFERENCES api_keys(id) ON DELETE SET NULL,
  endpoint TEXT NOT NULL,
  response_time INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 5. Nuxt Config Update

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    'nuxt-auth-utils',
    // ... existing modules
  ],
  runtimeConfig: {
    // OAuth configuration is handled via environment variables
    // No additional config needed
  },
});
```

## Phase 2: Authentication Logic

### 1. OAuth Route Handlers

```typescript
// server/routes/auth/google.get.ts
export default oauthGoogleEventHandler({
  async onSuccess(event, { user }) {
    // Check if user exists in database
    let dbUser = await db.query.users.findFirst({
      where: eq(users.provider_id, user.id),
    });

    // Create user if doesn't exist
    if (!dbUser) {
      [dbUser] = await db
        .insert(users)
        .values({
          email: user.email,
          name: user.name,
          image: user.picture,
          provider: 'google',
          provider_id: user.id,
          subscription_tier: 'free',
          api_calls_used: 0,
          api_calls_limit: 100,
        })
        .returning();
    }

    // Set user session
    await setUserSession(event, {
      user: {
        id: dbUser.id,
        email: dbUser.email,
        name: dbUser.name,
        image: dbUser.image,
        provider: dbUser.provider,
        subscriptionTier: dbUser.subscription_tier,
        apiCallsUsed: dbUser.api_calls_used,
        apiCallsLimit: dbUser.api_calls_limit,
      },
      loggedInAt: new Date(),
    });

    return sendRedirect(event, '/dashboard');
  },
  onError(event, error) {
    console.error('Google OAuth error:', error);
    return sendRedirect(event, '/login?error=oauth');
  },
});
```

```typescript
// server/routes/auth/github.get.ts
export default oauthGitHubEventHandler({
  async onSuccess(event, { user }) {
    // Check if user exists in database
    let dbUser = await db.query.users.findFirst({
      where: eq(users.provider_id, String(user.id)),
    });

    // Create user if doesn't exist
    if (!dbUser) {
      [dbUser] = await db
        .insert(users)
        .values({
          email: user.email,
          name: user.name,
          image: user.avatar_url,
          provider: 'github',
          provider_id: String(user.id),
          subscription_tier: 'free',
          api_calls_used: 0,
          api_calls_limit: 100,
        })
        .returning();
    }

    // Set user session
    await setUserSession(event, {
      user: {
        id: dbUser.id,
        email: dbUser.email,
        name: dbUser.name,
        image: dbUser.image,
        provider: dbUser.provider,
        subscriptionTier: dbUser.subscription_tier,
        apiCallsUsed: dbUser.api_calls_used,
        apiCallsLimit: dbUser.api_calls_limit,
      },
      loggedInAt: new Date(),
    });

    return sendRedirect(event, '/dashboard');
  },
  onError(event, error) {
    console.error('GitHub OAuth error:', error);
    return sendRedirect(event, '/login?error=oauth');
  },
});
```

### 2. API Protection Middleware

```typescript
// server/utils/auth.ts
export async function requireAuth(event: any) {
  const session = await requireUserSession(event);
  return session.user;
}

export async function checkApiLimit(user: any) {
  if (user.apiCallsUsed >= user.apiCallsLimit) {
    throw createError({
      statusCode: 429,
      statusMessage: 'API limit exceeded. Please upgrade your plan.',
    });
  }
}

export async function incrementApiUsage(userId: number) {
  await db
    .update(users)
    .set({
      api_calls_used: sql`${users.api_calls_used} + 1`,
      updated_at: new Date(),
    })
    .where(eq(users.id, userId));
}
```

### 3. Session Management

```typescript
// server/plugins/auth.ts
export default defineNitroPlugin(() => {
  // Extend user session when fetched
  sessionHooks.hook('fetch', async (session, event) => {
    // Refresh user data from database
    if (session.user?.id) {
      const dbUser = await db.query.users.findFirst({
        where: eq(users.id, session.user.id),
      });

      if (dbUser) {
        session.user.subscriptionTier = dbUser.subscription_tier;
        session.user.apiCallsUsed = dbUser.api_calls_used;
        session.user.apiCallsLimit = dbUser.api_calls_limit;
      }
    }
  });

  // Log when user logs out
  sessionHooks.hook('clear', async (session, event) => {
    console.log(`User ${session.user?.email} logged out`);
  });
});
```

## Phase 3: Frontend Integration

### 1. Login Page

```vue
<!-- app/pages/login.vue -->
<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="max-w-md w-full space-y-8">
      <h2 class="text-3xl font-bold text-center">Sign in to Passport Visa API</h2>

      <div class="space-y-4">
        <a
          href="/auth/google"
          class="oauth-button"
        >
          <Icon name="logos:google-icon" />
          Continue with Google
        </a>

        <a
          href="/auth/github"
          class="oauth-button"
        >
          <Icon name="logos:github-icon" />
          Continue with GitHub
        </a>

        <a
          href="/auth/discord"
          class="oauth-button"
        >
          <Icon name="logos:discord-icon" />
          Continue with Discord
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
  // Redirect if already logged in
  const { loggedIn } = useUserSession();
  if (loggedIn.value) {
    await navigateTo('/dashboard');
  }
</script>

<style scoped>
  .oauth-button {
    @apply w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors;
  }
</style>
```

### 2. Dashboard Page

```vue
<!-- app/pages/dashboard.vue -->
<template>
  <div class="container mx-auto p-6">
    <header class="mb-8">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Welcome, {{ user?.name }}!</h1>
          <p class="text-gray-600">Manage your API usage and subscription</p>
        </div>
        <button
          @click="clear"
          class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- API Usage Card -->
      <div class="bg-white rounded-lg shadow-lg p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">API Usage</h3>
        <div class="text-3xl font-bold text-blue-600 mb-2">
          {{ user?.apiCallsUsed || 0 }} / {{ user?.apiCallsLimit || 100 }}
        </div>
        <div class="w-full bg-gray-200 rounded-full h-3 mb-2">
          <div
            class="bg-blue-600 h-3 rounded-full transition-all duration-300"
            :style="`width: ${Math.min(((user?.apiCallsUsed || 0) / (user?.apiCallsLimit || 100)) * 100, 100)}%`"
          ></div>
        </div>
        <p class="text-sm text-gray-600">
          {{ user?.apiCallsLimit - user?.apiCallsUsed || 100 }} calls remaining
        </p>
      </div>

      <!-- Subscription Card -->
      <div class="bg-white rounded-lg shadow-lg p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Subscription</h3>
        <div class="text-2xl font-bold capitalize text-gray-900 mb-4">
          {{ user?.subscriptionTier || 'Free' }} Plan
        </div>
        <button
          v-if="user?.subscriptionTier === 'free'"
          class="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Upgrade to Pro
        </button>
        <div
          v-else
          class="text-green-600 font-medium"
        >
          ✓ Active Subscription
        </div>
      </div>

      <!-- API Key Management -->
      <div class="bg-white rounded-lg shadow-lg p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">API Keys</h3>
        <p class="text-gray-600 mb-4">Generate and manage your API keys</p>
        <button
          class="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
        >
          Generate New Key
        </button>
      </div>
    </div>

    <!-- API Documentation Link -->
    <div class="mt-8 bg-blue-50 rounded-lg p-6">
      <h3 class="text-lg font-semibold text-blue-900 mb-2">Get Started</h3>
      <p class="text-blue-700 mb-4">
        Ready to use our Passport Visa API? Check out the documentation.
      </p>
      <a
        href="/docs"
        class="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
      >
        View API Docs
      </a>
    </div>
  </div>
</template>

<script setup>
  const { loggedIn, user, clear, fetch } = useUserSession();

  // Redirect to login if not authenticated
  if (!loggedIn.value) {
    await navigateTo('/login');
  }

  // Refresh user data on page load
  await fetch();
</script>
```

### 3. Protected API Usage Example

```vue
<!-- app/pages/api-test.vue -->
<template>
  <div class="container mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6">Test Visa API</h1>

    <div class="bg-white rounded-lg shadow p-6">
      <form
        @submit.prevent="testVisaAPI"
        class="space-y-4"
      >
        <div>
          <label class="block text-sm font-medium text-gray-700">Passport Country ID</label>
          <input
            v-model="passport"
            type="number"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Destination Country ID</label>
          <input
            v-model="destination"
            type="number"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            required
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          {{ loading ? 'Checking...' : 'Check Visa Requirements' }}
        </button>
      </form>

      <div
        v-if="result"
        class="mt-6 p-4 bg-gray-50 rounded-lg"
      >
        <h3 class="font-semibold mb-2">Result:</h3>
        <pre class="text-sm">{{ JSON.stringify(result, null, 2) }}</pre>
      </div>

      <div
        v-if="error"
        class="mt-6 p-4 bg-red-50 rounded-lg text-red-700"
      >
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script setup>
  const { loggedIn } = useUserSession();

  // Redirect to login if not authenticated
  if (!loggedIn.value) {
    await navigateTo('/login');
  }

  const passport = ref(1);
  const destination = ref(2);
  const loading = ref(false);
  const result = ref(null);
  const error = ref(null);

  async function testVisaAPI() {
    loading.value = true;
    error.value = null;
    result.value = null;

    try {
      const response = await $fetch('/api/visas', {
        method: 'POST',
        body: {
          passport: passport.value,
          destination: destination.value,
        },
      });

      result.value = response;
    } catch (err) {
      error.value = err.statusMessage || 'An error occurred';
    } finally {
      loading.value = false;
    }
  }
</script>
```

## Benefits of @nuxt/auth-utils Approach

1. **Official Nuxt Module**: Maintained by the Nuxt team, ensuring long-term support and compatibility
2. **Minimal Dependencies**: Lightweight with only UnJS dependencies, faster builds and smaller bundle size
3. **Better UX**: Users sign in with accounts they already have (Google, GitHub, Discord)
4. **No Password Management**: No need to handle password resets, email verification, etc.
5. **Higher Conversion**: OAuth signup is 60%+ vs 20% for email/password
6. **Built-in Security**: Automatic CSRF protection, secure cookies, session management
7. **Database Control**: Full control over user data for billing and subscription management
8. **TypeScript First**: Fully typed with excellent IntelliSense support
9. **Framework Agnostic**: Works with SSR, SPA, and hybrid rendering
10. **Easy Integration**: Works seamlessly with your existing PostgreSQL + Drizzle setup

## Monetization Integration Strategy

### Tier Structure

- **Free Tier**: 100 API calls/day (all OAuth users start here)
- **Pro Tier**: 1,000 calls/day + priority support ($9.99/month)
- **Enterprise**: Unlimited + bulk endpoints + analytics ($49.99/month)

### Implementation Flow

1. **User Registration**: OAuth login → User created in database with 'free' tier
2. **API Usage Tracking**: Each API call increments usage counter
3. **Limit Enforcement**: Block API calls when limit exceeded
4. **Upgrade Flow**: Stripe integration for subscription management
5. **Usage Analytics**: Track popular endpoints for business insights

### Revenue Projections

- **Month 1-3**: Focus on user acquisition with generous free tier
- **Month 4-6**: Introduce usage analytics and upgrade prompts
- **Month 7+**: Target 5-10% conversion rate from free to paid

**Estimated Monthly Revenue** (conservative):

- 1,000 free users → 50 Pro conversions ($499.50/month)
- 50 Pro users → 5 Enterprise upgrades ($249.95/month)
- **Total**: ~$750/month with modest adoption

### Next Phase: API Key Management

Once authentication is implemented, users can:

1. Generate multiple API keys for different projects
2. Monitor usage per API key
3. Set custom rate limits per key (paid feature)
4. Receive usage alerts and billing notifications

### Integration with Existing API

The visa and countries endpoints will be updated to:

1. Require authentication (session or API key)
2. Track usage per user/key
3. Enforce rate limits based on subscription tier
4. Log analytics for business intelligence

This approach transforms your passport-visa API into a sustainable SaaS business with minimal complexity.
