# Post-Mortem Report: Email Confirmation Error

**Date of Incident:** January 12, 2026
**Time of Incident:** 9:32 AM - 9:39 AM EST
**Duration:** ~7 minutes
**Severity:** Medium
**Status:** Resolved

---

## Executive Summary

On January 12, 2026, a user experienced an error message when attempting to confirm their email subscription on MapYourHealth. The error displayed: *"There was an error confirming your subscription. Please try again or contact support."*

Investigation revealed that **the subscription was actually confirmed successfully on the first attempt**, but a combination of two software bugs caused the error message to display on subsequent automatic retry attempts.

**No data was lost, and the user's subscription was successfully confirmed.**

---

## Timeline (All times in EST)

| Time | Event |
|------|-------|
| 9:32:04 AM | User signs up with email `ppriori@aspq.org` |
| 9:32:05 AM | Confirmation email sent successfully |
| 9:32:37 AM | User clicks confirmation link - **First attempt SUCCEEDS** |
| 9:32:38 AM | Database record updated to `confirmed: true` |
| 9:33:58 AM | Duplicate confirmation requests triggered (2 requests) |
| 9:34:26 AM | Additional duplicate requests (2 requests) |
| 9:38:44 AM | Final duplicate requests (2 requests) |
| 9:39 AM | User reports seeing error message |

---

## Root Cause Analysis

### Primary Cause: Frontend Bug - Duplicate API Requests

The confirmation page had a React programming error where the API client was being recreated on every component render:

```javascript
// BUG: Client created inside component - new instance on every render
export function ConfirmScreen() {
  const client = generateClient<Schema>(); // New object each render

  React.useEffect(() => {
    // Make confirmation request...
  }, [code, client]); // client in dependencies causes re-runs
}
```

This caused the confirmation API to be called multiple times automatically, without user interaction.

### Secondary Cause: Backend Design Flaw - Non-Idempotent Operation

After a successful confirmation, the backend changed the confirmation code from the original value to `"CONFIRMED"`:

```javascript
// BUG: Changing confirmation code breaks subsequent lookups
await updateUser({
  email: user.email,
  confirmed: true,
  confirmationCode: 'CONFIRMED', // This removes the original code!
});
```

This meant that when duplicate requests arrived (from the frontend bug), they could no longer find the user by the original confirmation code, resulting in an "Invalid confirmation code" error.

### Bug Interaction

1. **First request:** Found user by confirmation code → Updated to confirmed → Changed code to "CONFIRMED" → **SUCCESS**
2. **Subsequent requests:** Searched for original confirmation code → Not found (code is now "CONFIRMED") → **ERROR displayed to user**

---

## Impact Assessment

| Metric | Value |
|--------|-------|
| Users Affected | 1 confirmed |
| Data Loss | None |
| Subscription Status | Successfully confirmed |
| Service Availability | 100% (no downtime) |

**Note:** The user's subscription was successfully confirmed on the first attempt. The error message was misleading - it appeared due to duplicate requests failing, not because the confirmation itself failed.

---

## Bug Frequency Analysis

### How often would this bug occur?

**Trigger conditions:**
The bug would manifest when BOTH conditions are met:
1. The frontend component re-renders after the first API call starts but before it completes
2. A subsequent duplicate request arrives after the first request has already changed the confirmation code

**Common triggers for component re-renders:**
- Window resize (triggers `useWindowDimensions` hook)
- Any state change in the component
- Parent component re-rendering
- React Strict Mode (development) causing double-renders

### Estimated Frequency

| Scenario | Likelihood | Bug Visible? |
|----------|------------|--------------|
| Fast network + no re-renders | Low | No - single request succeeds |
| Slow network + window resize | High | Yes - duplicate requests |
| Mobile device rotation | High | Yes - triggers resize |
| User on slow connection | Medium | Yes - more time for re-renders |
| React Strict Mode (dev only) | 100% | Yes - always double-renders |

### Historical Analysis

Reviewing the database, we can see how many users have `confirmationCode: "CONFIRMED"` vs original codes:

- **7 users** have `confirmationCode: "CONFIRMED"` (successfully confirmed)
- **4 users** have original confirmation codes (confirmed: false, awaiting confirmation)
- **12 users** have `confirmationCode: null` (legacy records before this feature)

**Conclusion:** The bug likely affected most users who confirmed their email, but since the first request succeeds, most users would not have noticed - they would see a brief error flash before the page updates, or they would refresh and see success. This particular user likely experienced a slower network or more re-renders, making the error more visible.

---

## Resolution

### Immediate Fix (Deployed)

**Fix 1: Frontend - Prevent duplicate requests**
- Moved API client creation outside the component
- Removed `client` from useEffect dependencies
- This prevents automatic re-execution of the confirmation API

**Fix 2: Backend - Make operation idempotent**
- Stopped changing `confirmationCode` after confirmation
- Now only sets `confirmed: true` while preserving the original code
- Subsequent requests will find the user and see "Email already confirmed" message

### Code Changes

```javascript
// BEFORE (Bug)
const client = generateClient<Schema>(); // Inside component
}, [code, client]); // client in deps

// AFTER (Fixed)
const client = generateClient<Schema>(); // Outside component
}, [code]); // client removed from deps
```

```javascript
// BEFORE (Bug)
confirmationCode: 'CONFIRMED' // Changed code

// AFTER (Fixed)
// confirmationCode not modified - keeps original value
```

---

## Preventive Measures

### Short-term (Completed)
- [x] Fixed frontend duplicate request bug
- [x] Fixed backend idempotency issue
- [x] Verified fix with test confirmations

### Medium-term (Planned)
- [ ] Add integration tests for confirmation flow
- [ ] Add monitoring/alerting for multiple confirmation attempts from same user
- [ ] Review other useEffect dependencies across the application

### Long-term (Recommended)
- [ ] Implement request deduplication at the API layer
- [ ] Add client-side request tracking to prevent duplicate submissions
- [ ] Consider adding confirmation status check before making API call

---

## Lessons Learned

1. **React useEffect dependencies require careful review** - Objects created inside components should not be in dependency arrays
2. **Backend operations should be idempotent** - The same request should produce the same result regardless of how many times it's called
3. **Error messages can be misleading** - The user saw an error even though their action succeeded
4. **Comprehensive logging is essential** - Additional logging in the confirmation handler would have made debugging faster

---

## Appendix: Verification

Post-fix database state for affected user:

```json
{
  "email": "ppriori@aspq.org",
  "confirmed": true,
  "createdAt": "2026-01-12T14:32:04.606Z",
  "updatedAt": "2026-01-12T14:32:38.396Z"
}
```

**Confirmation:** User subscription is active and confirmed.

---

*Report prepared by: Engineering Team*
*Date: January 12, 2026*
