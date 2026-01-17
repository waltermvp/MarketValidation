# Submit Report (Issue #24)

"Submit Report - report health hazards in your community"

## Overview

A form that allows users to report health or safety hazards they've observed in their community.

---

## Components

### 1. HazardReportForm

**Path:** `src/components/report/hazard-report-form.tsx`

**Purpose:** Form for collecting hazard report information.

**Props:**

```typescript
type HazardReportFormProps = {
  onSubmit: (data: HazardReportFormData) => void;
  isLoading?: boolean;
  categories: HazardCategory[];
};

type HazardReportFormData = {
  categoryId: string;
  description: string;
  location: string;
};
```

**Form Fields:**

1. **Category Dropdown**

   - Label: "Does the hazard relate to the following categories?"
   - Placeholder: "Select a category"
   - Options from HazardCategory list
   - Required

2. **Description Textarea**

   - Label: "What happened or is happening?"
   - Placeholder: "Please describe"
   - Multi-line input
   - Required, min 10 characters

3. **Location Input**
   - Label: "Where is this happening?"
   - Placeholder: "Enter address or location"
   - Single-line input
   - Required

**Validation:**

- Use react-hook-form for form state
- Use zod for schema validation
- Show inline error messages

**Implementation:**

```tsx
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  categoryId: z.string().min(1, 'Please select a category'),
  description: z.string().min(10, 'Please provide more detail'),
  location: z.string().min(1, 'Location is required'),
});
```

---

### 2. SubmitReportScreen

**Path:** `src/components/report/submit-report-screen.tsx`

**Purpose:** Full screen component with header and form.

**Props:**

```typescript
type SubmitReportScreenProps = {
  onSubmit: (data: HazardReportFormData) => Promise<void>;
  onBack?: () => void;
};
```

**UI Elements:**

- App logo/icon at top
- "Submit Report" title (large, bold)
- Subtitle: "Are you aware of a health or safety hazard that remains unreported?"
- "Let us know!" CTA text (green/primary color)
- HazardReportForm below

**Layout:**

```tsx
<ScrollView className="flex-1 bg-white">
  <View className="p-6">
    <LogoIcon className="w-12 h-12 mb-4" />
    <Text className="text-3xl font-netflix-bold mb-2">Submit Report</Text>
    <Text className="text-gray-600 mb-1">
      Are you aware of a health or safety hazard that remains unreported?
    </Text>
    <Text className="text-primary-500 font-netflix-bold mb-6">
      Let us know!
    </Text>

    <HazardReportForm categories={hazardCategories} onSubmit={handleSubmit} />
  </View>
</ScrollView>
```

---

## Page

### Report Page

**Path:** `src/app/report.tsx`

**Purpose:** Expo Router page for the submit report screen.

**Implementation:**

```tsx
import { router } from 'expo-router';
import { SubmitReportScreen } from '@/components/report/submit-report-screen';
import { mockHazardCategories } from '@/data/mock';

export default function ReportPage() {
  const handleSubmit = async (data) => {
    // TODO: Submit to backend
    console.log('Report submitted:', data);
    // Show success message
    router.back();
  };

  return (
    <SubmitReportScreen onSubmit={handleSubmit} onBack={() => router.back()} />
  );
}
```

---

## Acceptance Criteria

- [ ] Create `src/components/report/hazard-report-form.tsx`

  - [ ] Category dropdown with hazard categories
  - [ ] Description textarea (multi-line)
  - [ ] Location input field
  - [ ] Form validation with react-hook-form + zod
  - [ ] Inline error messages
  - [ ] Submit button
  - [ ] Loading state support

- [ ] Create `src/components/report/submit-report-screen.tsx`

  - [ ] Logo/icon at top
  - [ ] "Submit Report" title
  - [ ] Subtitle text
  - [ ] "Let us know!" green CTA text
  - [ ] Renders HazardReportForm

- [ ] Create `src/app/report.tsx`
  - [ ] Renders SubmitReportScreen
  - [ ] Handles form submission
  - [ ] Navigation back to dashboard
  - [ ] Success feedback

---

## Design Reference

From mockup:

- Clean white background
- Green accent for CTA
- Standard form spacing
- Accessible input labels
