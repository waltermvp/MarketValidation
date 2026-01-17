# Mock Data Setup (Issue #27)

Create TypeScript types and mock data for the stats-based safety dashboard.

## Data Model: Stats-Based Architecture

**Strategy:** Generic stats that can apply to multiple zip codes. Admins manage stat definitions and bulk-update values across zip codes.

## Types File: `src/data/types/safety.ts`

### StatDefinition (What kind of stat)

```typescript
type StatCategory = 'water' | 'air' | 'health' | 'disasters';
type StatValueType = 'string' | 'number' | 'percentage' | 'status';

type StatDefinition = {
  id: string;
  title: string;
  image?: string;
  description?: string;
  valueType: StatValueType;
  category: StatCategory;
  triggersNotification: boolean;
  sortOrder: number;
};
```

### ZipCodeStat (Stat value for a zip code)

```typescript
type StatStatus = 'danger' | 'warning' | 'safe';

type ZipCodeStat = {
  statId: string;
  value: string | number;
  status: StatStatus;
  updatedAt: string; // ISO date
};
```

### ZipCodeData (Complete zip code with stats)

```typescript
type ZipCodeData = {
  zipCode: string;
  city: string;
  state: string;
  country: string;
  stats: ZipCodeStat[];
  hasActiveAlerts: boolean;
};
```

### HazardReport (User-submitted)

```typescript
type HazardCategory = {
  id: string;
  name: string;
  description?: string;
};

type HazardReportStatus = 'pending' | 'reviewing' | 'confirmed' | 'resolved';

type HazardReport = {
  id: string;
  categoryId: string;
  description: string;
  location: string;
  coordinates?: { lat: number; lng: number };
  reportedAt: string;
  status: HazardReportStatus;
  reporterId?: string;
};
```

### ProductRecommendation

```typescript
type ProductRecommendation = {
  id: string;
  name: string;
  brand: string;
  tagline: string;
  description: string;
  features: string[];
  imageUrl: string;
  affiliateUrl: string;
  relevantCategories: StatCategory[]; // Links to stat categories
};
```

---

## Mock Data Files: `src/data/mock/`

### `mock-stat-definitions.ts`

Stat definitions for the 4 categories:

**Water Stats:**
| ID | Title | Value Type | Triggers Notification |
|----|-------|------------|----------------------|
| stat-lead-level | Lead Level | number | true |
| stat-pesticides | Pesticides | number | false |
| stat-radioactivity | Radioactivity | number | true |
| stat-water-quality | Water Quality Index | percentage | false |

**Air Stats:**
| ID | Title | Value Type | Triggers Notification |
|----|-------|------------|----------------------|
| stat-radon | Radon Level | number | true |
| stat-aqi | Air Quality Index | number | false |
| stat-industrial | Industrial Pollution | status | false |

**Health Stats:**
| ID | Title | Value Type | Triggers Notification |
|----|-------|------------|----------------------|
| stat-outbreaks | Active Outbreaks | string | true |
| stat-disease-risk | Disease Risk | status | false |

**Disaster Stats:**
| ID | Title | Value Type | Triggers Notification |
|----|-------|------------|----------------------|
| stat-wildfire | Wildfire Risk | status | true |
| stat-flood | Flood Risk | status | false |
| stat-earthquake | Earthquake Risk | status | false |

Helper functions:

```typescript
export const getAllStatDefinitions = (): StatDefinition[]
export const getStatDefinition = (statId: string): StatDefinition | null
export const getStatDefinitionsByCategory = (category: StatCategory): StatDefinition[]
```

### `mock-zip-codes.ts`

5 zip codes with stats:

| Zip Code | City          | State   | Country | Alert Status           |
| -------- | ------------- | ------- | ------- | ---------------------- |
| J3R 5B9  | Sorel-Tracy   | Quebec  | Canada  | hasActiveAlerts: true  |
| 10001    | New York      | NY      | USA     | hasActiveAlerts: false |
| 90210    | Beverly Hills | CA      | USA     | hasActiveAlerts: false |
| M5V 3L9  | Toronto       | Ontario | Canada  | hasActiveAlerts: true  |
| H3B 1X8  | Montreal      | Quebec  | Canada  | hasActiveAlerts: false |

Each zip code has stats with varying statuses:

- Sorel-Tracy: Lead (danger), Radon (danger), Outbreaks (warning)
- New York: AQI (warning), Industrial (warning)
- Beverly Hills: All safe
- Toronto: Wildfire (danger), AQI (warning)
- Montreal: Water Quality (warning), Flood (warning)

Helper functions:

```typescript
export const getZipCodeData = (zipCode: string): ZipCodeData | null
export const getStatsByCategory = (zipCode: string): Record<StatCategory, ZipCodeStat[]>
export const getAllZipCodes = (): ZipCodeData[]
```

### `mock-hazard-categories.ts`

8 categories for the report form:

1. Water Contamination
2. Air Pollution
3. Disease Outbreak
4. Chemical Spill
5. Illegal Waste Dumping
6. Food Safety
7. Noise Pollution
8. Other

Helper function:

```typescript
export const getHazardCategoryById = (id: string): HazardCategory | null
export const getAllHazardCategories = (): HazardCategory[]
```

### `mock-recommendations.ts`

2+ product recommendations:

**Epic Water Filters**

- Brand: Epic Water Filters
- Tagline: "Remove 99.99% of contaminants"
- Relevant Categories: ['water']
- Affiliate URL: https://example.com/epic-water

**Air Purifier Pro**

- Brand: CleanAir
- Tagline: "Hospital-grade air purification"
- Relevant Categories: ['air']
- Affiliate URL: https://example.com/air-purifier

Helper functions:

```typescript
export const getRecommendationsByCategory = (category: StatCategory): ProductRecommendation[]
export const getAllRecommendations = (): ProductRecommendation[]
```

### `index.ts`

Barrel export for all mock data:

```typescript
// Types
export * from './mock-stat-definitions';
export * from './mock-zip-codes';
export * from './mock-hazard-categories';
export * from './mock-recommendations';
```

---

## Acceptance Criteria

- [ ] Create `src/data/types/safety.ts` with stats-based types:
  - [ ] StatDefinition, StatCategory, StatValueType
  - [ ] ZipCodeStat, StatStatus
  - [ ] ZipCodeData
  - [ ] HazardCategory, HazardReport, HazardReportStatus
  - [ ] ProductRecommendation
- [ ] Create `src/data/mock/mock-stat-definitions.ts` with 11+ stat definitions
- [ ] Create `src/data/mock/mock-zip-codes.ts` with 5+ zip codes and their stats
- [ ] Create `src/data/mock/mock-hazard-categories.ts` with 8 categories
- [ ] Create `src/data/mock/mock-recommendations.ts` with 2+ products
- [ ] Create `src/data/mock/index.ts` barrel export
- [ ] All helper functions implemented
- [ ] All files pass `pnpm type-check`

---

## Usage Examples

### Get zip code data for dashboard

```typescript
import {
  getZipCodeData,
  getStatsByCategory,
  getAllStatDefinitions,
} from '@/data/mock';

const zipData = getZipCodeData('J3R 5B9');
if (zipData) {
  const statsByCategory = getStatsByCategory(zipData.zipCode);
  const definitions = getAllStatDefinitions();

  // Render dashboard with grouped stats
}
```

### Get recommendations for danger stats

```typescript
import { getRecommendationsByCategory } from '@/data/mock';

// If water stats show danger, get water recommendations
const waterRecs = getRecommendationsByCategory('water');
```
