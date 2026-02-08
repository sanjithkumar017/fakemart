# Firebase Performance Monitoring - Quick Reference

## What's Installed

Firebase Performance Monitoring is configured to automatically track **Core Web Vitals** and page performance.

## What You Get (Automatic)

✅ **Core Web Vitals**
- LCP (Largest Contentful Paint)
- FID (First Input Delay) 
- CLS (Cumulative Layout Shift)
- FCP (First Contentful Paint)
- TTFB (Time to First Byte)

✅ **Page Performance**
- Page load times
- Network request durations
- Resource loading times

✅ **Real User Monitoring**
- Actual user experience data
- Device and network breakdowns
- Geographic performance insights

## Zero Configuration

No code changes needed. Performance tracking starts automatically when the app runs.

## View Your Data

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select: **fakemart-performance-analytics**
3. Click: **Performance** (left sidebar)
4. View dashboards and Core Web Vitals

## Files Modified

- `src/lib/firebase.js` - Initializes Performance Monitoring
- `src/pages/_app.js` - Imports Firebase to start tracking

## That's It!

Performance data will appear in Firebase Console 24-48 hours after deployment.

For detailed information, see: [FIREBASE_PERFORMANCE.md](./FIREBASE_PERFORMANCE.md)

## Firebase Project Info

- **Project:** fakemart-performance-analytics
- **Measurement ID:** G-YSM55L45MF
