# CLAUDE.md - MapYourHealth Landing Page

This file provides Claude Code with project context and rules for development.

## Project Overview

MapYourHealth marketing landing page and newsletter signup, built with Expo (React Native for Web). This is the **current production site** at `mapyourhealth.info`. It collects newsletter signups with email confirmation via AWS SES, supports EN/FR/AR localization, and links to the main web app at `app.mapyourhealth.info`.

> **Note:** This repo is being migrated to the monorepo at `apps/web` (Next.js). This Expo version remains the live site until that migration is complete.

## Tech Stack

- **Framework**: React Native + Expo SDK 52 (web target)
- **Language**: TypeScript (strict mode)
- **Styling**: NativeWind v4 (Tailwind for RN)
- **State**: Zustand
- **Forms**: react-hook-form + zod
- **Navigation**: Expo Router (file-based)
- **Backend**: AWS Amplify Gen2 (Cognito auth, AppSync GraphQL, DynamoDB, SES)
- **i18n**: i18next (EN, FR, AR)
- **Package Manager**: pnpm

## Build & Validation Commands

```bash
pnpm type-check    # TypeScript validation (MUST pass)
pnpm lint          # ESLint check (amplify/ errors are pre-existing, ignore)
pnpm test:ci       # Jest tests with coverage (MUST pass)
pnpm check-all     # Lint + type-check + translations + tests (full gate)
```

**Quality gate before ANY commit:**

```bash
pnpm type-check && pnpm test:ci
```

## Development

```bash
pnpm start         # Start Expo dev server
pnpm web           # Start web-only dev server
pnpm amp-sand      # Start Amplify sandbox (local backend)
```

## Conditions (MUST follow)

### Code Quality

1. NEVER commit code that fails `pnpm type-check` or `pnpm test:ci`
2. NEVER introduce new lint errors in `src/` directory
3. Pre-existing lint errors in `amplify/` directory can be ignored

### Code Conventions

4. Use `className` prop for ALL styling (NativeWind)
5. Use `@/` import alias for all src imports
6. Use `import type { X }` for type-only imports
7. Export new components from barrel files (`index.tsx`)
8. File names: kebab-case (e.g., `newsletter.tsx`)
9. Component names: PascalCase (e.g., `Newsletter`)

### Git

10. Use conventional commits: `feat:`, `fix:`, `chore:`, `test:`, etc.
11. Keep commit message body lines under 100 characters
12. Create PRs against `main`

### Testing

13. Add `testID` props to components that need testing
14. Follow test patterns in `src/components/login-form.test.tsx`

## File Structure

```
src/
  app/                      # Expo Router pages
    index.tsx                # Home / Landing page
    login.tsx                # Login page
    confirm/                 # Newsletter confirmation route
    admin.tsx                # Admin page
  components/
    newsletter.tsx           # Newsletter signup form
    menu-bar.tsx             # Top nav with language selector
    card-component.tsx       # Benefits cards section
    faq.tsx                  # FAQ accordion
    language-selector.tsx    # EN/FR toggle
    login-form.tsx           # Auth login form
    ui/                      # Base UI primitives (Text, Input, Button, etc.)
      icons/                 # SVG icon components
    settings/                # Settings screen components
  translations/
    en.json                  # English translations
    fr.json                  # French translations
    ar.json                  # Arabic translations
  lib/
    auth/                    # Authentication utilities
    hooks/                   # Custom React hooks
    i18n/                    # i18next configuration
    index.tsx                # Barrel exports (translate, useSelectedLanguage, etc.)
  types/                     # TypeScript type definitions
  api/                       # API layer
amplify/
  auth/                      # Cognito auth config
  data/                      # AppSync schema (NewsletterSubscriber model)
  functions/
    signUp-newsletter/       # Lambda: create subscriber + send SES confirmation email
    confirm-newsletter/      # Lambda: confirm subscriber via code
  storage/                   # S3 storage config
assets/
  hero-background/           # Responsive hero images for multiple viewports
  countries.json             # Country list for signup form dropdown
specs/                       # Feature specifications
```

## Key Features

### Newsletter Signup Flow

1. User fills form on landing page (email, country, zip code)
2. `signUpNewsletter` mutation creates `NewsletterSubscriber` record in DynamoDB
3. AWS SES sends localized confirmation email (EN/FR) with confirmation link
4. User clicks link → `/confirm/[code]` page calls `confirmNewsletter` mutation
5. Subscriber marked as `confirmed: true`

### Localization

- Three languages: English, French, Arabic
- Language toggle in navbar (EN/FR buttons)
- All UI text uses i18next translation keys via `translate()` or `useTranslation()`
- Newsletter confirmation emails are localized based on user's selected language

### Landing Page Sections

- **Hero**: Responsive background image with title + CTA
- **Newsletter Form**: Email, country dropdown, zip code → Sign Up
- **Web Beta Link**: "Already know about health risks?" → links to app.mapyourhealth.info
- **Benefits Cards**: 4 feature highlight cards with icons
- **FAQ**: Expandable accordion with 6 Q&A pairs
- **Footer**: Copyright + background image

## Environment & Deployment

- **Live URL**: https://mapyourhealth.info
- **Web App**: https://app.mapyourhealth.info
- **Amplify Region**: ca-central-1
- `amplify_outputs.json` is auto-generated as a stub on `postinstall` for type-checking; real config is generated by Amplify sandbox or deployment

## Notes

- This is a React Native app targeting **web only** for the landing page
- No DOM APIs available — use React Native primitives
- Use `expo-image` for images, `expo-router` for navigation
- The `amplify/` directory contains real backend Lambda functions, not just stubs
