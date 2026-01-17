# Push Notifications (NEW)

## Overview

Users receive push notifications when safety updates are published for zip codes they follow. Uses Expo Push Notifications service.

## Notification Types

| Type              | Trigger                                       | Priority         |
| ----------------- | --------------------------------------------- | ---------------- |
| **Warning Alert** | New warning published for subscribed zip code | High (immediate) |
| **Safety Update** | Status change for subscribed area             | Medium           |
| **Weekly Digest** | Weekly summary of all subscribed areas        | Low (scheduled)  |

## User Flow

### 1. Permission Request

**When:** After onboarding zip code selection

**UI:**

- Native permission dialog
- If denied, show settings prompt later

### 2. Notification Preferences

**Path:** `src/app/settings/notifications.tsx`

**Options:**

- Master toggle: Enable/disable all notifications
- Warning alerts: On/Off
- Safety updates: On/Off
- Weekly digest: On/Off
- Quiet hours: Start/End time

### 3. Receiving Notifications

**Foreground:** Show in-app toast/banner
**Background:** System notification
**Tapped:** Deep link to relevant content

## Technical Implementation

### Expo Push Setup

```typescript
// src/lib/notifications/setup.ts
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

export async function registerForPushNotifications(): Promise<string | null> {
  if (!Device.isDevice) {
    console.log('Push notifications require physical device');
    return null;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    return null;
  }

  const token = await Notifications.getExpoPushTokenAsync({
    projectId: 'your-project-id', // From app.json
  });

  return token.data;
}
```

### Notification Handlers

```typescript
// src/lib/notifications/handlers.ts
import * as Notifications from 'expo-notifications';
import { router } from 'expo-router';

// Handle notification when app is foregrounded
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// Handle notification tap
export function setupNotificationResponseListener() {
  return Notifications.addNotificationResponseReceivedListener((response) => {
    const data = response.notification.request.content.data;

    // Deep link based on notification type
    if (data.type === 'warning') {
      router.push(`/safety/${data.categoryId}?zipCode=${data.zipCode}`);
    } else if (data.type === 'update') {
      router.push(`/dashboard?zipCode=${data.zipCode}`);
    }
  });
}
```

### Backend: Sending Notifications

```typescript
// amplify/functions/send-notification/handler.ts
import { Expo } from 'expo-server-sdk';

const expo = new Expo();

export async function sendPushNotification(
  pushTokens: string[],
  title: string,
  body: string,
  data: Record<string, any>
) {
  const messages = pushTokens
    .filter((token) => Expo.isExpoPushToken(token))
    .map((token) => ({
      to: token,
      sound: 'default' as const,
      title,
      body,
      data,
      priority: 'high' as const,
    }));

  const chunks = expo.chunkPushNotifications(messages);

  for (const chunk of chunks) {
    await expo.sendPushNotificationsAsync(chunk);
  }
}
```

### Trigger: CMS Update → Notification

```typescript
// When admin publishes warning for zip code:
// 1. Query users subscribed to that zip code
// 2. Get their push tokens
// 3. Send batch notification

async function onWarningPublished(warning: Warning, zipCode: string) {
  // Get all users subscribed to this zip code
  const users = await getUsersBySubscribedZipCode(zipCode);

  // Filter to those with notifications enabled
  const pushTokens = users
    .filter((u) => u.pushToken && u.notificationPreferences.warnings)
    .map((u) => u.pushToken);

  // Send notification
  await sendPushNotification(
    pushTokens,
    `⚠️ Safety Alert: ${zipCode}`,
    warning.title,
    { type: 'warning', warningId: warning.id, zipCode }
  );
}
```

## Data Model Updates

### User Model Additions

```typescript
type User = {
  // ... existing fields
  pushToken?: string; // Expo push token
  notificationPreferences: {
    enabled: boolean; // Master toggle
    warnings: boolean; // Warning alerts
    updates: boolean; // Status updates
    weeklyDigest: boolean; // Weekly summary
    quietHoursStart?: string; // "22:00"
    quietHoursEnd?: string; // "08:00"
  };
};
```

## Components

### 1. NotificationPermissionPrompt

**Path:** `src/components/notifications/permission-prompt.tsx`

Prompts user to enable notifications with explanation of benefits.

### 2. NotificationPreferences

**Path:** `src/components/notifications/notification-preferences.tsx`

Settings UI for managing notification preferences.

### 3. InAppNotification

**Path:** `src/components/notifications/in-app-notification.tsx`

Toast/banner for foreground notifications.

## Acceptance Criteria

### Setup

- [ ] Configure Expo Push in app.json/app.config.ts
- [ ] Create registerForPushNotifications function
- [ ] Store push token in user profile
- [ ] Handle token refresh

### Permission Flow

- [ ] Request permission after onboarding
- [ ] Handle denied state gracefully
- [ ] Show prompt to enable in settings if denied

### Notification Preferences

- [ ] Create notification settings screen
- [ ] Master toggle for all notifications
- [ ] Per-type toggles (warnings, updates, digest)
- [ ] Quiet hours configuration
- [ ] Save preferences to user profile

### Receiving Notifications

- [ ] Handle foreground notifications (in-app toast)
- [ ] Handle background notifications
- [ ] Deep link on notification tap
- [ ] Update badge count

### Backend

- [ ] Add expo-server-sdk to Lambda functions
- [ ] Create sendPushNotification Lambda
- [ ] Trigger notifications on CMS warning publish
- [ ] Query users by subscribed zip code
- [ ] Respect user notification preferences
- [ ] Implement quiet hours logic
