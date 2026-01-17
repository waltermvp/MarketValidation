# User Authentication & Signup (NEW)

## Overview

Users sign up with their email to receive safety updates for zip codes they follow.

## Authentication Flow

### 1. Signup Screen

**Path:** `src/app/signup.tsx`

**Fields:**

- Email (required, validated)
- Password (required, min 8 chars)
- Confirm password
- Terms acceptance checkbox

**Flow:**

1. User enters email + password
2. Submit → Amplify Auth `signUp()`
3. Confirmation code sent to email
4. Redirect to confirmation screen

### 2. Email Confirmation Screen

**Path:** `src/app/confirm/[code].tsx` (already exists - enhance)

**Flow:**

1. User enters code from email (or deep link)
2. Submit → Amplify Auth `confirmSignUp()`
3. On success → redirect to onboarding (zip code selection)

### 3. Login Screen

**Path:** `src/app/login.tsx` (already exists - enhance)

**Fields:**

- Email
- Password
- "Forgot password?" link
- "Sign up" link

### 4. Forgot Password Flow

**Path:** `src/app/forgot-password.tsx`

**Flow:**

1. Enter email → `resetPassword()`
2. Enter code + new password → `confirmResetPassword()`

## Data Model Updates

### User Model (Amplify)

```typescript
type User = {
  id: string; // Cognito user ID
  email: string; // Email address
  name?: string; // Display name
  subscribedZipCodes: string[]; // Zip codes user follows
  pushToken?: string; // Expo push token
  notificationPreferences: {
    warnings: boolean; // Receive warning notifications
    updates: boolean; // Receive general updates
    frequency: 'immediate' | 'daily' | 'weekly';
  };
  createdAt: string;
  updatedAt: string;
};
```

## Components

### 1. AuthForm (`src/components/auth/auth-form.tsx`)

Reusable form component for signup/login.

**Props:**

- `mode`: 'signup' | 'login'
- `onSubmit`: (data) => Promise<void>
- `isLoading`: boolean

### 2. PasswordInput (`src/components/auth/password-input.tsx`)

Password input with show/hide toggle.

### 3. AuthGuard (`src/components/auth/auth-guard.tsx`)

HOC/wrapper that redirects unauthenticated users to login.

## Amplify Auth Configuration

Update `amplify/auth/resource.ts`:

```typescript
export const auth = defineAuth({
  loginWith: {
    email: true,
  },
  userAttributes: {
    preferredUsername: { required: false },
  },
});
```

## Acceptance Criteria

### Signup

- [ ] Create signup screen with email/password form
- [ ] Validate email format
- [ ] Validate password requirements (min 8 chars)
- [ ] Handle Amplify Auth signUp
- [ ] Navigate to confirmation on success
- [ ] Show error messages for failures

### Confirmation

- [ ] Enhance existing confirm screen for auth flow
- [ ] Handle code verification
- [ ] Auto-confirm via deep link if possible
- [ ] Redirect to onboarding on success

### Login

- [ ] Enhance existing login screen
- [ ] Handle Amplify Auth signIn
- [ ] Store auth state in Zustand
- [ ] Navigate to dashboard on success

### Forgot Password

- [ ] Create forgot password screen
- [ ] Handle reset password flow
- [ ] Show success/error feedback

### Auth Guard

- [ ] Create AuthGuard component
- [ ] Protect dashboard and other authenticated routes
- [ ] Redirect to login if not authenticated
