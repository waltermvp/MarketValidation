# Zip Code Subscriptions (NEW)

## Overview

Users can subscribe to specific zip codes to receive safety updates and push notifications when new warnings or reports are published for those areas.

## User Flow

### 1. Onboarding (First-time user)

After signup/confirmation, users are guided to select zip codes:

**Path:** `src/app/onboarding/zip-codes.tsx`

**UI:**

- Headline: "Which areas do you want to monitor?"
- Search input for zip codes
- Option to use current location
- List of selected zip codes with remove buttons
- "Continue" button (requires at least 1 zip code)

### 2. Managing Subscriptions (Existing user)

**Path:** `src/app/settings/subscriptions.tsx`

**UI:**

- List of currently subscribed zip codes
- Each shows: zip code, city name, status indicator (safe/warning/danger)
- Swipe to remove
- "Add zip code" button at bottom
- Maximum 10 zip codes per user

### 3. Add Zip Code Modal/Screen

**Path:** `src/components/subscriptions/add-zip-code-modal.tsx`

**UI:**

- Search input with autocomplete
- Recent/popular zip codes suggestions
- "Use my location" button
- Results list showing: zip code, city, state

## Data Model

### Subscription (stored on User)

```typescript
type ZipCodeSubscription = {
  zipCode: string;
  city: string;
  state: string;
  country: string;
  subscribedAt: string; // ISO date
  notificationsEnabled: boolean;
};

// On User model
type User = {
  // ... other fields
  subscriptions: ZipCodeSubscription[];
};
```

### Zip Code Data (for lookup/autocomplete)

```typescript
type ZipCodeInfo = {
  zipCode: string;
  city: string;
  state: string;
  country: string;
  latitude: number;
  longitude: number;
};
```

## API/Backend

### GraphQL Mutations

```graphql
mutation AddSubscription($zipCode: String!) {
  addZipCodeSubscription(zipCode: $zipCode) {
    success
    subscription {
      zipCode
      city
      state
    }
  }
}

mutation RemoveSubscription($zipCode: String!) {
  removeZipCodeSubscription(zipCode: $zipCode) {
    success
  }
}
```

### Zip Code Lookup (External API or cached data)

Options:

1. Use free zip code API (Zippopotam.us, etc.)
2. Cache zip code data in DynamoDB
3. Use Google Places API

## Components

### 1. ZipCodeSearch (`src/components/subscriptions/zip-code-search.tsx`)

Search input with autocomplete for zip codes.

**Props:**

- `onSelect`: (zipCode: ZipCodeInfo) => void
- `placeholder`: string
- `excludeZipCodes`: string[] (already subscribed)

### 2. SubscriptionCard (`src/components/subscriptions/subscription-card.tsx`)

Card showing a subscribed zip code.

**Props:**

- `subscription`: ZipCodeSubscription
- `onRemove`: () => void
- `status`: SafetyStatus (from location data)

### 3. SubscriptionsList (`src/components/subscriptions/subscriptions-list.tsx`)

List of all subscribed zip codes.

**Props:**

- `subscriptions`: ZipCodeSubscription[]
- `onRemove`: (zipCode: string) => void
- `onAdd`: () => void

### 4. OnboardingZipCodes (`src/components/onboarding/onboarding-zip-codes.tsx`)

Onboarding screen for selecting initial zip codes.

## Acceptance Criteria

### Onboarding

- [ ] Create onboarding zip codes screen
- [ ] Search/autocomplete for zip codes
- [ ] "Use my location" button (requests location permission)
- [ ] Show selected zip codes as chips/cards
- [ ] Remove selected zip codes
- [ ] Require at least 1 zip code to continue
- [ ] Save subscriptions to user profile
- [ ] Navigate to dashboard on complete

### Subscription Management

- [ ] Create settings/subscriptions screen
- [ ] List all subscribed zip codes
- [ ] Show status indicator per zip code
- [ ] Swipe/button to remove subscription
- [ ] "Add zip code" button
- [ ] Maximum 10 subscriptions limit
- [ ] Confirm before removing

### Zip Code Search

- [ ] Create reusable search component
- [ ] Autocomplete as user types
- [ ] Show city, state with zip code
- [ ] Filter out already subscribed
- [ ] Handle no results state

### Backend

- [ ] Add subscriptions field to User model
- [ ] Create addZipCodeSubscription mutation
- [ ] Create removeZipCodeSubscription mutation
- [ ] Implement zip code lookup/validation
