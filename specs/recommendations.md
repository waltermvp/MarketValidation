# Product Recommendations (Issue #26)

"We Recommend - protect yourself with experts' recommendations"

## Overview

Display product recommendations based on detected hazards to help users protect themselves.

---

## Components

### 1. ProductRecommendationCard

**Path:** `src/components/recommendations/product-recommendation-card.tsx`

**Purpose:** Display a single product recommendation as a prominent banner.

**Props:**

```typescript
type ProductRecommendationCardProps = {
  recommendation: ProductRecommendation;
  onLearnMore?: () => void;
};
```

**UI Elements:**

- Green background (#10B981 or green-500)
- White text
- Left section:
  - Heart/checkmark icon
  - "We Recommend" header
  - Product tagline (e.g., "American-made | Certified against NSF")
- Product image (if available)
- Product description with bold highlights
- "Learn More" or affiliate button

**Layout:**

```tsx
<View className="bg-green-500 rounded-xl p-4">
  <View className="flex-row items-center mb-2">
    <HeartIcon className="text-white mr-2" />
    <Text className="text-white font-netflix-bold text-lg">We Recommend</Text>
  </View>
  <Text className="text-white/80 text-sm mb-3">{recommendation.tagline}</Text>

  <View className="flex-row">
    {recommendation.imageUrl && (
      <Image
        source={{ uri: recommendation.imageUrl }}
        className="w-20 h-20 mr-4"
      />
    )}
    <View className="flex-1">
      <Text className="text-white font-netflix-bold">
        {recommendation.name}
      </Text>
      <Text className="text-white/90">
        {formatDescription(recommendation.description)}
      </Text>
    </View>
  </View>

  <TouchableOpacity
    onPress={onLearnMore}
    className="mt-3 bg-white rounded-lg py-2 px-4 self-start"
  >
    <Text className="text-green-500 font-netflix-bold">Learn More</Text>
  </TouchableOpacity>
</View>
```

**Description formatting:**

- Bold key phrases like "remove over 200 dangerous drinking water contaminants"
- Use `<Text className="font-netflix-bold">` for emphasis

---

### 2. RecommendationsSection

**Path:** `src/components/recommendations/recommendations-section.tsx`

**Purpose:** Section that shows relevant recommendations based on detected hazards.

**Props:**

```typescript
type RecommendationsSectionProps = {
  detectedCategoryIds: string[];
  recommendations: ProductRecommendation[];
  title?: string;
};
```

**Logic:**

1. Filter recommendations where `relevantCategories` includes any of `detectedCategoryIds`
2. If no matches, don't render anything
3. Otherwise, render matching ProductRecommendationCards

**Implementation:**

```tsx
export const RecommendationsSection = ({
  detectedCategoryIds,
  recommendations,
  title = "Protect yourself with experts' recommendations",
}: RecommendationsSectionProps) => {
  const relevantRecommendations = recommendations.filter((rec) =>
    rec.relevantCategories.some((cat) => detectedCategoryIds.includes(cat))
  );

  if (relevantRecommendations.length === 0) {
    return null;
  }

  return (
    <View className="mt-6">
      {title && (
        <Text className="text-lg font-netflix-medium mb-3 text-gray-700">
          {title}
        </Text>
      )}
      {relevantRecommendations.map((rec) => (
        <ProductRecommendationCard
          key={rec.id}
          recommendation={rec}
          onLearnMore={() => Linking.openURL(rec.affiliateUrl)}
        />
      ))}
    </View>
  );
};
```

---

## Usage in Dashboard

In `src/app/dashboard.tsx`:

```tsx
import { RecommendationsSection } from '@/components/recommendations/recommendations-section';
import { mockRecommendations, mockSafetyCategories } from '@/data/mock';

// Get categories that have danger or warning status
const detectedCategoryIds = mockSafetyCategories
  .filter((cat) => cat.status === 'danger' || cat.status === 'warning')
  .map((cat) => cat.id);

<RecommendationsSection
  detectedCategoryIds={detectedCategoryIds}
  recommendations={mockRecommendations}
/>;
```

---

## Acceptance Criteria

- [ ] Create `src/components/recommendations/product-recommendation-card.tsx`

  - [ ] Green background (#10B981)
  - [ ] Heart/checkmark icon
  - [ ] "We Recommend" header
  - [ ] Product tagline
  - [ ] Product image (optional)
  - [ ] Product name and description
  - [ ] Bold key phrases in description
  - [ ] "Learn More" button
  - [ ] Opens affiliate URL on press

- [ ] Create `src/components/recommendations/recommendations-section.tsx`

  - [ ] Filters by relevant categories
  - [ ] Only renders if matches exist
  - [ ] Section title
  - [ ] Renders ProductRecommendationCard for each match

- [ ] Heart or checkmark icon available
  - [ ] Create if not exists in ui/icons

---

## Design Reference

From mockup:

- Bright green card stands out
- Product image on left
- Text content describes benefits
- Clear call-to-action button
- Sits at bottom of dashboard or detail views

## Affiliate Disclosure

Consider adding a small disclosure text:

```tsx
<Text className="text-xs text-gray-500 mt-2">
  * We may earn a commission from purchases made through these links.
</Text>
```
