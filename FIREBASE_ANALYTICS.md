# Firebase Analytics Integration

This document explains the Firebase Analytics integration in the FakeMart e-commerce application.

## Setup

Firebase has been integrated with the following configuration:

- **Project ID:** fakemart-performance-analytics
- **Analytics ID:** G-YSM55L45MF

## Files Created

### 1. Firebase Configuration (`src/lib/firebase.js`)
Initializes Firebase app and Analytics with proper client-side detection to avoid SSR issues.

### 2. Analytics Hook (`src/hooks/useAnalytics.js`)
Custom React hook that provides analytics tracking functions:

#### Available Methods:

- **trackEvent(eventName, eventParams)** - Track custom events
- **trackAddToCart(product, quantity)** - Track when items are added to cart
- **trackPurchase(items, total)** - Track completed purchases
- **trackSearch(searchTerm)** - Track search queries
- **trackViewItem(product)** - Track product detail views

## Automatic Tracking

### Page Views
Automatically tracked on every route change in `_app.js`:
- Tracks page path
- Tracks page title
- Fires on initial load and route changes

## Manual Event Tracking

### 1. Product Views
**Location:** `src/pages/product/[id].js`

```javascript
const { trackViewItem } = useAnalytics();

useEffect(() => {
  if (product) {
    trackViewItem(product);
  }
}, [product]);
```

**Data tracked:**
- Item ID
- Item name
- Item brand
- Item category
- Price

### 2. Add to Cart
**Location:** `src/pages/product/[id].js`

```javascript
const { trackAddToCart } = useAnalytics();

const handleAddToCart = () => {
  addToCart(product, quantity);
  trackAddToCart(product, quantity);
};
```

**Data tracked:**
- Currency (USD)
- Value (price × quantity)
- Item details (ID, name, price, quantity)

### 3. Search
**Location:** `src/components/Header/Header.js`

```javascript
const { trackSearch } = useAnalytics();

const handleSearch = (e) => {
  e.preventDefault();
  if (searchQuery.trim()) {
    trackSearch(searchQuery.trim());
    router.push(`/search?q=${searchQuery}`);
  }
};
```

**Data tracked:**
- Search term

### 4. Purchase
**Location:** `src/pages/checkout.js`

```javascript
const { trackPurchase } = useAnalytics();

const handleSubmit = (e) => {
  e.preventDefault();
  trackPurchase(items, total);
  setShowSuccess(true);
};
```

**Data tracked:**
- Currency (USD)
- Total value (including shipping and tax)
- Transaction ID (timestamp-based)
- All cart items with details

## Events Being Tracked

| Event | Trigger | Location | Data |
|-------|---------|----------|------|
| `page_view` | Route change | All pages | page_path, page_title |
| `view_item` | Product detail load | Product page | item details, price |
| `add_to_cart` | Add to cart button | Product page | item, quantity, value |
| `search` | Search submission | Header | search_term |
| `purchase` | Place order | Checkout | items, total, transaction_id |

## Viewing Analytics Data

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select project: **fakemart-performance-analytics**
3. Navigate to Analytics → Events
4. View real-time data and reports

## Testing Analytics

### Development Testing

Run the app in development mode:
```bash
npm run dev
```

Perform these actions to generate analytics events:
1. Navigate to different pages (page_view)
2. Search for products (search)
3. Click on a product (view_item)
4. Add product to cart (add_to_cart)
5. Complete checkout (purchase)

### Verify Events

Open browser console to see Firebase debug messages, or use Firebase DebugView:
1. Enable Debug Mode in Chrome DevTools → Application → Storage → Cookies
2. Add cookie: `_ga_debug=1`
3. Reload page
4. Go to Firebase Console → DebugView to see events in real-time

## E-commerce Metrics Tracked

### Conversion Funnel
1. **View Item** → Product detail views
2. **Add to Cart** → Items added to cart
3. **Purchase** → Completed orders

### Revenue Tracking
- Item prices in USD
- Purchase totals including tax and shipping
- Transaction IDs for order tracking

### User Behavior
- Search terms (what users are looking for)
- Page views (navigation patterns)
- Product views (popular products)

## Best Practices Implemented

1. **Client-side Only**: Analytics only initialized in browser (not during SSR)
2. **Singleton Pattern**: Firebase app initialized only once
3. **Error Handling**: Checks if analytics is available before tracking
4. **E-commerce Standards**: Uses Google Analytics 4 recommended event names
5. **Privacy**: No personally identifiable information tracked

## Future Enhancements

Consider adding:
- User ID tracking (for logged-in users)
- Custom user properties (customer segments)
- Scroll depth tracking
- Time on page tracking
- Enhanced e-commerce events (begin_checkout, add_shipping_info, add_payment_info)
- Conversion tracking with Google Ads

## Security Notes

The Firebase configuration (API keys) are safe to expose in client-side code as they are:
- Restricted by domain in Firebase Console
- Protected by Firebase Security Rules
- Only for client identification, not authentication

For production, ensure:
- Firebase Security Rules are properly configured
- Analytics data retention settings are set
- GDPR compliance measures are in place (if applicable)
