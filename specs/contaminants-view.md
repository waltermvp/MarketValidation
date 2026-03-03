# Contaminants Detail View (Issue #25)

Detailed view showing specific contaminants found in water/air with expandable categories.

## Overview

When a user taps on a safety category (e.g., Tap Water), they see a detailed breakdown of all contaminants detected.

---

## Components

### 1. ExpandableCard (Base UI Component)

**Path:** `src/components/ui/expandable-card.tsx`

**Purpose:** Reusable expandable/collapsible card component.

**Props:**

```typescript
type ExpandableCardProps = {
  header: React.ReactNode;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  onToggle?: (expanded: boolean) => void;
  testID?: string;
};
```

**UI Elements:**

- Header section (always visible)
- Chevron icon that rotates on expand/collapse
- Content section that animates in/out

**Animation:**

- Use react-native-reanimated for smooth height animation
- Chevron rotates 180° when expanded

**Must export from:** `src/components/ui/index.tsx`

---

### 2. ContaminantItem

**Path:** `src/components/contaminants/contaminant-item.tsx`

**Purpose:** Display a single contaminant with its status.

**Props:**

```typescript
type ContaminantItemProps = {
  contaminant: Contaminant;
  onSourcePress?: () => void;
};
```

**UI Elements:**

- Contaminant name
- Status text in parentheses:
  - "(Not Controlled)" for not_controlled
  - "(14 μg/l above WHO limit)" for above_limit with values
  - "(Safe)" for safe
- External link icon if sourceUrl exists

**Styling:**

```tsx
<View className="flex-row items-center py-2 pl-4">
  <Text className="flex-1">
    {contaminant.name}
    <Text className="text-gray-500">({statusText})</Text>
  </Text>
  {contaminant.sourceUrl && (
    <TouchableOpacity onPress={onSourcePress}>
      <LinkIcon className="text-blue-500" />
    </TouchableOpacity>
  )}
</View>
```

---

### 3. ContaminantCategorySection

**Path:** `src/components/contaminants/contaminant-category-section.tsx`

**Purpose:** Expandable section for a category of contaminants.

**Props:**

```typescript
type ContaminantCategorySectionProps = {
  category: ContaminantCategory;
  defaultExpanded?: boolean;
};
```

**UI Elements:**

- Uses ExpandableCard as base
- Header shows:
  - Category icon (radiation, spray, etc.)
  - Description text (e.g., "12 radioactive contaminants above global limits")
- Expanded content: list of ContaminantItem

**Header example:**

```tsx
<View className="flex-row items-center">
  <CategoryIcon className="mr-3" />
  <Text>
    {category.contaminants.length} {category.name} above the global limit or not
    regulated
  </Text>
</View>
```

---

### 4. ContaminantsDetailView

**Path:** `src/components/contaminants/contaminants-detail-view.tsx`

**Purpose:** Full view showing all contaminant categories.

**Props:**

```typescript
type ContaminantsDetailViewProps = {
  categoryName: string;
  contaminantCategories: ContaminantCategory[];
  onBack?: () => void;
};
```

**UI Elements:**

- Header with back button and category name
- ScrollView containing:
  - List of ContaminantCategorySection
  - RecommendationsSection at bottom (optional)

---

## Page

### Safety Detail Page (Dynamic Route)

**Path:** `src/app/safety/[category].tsx`

**Purpose:** Dynamic route for viewing contaminants by safety category.

**Route params:**

- `category`: The category ID (e.g., "tap-water", "air-quality")

**Implementation:**

```tsx
import { useLocalSearchParams } from 'expo-router';

export default function SafetyDetailPage() {
  const { category } = useLocalSearchParams<{ category: string }>();

  // Load contaminant data for this category
  const data = getContaminantsForCategory(category);

  return <ContaminantsDetailView {...data} />;
}
```

---

## Acceptance Criteria

- [ ] Create `src/components/ui/expandable-card.tsx`

  - [ ] Animated expand/collapse
  - [ ] Rotating chevron icon
  - [ ] Accepts header and children
  - [ ] Has testID prop
  - [ ] Exported from ui/index.tsx

- [ ] Create `src/components/contaminants/contaminant-item.tsx`

  - [ ] Shows contaminant name
  - [ ] Shows status text in parentheses
  - [ ] Shows link icon if sourceUrl exists
  - [ ] Handles onSourcePress

- [ ] Create `src/components/contaminants/contaminant-category-section.tsx`

  - [ ] Uses ExpandableCard
  - [ ] Shows category icon and description
  - [ ] Lists ContaminantItems when expanded

- [ ] Create `src/components/contaminants/contaminants-detail-view.tsx`

  - [ ] Has header with back navigation
  - [ ] Renders list of ContaminantCategorySection
  - [ ] Scrollable content

- [ ] Create `src/app/safety/[category].tsx`
  - [ ] Dynamic route with category param
  - [ ] Loads appropriate data
  - [ ] Renders ContaminantsDetailView

---

## Design Reference

From mockup:

- Clean list layout
- Expandable sections with smooth animation
- Link icons for external sources
- Back navigation at top
