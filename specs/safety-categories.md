# Safety Categories (Issue #23)

"Holistic safety scan - monitor tap water and air quality, public services, pathogens & more"

## Overview

Display safety categories as a list with status indicators showing danger/warning/safe levels.

---

## Components

### 1. StatusIndicator (Base UI Component)

**Path:** `src/components/ui/status-indicator.tsx`

**Purpose:** Reusable status indicator showing danger/warning/safe states.

**Props:**

```typescript
type StatusIndicatorProps = {
  status: 'danger' | 'warning' | 'safe';
  variant?: 'dot' | 'badge';
  size?: 'sm' | 'md' | 'lg';
  testID?: string;
};
```

**Variants:**

- `dot`: Simple colored circle
- `badge`: Rounded pill with optional text

**Colors:**

- danger: `bg-red-500`
- warning: `bg-yellow-500`
- safe: `bg-green-500`

**Must export from:** `src/components/ui/index.tsx`

---

### 2. SafetyCategoryCard

**Path:** `src/components/dashboard/safety-category-card.tsx`

**Purpose:** Individual card for each safety category.

**Props:**

```typescript
type SafetyCategoryCardProps = {
  category: SafetyCategory;
  onPress?: () => void;
};
```

**UI Elements:**

- Left: Category icon (water droplet, cloud, virus, flame)
- Center:
  - Category name (bold)
  - Preview items as comma-separated text + "more" link
- Right: StatusIndicator dot

**Icons needed:**

- Droplet (water) - may exist or create
- Cloud (air)
- Virus/bacteria (pathogens)
- Flame (natural disasters)

**Styling:**

```tsx
<TouchableOpacity className="flex-row items-center py-4 border-b border-gray-200">
  <View className="w-10 h-10 items-center justify-center mr-3">
    <CategoryIcon />
  </View>
  <View className="flex-1">
    <Text className="font-netflix-bold text-lg">{category.name}</Text>
    <Text className="text-gray-500">
      {category.preview.join(', ')}... <Text className="underline">more</Text>
    </Text>
  </View>
  <StatusIndicator status={category.status} variant="dot" />
</TouchableOpacity>
```

---

### 3. SafetyCategoriesList

**Path:** `src/components/dashboard/safety-categories-list.tsx`

**Purpose:** Container that renders list of SafetyCategoryCard.

**Props:**

```typescript
type SafetyCategoriesListProps = {
  categories: SafetyCategory[];
  onCategoryPress?: (category: SafetyCategory) => void;
};
```

**UI Elements:**

- Section header (optional): "Safety Overview"
- List of SafetyCategoryCard components
- Handles empty state

**Implementation:**

- Use FlatList or map for rendering
- Pass onPress handler to each card

---

## Categories (from mockups)

1. **Tap Water**

   - Icon: droplet
   - Status: danger (red)
   - Preview: "Pesticides, Radioactivity..."

2. **Air Quality**

   - Icon: cloud
   - Status: danger (red)
   - Preview: "Radon, Industries..."

3. **Pathogens**

   - Icon: virus
   - Status: warning (yellow)
   - Preview: "Virus, STDs, Lyme disease..."

4. **Natural Disasters**
   - Icon: flame
   - Status: warning (yellow)
   - Preview: "Tornado, Earthquake, Wildfire..."

---

## Acceptance Criteria

- [ ] Create `src/components/ui/status-indicator.tsx`

  - [ ] Supports 'danger', 'warning', 'safe' statuses
  - [ ] Supports 'dot' and 'badge' variants
  - [ ] Uses correct colors (red, yellow, green)
  - [ ] Exported from ui/index.tsx
  - [ ] Has testID prop

- [ ] Create `src/components/dashboard/safety-category-card.tsx`

  - [ ] Shows category icon
  - [ ] Shows category name
  - [ ] Shows preview text with "more" link
  - [ ] Shows StatusIndicator
  - [ ] Handles onPress

- [ ] Create `src/components/dashboard/safety-categories-list.tsx`

  - [ ] Renders list of SafetyCategoryCard
  - [ ] Handles onCategoryPress
  - [ ] Handles empty state

- [ ] Create/verify category icons exist
  - [ ] Droplet icon
  - [ ] Cloud icon
  - [ ] Virus icon
  - [ ] Flame icon

---

## Design Reference

From mockup:

- White background cards
- Clear visual hierarchy
- Status dots aligned to right
- Consistent spacing
