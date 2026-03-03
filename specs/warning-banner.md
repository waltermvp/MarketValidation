# Warning Banner (Issue #22)

"Special Warning - first one to know about health and safety emergencies"

## Overview

A prominent alert banner that displays when there's an active health or safety emergency.

---

## Component

### WarningBanner

**Path:** `src/components/dashboard/warning-banner.tsx`

**Purpose:** Display special warnings/alerts for health emergencies.

**Props:**

```typescript
type WarningBannerProps = {
  warning?: Warning;
  onViewReport?: () => void;
};
```

**UI Elements:**

- Yellow/amber background color (#FEF3C7 or yellow-100)
- Left side:
  - Alert triangle icon (red/orange)
  - "Special Warning" label (small, gray text)
  - Warning title (larger, red text, e.g., "Flu Virus Outbreak")
- Right side:
  - "Full Report" link (underlined, clickable)

**Behavior:**

- Only renders if `warning` prop is provided
- Clicking "Full Report" calls onViewReport or navigates to reportUrl
- Banner should be dismissible (optional enhancement)

**Styling:**

```tsx
<View className="bg-yellow-100 rounded-xl p-4 flex-row items-center">
  <View className="mr-3">
    <AlertTriangleIcon className="text-red-500" />
  </View>
  <View className="flex-1">
    <Text className="text-xs text-gray-600">Special Warning</Text>
    <Text className="text-red-600 font-netflix-bold">{warning.title}</Text>
  </View>
  <TouchableOpacity>
    <Text className="text-red-600 underline">Full Report</Text>
  </TouchableOpacity>
</View>
```

---

## Icon Required

### AlertTriangleIcon

**Path:** `src/components/ui/icons/alert-triangle.tsx`

If not exists, create an SVG icon component for the alert triangle.

---

## Acceptance Criteria

- [ ] Create `src/components/dashboard/warning-banner.tsx`

  - [ ] Yellow/amber background (#FEF3C7)
  - [ ] Alert triangle icon on left
  - [ ] "Special Warning" label text
  - [ ] Warning title in red
  - [ ] "Full Report" link on right
  - [ ] Only renders when warning prop provided
  - [ ] Handles onViewReport callback

- [ ] Create alert triangle icon if needed

  - [ ] `src/components/ui/icons/alert-triangle.tsx`
  - [ ] Export from icons index

- [ ] Component is exported properly
  - [ ] Can be imported from dashboard components

---

## Design Reference

From mockup:

- Rounded corners
- Sits below LocationHeader
- Above safety categories
- Prominent but not overwhelming
