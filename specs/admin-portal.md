# Admin Portal (NEW)

## Overview

Web-based admin portal for managing safety content, warnings, and user data. Built with React and Amplify Admin UI capabilities.

## Admin Capabilities

| Feature                 | Description                                       |
| ----------------------- | ------------------------------------------------- |
| **Manage Warnings**     | Create, edit, delete safety warnings by zip code  |
| **Manage Safety Data**  | Update contaminant data, safety category statuses |
| **View Users**          | See registered users, their subscriptions         |
| **Send Notifications**  | Manually trigger push notifications               |
| **Analytics Dashboard** | View user signups, subscriptions, engagement      |

## Technical Setup

### Separate React App

**Location:** `admin/` directory (separate from mobile app)

**Stack:**

- React 18
- Vite (build tool)
- AWS Amplify JS SDK
- React Router
- TailwindCSS
- React Query for data fetching
- React Hook Form for forms

### Amplify Admin Configuration

```typescript
// admin/src/amplify-config.ts
import { Amplify } from 'aws-amplify';
import outputs from '../../amplify_outputs.json';

Amplify.configure(outputs);

// Admin users are in a separate Cognito user pool group
// Or use Amplify Admin UI built-in authentication
```

## Pages & Features

### 1. Dashboard (`/admin`)

**Overview metrics:**

- Total users
- Users by subscription count
- Active warnings count
- Notifications sent (today/week/month)

**Quick actions:**

- Create new warning
- View recent activity

### 2. Warnings Management (`/admin/warnings`)

**List View:**

- Table of all warnings
- Columns: ID, Title, Zip Code, Severity, Status, Created, Actions
- Filter by: status, severity, zip code
- Search by title

**Create/Edit Warning:**

```typescript
type WarningInput = {
  title: string;
  description: string;
  type: WarningType;
  severity: 'high' | 'medium' | 'low';
  zipCodes: string[]; // Affected zip codes
  status: 'draft' | 'published' | 'expired';
  publishAt?: string; // Schedule publishing
  expiresAt?: string;
  notifySubscribers: boolean; // Send push notification on publish
};
```

**Actions:**

- Edit
- Publish / Unpublish
- Send notification
- Delete

### 3. Safety Data Management (`/admin/safety`)

**By Zip Code:**

- Search for zip code
- View/edit safety categories for that location
- Update status (danger/warning/safe)
- Edit contaminant data

**Bulk Import:**

- CSV upload for batch updates
- Template download

### 4. Users Management (`/admin/users`)

**List View:**

- Table of all users
- Columns: Email, Subscriptions count, Signup date, Last active
- Filter by: date range, subscription count
- Search by email

**User Detail:**

- Email, signup date
- List of subscribed zip codes
- Notification preferences
- Actions: disable account, reset password

### 5. Notifications (`/admin/notifications`)

**Send Manual Notification:**

- Target: All users / By zip code / Specific users
- Title, body, deep link
- Schedule or send immediately
- Preview before sending

**Notification History:**

- List of sent notifications
- Delivery stats (sent, delivered, opened)

### 6. Analytics (`/admin/analytics`)

**Charts:**

- User signups over time
- Subscriptions by zip code (heatmap)
- Notification engagement rates
- Most followed zip codes

## Data Model (Admin-specific)

### Admin User (Cognito Group)

```typescript
// Admins are regular Cognito users in "admin" group
// Check group membership for authorization
```

### Audit Log

```typescript
type AuditLog = {
  id: string;
  adminId: string;
  action: 'create' | 'update' | 'delete' | 'publish' | 'notify';
  resourceType: 'warning' | 'safety_data' | 'user';
  resourceId: string;
  details: Record<string, any>;
  timestamp: string;
};
```

## API / GraphQL

### Admin Mutations

```graphql
# Warnings
mutation CreateWarning($input: WarningInput!) { ... }
mutation UpdateWarning($id: ID!, $input: WarningInput!) { ... }
mutation DeleteWarning($id: ID!) { ... }
mutation PublishWarning($id: ID!, $notifySubscribers: Boolean!) { ... }

# Safety Data
mutation UpdateSafetyCategory($zipCode: String!, $categoryId: String!, $input: SafetyCategoryInput!) { ... }
mutation BulkUpdateSafetyData($input: [SafetyDataInput!]!) { ... }

# Notifications
mutation SendNotification($input: NotificationInput!) { ... }

# Users
mutation DisableUser($userId: ID!) { ... }
```

### Admin Queries

```graphql
query ListWarnings($filter: WarningFilter, $limit: Int, $nextToken: String) { ... }
query GetWarning($id: ID!) { ... }
query ListUsers($filter: UserFilter, $limit: Int, $nextToken: String) { ... }
query GetAnalytics($dateRange: DateRange!) { ... }
```

## Authorization

### Amplify Auth Rules

```typescript
// In Amplify data schema
// Only users in "admin" group can access admin mutations
{
  authorization: [{ allow: 'groups', groups: ['admin'] }];
}
```

## File Structure

```
admin/
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── amplify-config.ts
│   ├── routes/
│   │   ├── index.tsx           # Dashboard
│   │   ├── warnings/
│   │   │   ├── index.tsx       # List
│   │   │   ├── [id].tsx        # Edit
│   │   │   └── new.tsx         # Create
│   │   ├── safety/
│   │   ├── users/
│   │   ├── notifications/
│   │   └── analytics/
│   ├── components/
│   │   ├── layout/
│   │   ├── warnings/
│   │   ├── users/
│   │   └── common/
│   ├── hooks/
│   ├── lib/
│   └── types/
└── public/
```

## Acceptance Criteria

### Setup

- [ ] Create admin/ directory with Vite + React
- [ ] Configure Amplify SDK
- [ ] Set up TailwindCSS
- [ ] Create basic layout (sidebar, header)
- [ ] Implement authentication (admin group check)

### Dashboard

- [ ] Create dashboard page
- [ ] Display key metrics
- [ ] Quick action buttons
- [ ] Recent activity feed

### Warnings Management

- [ ] List all warnings with filters
- [ ] Create new warning form
- [ ] Edit warning form
- [ ] Publish/unpublish functionality
- [ ] Delete with confirmation
- [ ] Trigger notification on publish

### Safety Data

- [ ] Zip code search/lookup
- [ ] Edit safety categories per zip
- [ ] Update contaminant data
- [ ] Bulk import via CSV

### Users

- [ ] List users with search/filter
- [ ] View user details
- [ ] View user subscriptions
- [ ] Disable user account

### Notifications

- [ ] Manual notification sender
- [ ] Target selection (all/zip/specific)
- [ ] Notification history

### Analytics

- [ ] User signup chart
- [ ] Subscription heatmap
- [ ] Engagement metrics
