# Firebase Analytics - Quick Reference

## What Was Integrated

Firebase Analytics has been fully integrated into FakeMart to track user behavior and e-commerce metrics.

## Files Added/Modified

### New Files:
1. **src/lib/firebase.js** - Firebase initialization and configuration
2. **src/hooks/useAnalytics.js** - Custom hook for analytics tracking
3. **FIREBASE_ANALYTICS.md** - Complete documentation

### Modified Files:
1. **src/pages/_app.js** - Auto-tracks page views on route changes
2. **src/pages/product/[id].js** - Tracks product views and add to cart
3. **src/pages/checkout.js** - Tracks purchase completion
4. **src/components/Header/Header.js** - Tracks search queries
5. **package.json** - Added firebase dependency

## Analytics Events Tracked

### Automatically Tracked:
- ✅ **Page Views** - Every route change
  - Tracked in: `_app.js`

### User Actions Tracked:
- ✅ **Product Views** - When viewing product details
  - Tracked in: `product/[id].js`
  - Data: product ID, name, brand, category, price

- ✅ **Add to Cart** - When adding items to cart
  - Tracked in: `product/[id].js`
  - Data: product details, quantity, total value

- ✅ **Search** - When searching for products
  - Tracked in: `Header.js`
  - Data: search term

- ✅ **Purchase** - When completing checkout
  - Tracked in: `checkout.js`
  - Data: all items, quantities, total value, transaction ID

## How to Use

### In Any Component:

```javascript
import { useAnalytics } from '../hooks/useAnalytics';

function MyComponent() {
  const { trackEvent, trackAddToCart, trackSearch } = useAnalytics();
  
  // Track custom event
  const handleClick = () => {
    trackEvent('button_click', { button_name: 'my_button' });
  };
  
  return <button onClick={handleClick}>Click Me</button>;
}
```

### Available Methods:

```javascript
const {
  trackEvent,         // Generic event tracking
  trackAddToCart,     // Track add to cart
  trackPurchase,      // Track purchase
  trackSearch,        // Track search
  trackViewItem       // Track product view
} = useAnalytics();
```

## Testing

1. **Run the app:**
   ```bash
   npm run dev
   ```

2. **Perform actions:**
   - Navigate pages (page views)
   - Search products
   - View product details
   - Add to cart
   - Complete checkout

3. **View analytics:**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Select: fakemart-performance-analytics
   - Navigate to: Analytics → Events

## Key Features

✅ SSR-safe (only runs on client-side)
✅ Automatic page view tracking
✅ E-commerce event tracking
✅ Custom hook for easy integration
✅ Google Analytics 4 compatible
✅ No performance impact (lazy loaded)

## Project Info

- **Firebase Project:** fakemart-performance-analytics
- **Measurement ID:** G-YSM55L45MF
- **Region:** Global

## Next Steps

The analytics is ready to use! Events will start appearing in Firebase Console within 24 hours (real-time in DebugView).

Consider adding:
- User authentication to track user journeys
- Custom dimensions for product categories
- Funnel analysis for checkout flow
- Revenue reports and dashboards
