# Location Dashboard (Issue #21)

"My Location - expose hidden risks everywhere"

## Overview

The main dashboard view showing the user's current location and safety overview.

---

## Components

### 1. LocationHeader

**Path:** `src/components/dashboard/location-header.tsx`

**Purpose:** Display the current location with postal code and city name.

**Props:**

```typescript
type LocationHeaderProps = {
  location: Location;
};
```

**UI Elements:**

- "My Location" title in green (primary color)
- Postal code displayed prominently (large text)
- City name below postal code (smaller, muted text)

**Styling:**

```
className="bg-white dark:bg-neutral-900 rounded-xl p-4"
```

### 2. SearchBar

**Path:** `src/components/dashboard/search-bar.tsx`

**Purpose:** Allow users to search for any location.

**Props:**

```typescript
type SearchBarProps = {
  placeholder?: string;
  onSearch: (query: string) => void;
  onSettingsPress?: () => void;
};
```

**UI Elements:**

- Search icon on the left
- Text input with placeholder: "Search for a state, city or street"
- Settings gear icon button on the right

**Behavior:**

- Input is controlled
- Calls onSearch when text changes (with debounce ideally)
- Settings button navigates to settings screen

---

## Page

### Dashboard Page

**Path:** `src/app/dashboard.tsx`

**Purpose:** Main dashboard that assembles all components.

**Structure:**

```tsx
<ScrollView>
  <SearchBar />
  <LocationHeader location={currentLocation} />
  <WarningBanner warning={activeWarning} />
  <SafetyCategoriesList categories={safetyCategories} />
  <RecommendationsSection categories={detectedCategories} />
</ScrollView>
```

**Data:**

- Uses mock data for initial implementation
- Location from mock-locations
- Warning from mock-warnings (optional)
- Categories from mock-safety-categories

---

## Acceptance Criteria

- [ ] Create `src/components/dashboard/location-header.tsx`

  - [ ] Displays "My Location" title
  - [ ] Shows postal code prominently
  - [ ] Shows city name
  - [ ] Accepts Location type as prop
  - [ ] Uses NativeWind styling

- [ ] Create `src/components/dashboard/search-bar.tsx`

  - [ ] Has search icon
  - [ ] Has text input with placeholder
  - [ ] Has settings gear button
  - [ ] Calls onSearch callback
  - [ ] Calls onSettingsPress callback

- [ ] Create `src/app/dashboard.tsx`
  - [ ] Renders SearchBar
  - [ ] Renders LocationHeader
  - [ ] Renders WarningBanner (conditionally)
  - [ ] Renders SafetyCategoriesList
  - [ ] Uses ScrollView for content
  - [ ] Loads mock data

---

## Design Reference

From mockup:

- Green gradient header background
- White card for location display
- Search bar at very top
- Clean, minimal design
