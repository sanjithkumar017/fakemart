# Firebase Performance Monitoring - Core Web Vitals

This application uses Firebase Performance Monitoring to automatically track Core Web Vitals and page performance metrics.

## What's Tracked Automatically

Once the application is running, Firebase Performance Monitoring automatically collects:

### Core Web Vitals
- **LCP (Largest Contentful Paint)** - Loading performance
  - Good: < 2.5s | Needs Improvement: 2.5-4s | Poor: > 4s
  
- **FID (First Input Delay)** - Interactivity
  - Good: < 100ms | Needs Improvement: 100-300ms | Poor: > 300ms
  
- **CLS (Cumulative Layout Shift)** - Visual stability
  - Good: < 0.1 | Needs Improvement: 0.1-0.25 | Poor: > 0.25

### Additional Metrics
- **FCP (First Contentful Paint)** - Initial render time
- **TTFB (Time to First Byte)** - Server response time
- **Page load times** - Complete page load duration
- **Network requests** - API call performance to DummyJSON
- **Resource loading** - Images, scripts, stylesheets

## How It Works

Performance Monitoring is initialized in `src/lib/firebase.js` and imported in `src/pages/_app.js`. No additional code is required - it works automatically once Firebase is initialized.

```javascript
// src/lib/firebase.js
import { getPerformance } from 'firebase/performance';

let performance;
if (typeof window !== 'undefined') {
  performance = getPerformance(app);
}
```

## Viewing Performance Data

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select project: **fakemart-performance-analytics**
3. Navigate to: **Performance** (in left sidebar)
4. View dashboards:
   - **Dashboard** - Overview of all metrics
   - **Web Vitals** - Core Web Vitals breakdown
   - **Page loads** - Page-specific performance
   - **Network requests** - API call performance

## Real-Time Debugging (Development)

To see performance data in real-time during development:

1. Open Chrome DevTools
2. Go to **Application** → **Cookies**
3. Add cookie: `_ga_debug=1`
4. Reload the page
5. Go to Firebase Console → **DebugView** to see live events

## Performance Targets

### Current Setup
This is a basic implementation focused on Core Web Vitals. The system automatically:
- ✅ Tracks all page loads
- ✅ Monitors network requests to DummyJSON API
- ✅ Measures Core Web Vitals on real user devices
- ✅ Works in production (no development-only tracking)

### Future Enhancements
Consider adding later:
- Custom performance traces for specific user flows (checkout, search)
- Page-specific performance tracking
- Custom metrics for business-critical operations
- Performance budgets and alerts

## No Configuration Required

Firebase Performance Monitoring automatically:
- Detects page navigation
- Tracks Core Web Vitals using browser APIs
- Monitors network requests
- Sends data to Firebase (within quota limits)

## Free Tier Limits

- **Automatic traces**: Unlimited
- **Custom traces**: 200,000/day (not currently used)
- **Network monitoring**: Included
- **Data retention**: 90 days

## Technical Details

**Implementation:**
- Client-side only (no SSR performance impact)
- Lazy loaded (doesn't block initial page load)
- Uses native browser Performance APIs
- Zero configuration after initialization

**Browser Support:**
- Modern browsers with Performance API support
- Gracefully degrades in older browsers
- No errors if Performance API unavailable

## Security

The Firebase configuration in code is safe to expose as it:
- Is restricted to your Firebase project domain
- Only enables client-side performance monitoring
- Contains no secrets or credentials
- Cannot be used to impersonate your application

## Next Steps

1. Deploy the application to production
2. Wait 24-48 hours for data collection
3. View Core Web Vitals in Firebase Console
4. Identify performance bottlenecks
5. Optimize based on real user data

## Resources

- [Firebase Performance Monitoring Docs](https://firebase.google.com/docs/perf-mon)
- [Web Vitals Guide](https://web.dev/vitals/)
- [Core Web Vitals](https://web.dev/vitals/#core-web-vitals)
