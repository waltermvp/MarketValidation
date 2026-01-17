# Implementation Plan - Safety Dashboard (Stats-Based)

## Progress Summary

- Total stories: 25
- Completed: 0
- Remaining: 25

## Execution Order

Ralph executes stories by priority, respecting `dependsOn` relationships.

### Phase 1: Mock Data (Priority 1) - Issue #27

| Story  | Title                          | Dependencies                   |
| ------ | ------------------------------ | ------------------------------ |
| US-001 | Create stats TypeScript types  | -                              |
| US-002 | Create mock stat definitions   | US-001                         |
| US-003 | Create mock zip code data      | US-002                         |
| US-004 | Create mock hazard categories  | US-001                         |
| US-005 | Create mock recommendations    | US-001                         |
| US-006 | Create mock data barrel export | US-002, US-003, US-004, US-005 |

### Phase 2: Icons (Priority 2) - Issue #23

| Story  | Title                            | Dependencies |
| ------ | -------------------------------- | ------------ |
| US-007 | Create safety category icons     | -            |
| US-008 | Create utility icons             | -            |
| US-009 | Create StatusIndicator component | -            |

### Phase 3: Components (Priority 3)

| Story  | Title                            | Issue | Dependencies   |
| ------ | -------------------------------- | ----- | -------------- |
| US-010 | Create StatCategoryCard          | #23   | US-007, US-009 |
| US-011 | Create StatCategoriesList        | #23   | US-010         |
| US-012 | Create WarningBanner             | #22   | US-008         |
| US-013 | Create LocationHeader            | #21   | -              |
| US-014 | Create SearchBar                 | #21   | US-008         |
| US-016 | Create ExpandableCard            | #25   | -              |
| US-017 | Create StatItem                  | #25   | US-008         |
| US-018 | Create StatCategorySection       | #25   | US-016, US-017 |
| US-019 | Create StatsDetailView           | #25   | US-008, US-017 |
| US-021 | Create HazardReportForm          | #24   | -              |
| US-022 | Create SubmitReportScreen        | #24   | US-021         |
| US-024 | Create ProductRecommendationCard | #26   | US-008         |
| US-025 | Create RecommendationsSection    | #26   | US-024         |

### Phase 4: Pages (Priority 4)

| Story  | Title                       | Issue | Dependencies                                   |
| ------ | --------------------------- | ----- | ---------------------------------------------- |
| US-015 | Create Dashboard page       | #21   | US-006, US-011, US-012, US-013, US-014, US-025 |
| US-020 | Create Category Detail page | #25   | US-019                                         |
| US-023 | Create Report page          | #24   | US-022                                         |

---

## Issue → Stories Mapping

| Issue | Feature            | Stories                |
| ----- | ------------------ | ---------------------- |
| #27   | Mock Data          | US-001 → US-006        |
| #23   | Safety Categories  | US-007 → US-011        |
| #22   | Warning Banner     | US-012                 |
| #21   | Location Dashboard | US-013, US-014, US-015 |
| #25   | Stats Detail View  | US-016 → US-020        |
| #24   | Submit Report      | US-021 → US-023        |
| #26   | Recommendations    | US-024, US-025         |

---

## Key Files to Create

### Types

- `src/data/types/safety.ts`

### Mock Data

- `src/data/mock/mock-stat-definitions.ts`
- `src/data/mock/mock-zip-codes.ts`
- `src/data/mock/mock-hazard-categories.ts`
- `src/data/mock/mock-recommendations.ts`
- `src/data/mock/index.ts`

### Icons

- `src/components/ui/icons/droplet.tsx`
- `src/components/ui/icons/cloud.tsx`
- `src/components/ui/icons/virus.tsx`
- `src/components/ui/icons/flame.tsx`
- `src/components/ui/icons/alert-triangle.tsx`
- `src/components/ui/icons/heart.tsx`
- `src/components/ui/icons/search.tsx`
- `src/components/ui/icons/external-link.tsx`
- `src/components/ui/icons/chevron-left.tsx`

### UI Components

- `src/components/ui/status-indicator.tsx`
- `src/components/ui/expandable-card.tsx`

### Dashboard Components

- `src/components/dashboard/location-header.tsx`
- `src/components/dashboard/search-bar.tsx`
- `src/components/dashboard/warning-banner.tsx`
- `src/components/dashboard/stat-category-card.tsx`
- `src/components/dashboard/stat-categories-list.tsx`

### Stats Components

- `src/components/stats/stat-item.tsx`
- `src/components/stats/stat-category-section.tsx`
- `src/components/stats/stats-detail-view.tsx`

### Report Components

- `src/components/report/hazard-report-form.tsx`
- `src/components/report/submit-report-screen.tsx`

### Recommendations Components

- `src/components/recommendations/product-recommendation-card.tsx`
- `src/components/recommendations/recommendations-section.tsx`

### Pages

- `src/app/dashboard.tsx`
- `src/app/safety/[category].tsx`
- `src/app/report.tsx`

---

## Validation Commands

```bash
pnpm type-check    # TypeScript
pnpm lint          # ESLint
pnpm test:ci       # Jest
```

Quality gate before commits:

```bash
pnpm type-check && pnpm test:ci
```
