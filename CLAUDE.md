# CLAUDE.md - MarketValidation Safety Dashboard

This file provides Claude Code with project context and rules for autonomous development.

## Project Overview

React Native mobile app for environmental safety monitoring. Users can view safety data for their location, see warnings, explore contaminant details, and submit hazard reports.

## Tech Stack

- **Framework**: React Native + Expo SDK 52
- **Language**: TypeScript (strict mode)
- **Styling**: NativeWind v4 (Tailwind for RN)
- **State**: Zustand
- **Forms**: react-hook-form + zod
- **Navigation**: Expo Router (file-based)
- **Package Manager**: pnpm

## Build & Validation Commands

```bash
pnpm type-check    # TypeScript validation (MUST pass)
pnpm lint          # ESLint check (amplify/ errors are pre-existing, ignore)
pnpm test:ci       # Jest tests (MUST pass)
```

**Quality gate before ANY commit:**

```bash
pnpm type-check && pnpm test:ci
```

## Conditions (MUST follow)

### Code Quality

1. NEVER commit code that fails `pnpm type-check` or `pnpm test:ci`
2. NEVER introduce new lint errors in `src/` directory
3. Pre-existing lint errors in `amplify/` directory can be ignored

### Task Execution

4. ONE task per iteration - small, atomic changes only
5. Read the relevant spec file in `specs/` before implementing
6. Follow existing patterns - check similar files for reference
7. Update `prd.json` after completing each task (set `passes: true`)
8. Append learnings to `progress.txt` after each task

### Code Conventions

9. Use `className` prop for ALL styling (NativeWind)
10. Use `@/` import alias for all src imports
11. Use `import type { X }` for type-only imports
12. Export new components from barrel files (`index.tsx`)
13. File names: kebab-case (e.g., `safety-category-card.tsx`)
14. Component names: PascalCase (e.g., `SafetyCategoryCard`)

### Git Commits

15. Use conventional commits: `feat:`, `fix:`, `chore:`, etc.
16. Keep commit message body lines under 100 characters
17. NEVER commit to `main` or `master` branch - use `staging` only

### Testing

18. Add `testID` props to components that need testing
19. Follow test patterns in `src/components/ui/*.test.tsx`

## File Structure

```
src/
  app/                    # Expo Router pages
  components/
    ui/                   # Base UI primitives
      icons/              # SVG icon components
    dashboard/            # Dashboard feature components
    contaminants/         # Contaminant detail components
    report/               # Hazard report components
    recommendations/      # Product recommendation components
  data/
    types/safety.ts       # TypeScript interfaces
    mock/                 # Mock data files
  lib/                    # Utilities, hooks, auth
specs/                    # Feature specifications (READ THESE)
```

## Current Feature: Safety Dashboard (Issue #27)

Working through `prd.json` user stories to build:

1. Mock data layer (types + data files)
2. Icon components
3. Base UI components (StatusIndicator, ExpandableCard)
4. Dashboard components (LocationHeader, WarningBanner, SafetyCategoryCard)
5. Detail views (ContaminantsDetailView)
6. Report form (HazardReportForm)
7. Product recommendations
8. Pages that assemble components

## Data Model: Stats-Based Architecture

**Key Innovation:** Generic stats model instead of hardcoded safety types.

### Why Stats?

- Admins can add new stats without code changes
- Bulk update stat values across thousands of zip codes at once
- Choose which stats trigger push notifications
- Flexible value types (number, string, percentage, status)

### Core Types

```typescript
// What kind of stat (admin-defined template)
type StatDefinition = {
  id: string;
  title: string;
  category: 'water' | 'air' | 'health' | 'disasters';
  valueType: 'string' | 'number' | 'percentage' | 'status';
  triggersNotification: boolean;
  sortOrder: number;
};

// A stat's value for a specific zip code
type ZipCodeStat = {
  statId: string;
  value: string | number;
  status: 'danger' | 'warning' | 'safe';
  updatedAt: string;
};

// Complete zip code with all its stats
type ZipCodeData = {
  zipCode: string;
  city: string;
  state: string;
  country: string;
  stats: ZipCodeStat[];
  hasActiveAlerts: boolean;
};
```

### How It Works

1. **Admin creates StatDefinition** (e.g., "Lead Level" for water category)
2. **Admin bulk-updates ZipCodeStats** (e.g., set Lead Level to "danger" for 50 zip codes)
3. **App fetches ZipCodeData** for user's subscribed zip codes
4. **Stats with `triggersNotification: true`** send push alerts when status changes

See `specs/mock-data.md` for full type definitions and mock data structure.

## Completion Signal

When ALL user stories in `prd.json` have `"passes": true`, output on its own line:

```
RALPH_COMPLETE
```

## Key Patterns

### Component Template

```tsx
import { View, Text } from '@/components/ui';

type Props = {
  title: string;
  onPress?: () => void;
};

export const MyComponent = ({ title, onPress }: Props) => (
  <View className="flex-1 p-4">
    <Text className="text-lg font-netflix-medium">{title}</Text>
  </View>
);
```

### Mock Data Pattern

```tsx
import type { MyType } from '@/data/types/safety';

export const mockItems: MyType[] = [
  /* data */
];

export const getItemById = (id: string): MyType | null => {
  return mockItems.find((item) => item.id === id) ?? null;
};
```

### Icon Component Pattern

Follow the pattern from settings.tsx:

- Accept `color` prop with default '#000'
- Accept standard SvgProps via spread
- Use 24x24 viewBox default
- Use existing CaretDown for expand/collapse functionality

## Notes

- `amplify_outputs.json` is a stub file for type-checking (real file generated by Amplify)
- React Native app - no DOM APIs available
- Use `expo-image` for images, `expo-router` for navigation
