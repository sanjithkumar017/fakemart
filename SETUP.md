# FakeMart - Setup and Development Guide

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Open Browser**
   Navigate to http://localhost:3000

## Application Overview

### Pages

1. **Home Page** - http://localhost:3000
   - Hero banner
   - 8 featured products (server-rendered)
   - Category grid with clickable links

2. **Search Page** - http://localhost:3000/search
   - Query params: `?q=phone` or `?category=smartphones` or `?page=2`
   - Client-side filters for price range and sorting
   - Server-side pagination

3. **Product Detail** - http://localhost:3000/product/1
   - Image gallery with thumbnails
   - Product details and reviews
   - Add to cart with quantity selector

4. **Checkout** - http://localhost:3000/checkout
   - Cart items with quantity controls
   - Shipping information form
   - Order summary and place order

### Key Features Implemented

#### Server-Side Rendering (SSR)
- All pages except checkout use `getServerSideProps`
- Initial HTML includes full product data
- No loading spinners on first render
- SEO-friendly with pre-rendered content

#### Client-Side Interactivity
- Cart state managed with React Context
- Persistent cart using localStorage
- Image gallery navigation
- Client-side filters on search page
- Form validation on checkout

#### Cart Management
- Add products from product detail page
- Update quantities in checkout
- Remove items
- Cart count badge in header
- Persists across page reloads

#### Responsive Design
Three breakpoints:
- Mobile: < 768px (1-2 column grids)
- Tablet: 768px - 1024px (2-3 column grids)
- Desktop: > 1024px (4 column grids)

### Component Architecture

```
CartProvider (React Context)
├── Header (search, cart icon)
├── Main Content
│   ├── Home (hero, products, categories)
│   ├── Search (filters, products grid, pagination)
│   ├── Product Detail (gallery, info, reviews)
│   └── Checkout (cart, form, summary)
└── Footer (links)
```

### CSS Architecture

- Global CSS variables in `globals.css`
- CSS Modules for all components
- No inline styles
- No external CSS frameworks
- Consistent spacing and color system

### Data Flow

1. **Server-Side Data Fetching**
   ```javascript
   export async function getServerSideProps(context) {
     const data = await fetch('https://dummyjson.com/products');
     return { props: { products: data.products } };
   }
   ```

2. **Client-Side State (Cart)**
   ```javascript
   const { addToCart, items, getCartTotal } = useCart();
   ```

3. **URL-Based State (Search/Pagination)**
   ```javascript
   router.push(`/search?q=${query}&page=${page}`);
   ```

## Testing the Application

### Test Home Page
1. Visit http://localhost:3000
2. Verify hero banner displays
3. Check 8 featured products load
4. Click category cards to navigate to search

### Test Search
1. Use search bar in header
2. Try searching for "phone"
3. Filter by price range
4. Sort by price or rating
5. Navigate pagination

### Test Product Detail
1. Click any product card
2. View image gallery (click thumbnails)
3. Change quantity
4. Click "Add to Cart"
5. Verify cart badge updates

### Test Checkout
1. Add multiple products to cart
2. Click cart icon in header
3. Update quantities
4. Remove items
5. Fill out shipping form
6. Click "Place Order"
7. Verify success modal

### Test Persistence
1. Add items to cart
2. Refresh page
3. Verify cart items persist
4. Navigate between pages
5. Cart should maintain state

## Common Development Tasks

### Add New Component
```javascript
// src/components/MyComponent/MyComponent.js
import PropTypes from 'prop-types';
import styles from './MyComponent.module.css';

export default function MyComponent({ prop }) {
  return <div className={styles.container}>{prop}</div>;
}

MyComponent.propTypes = {
  prop: PropTypes.string.isRequired
};
```

### Create New Page with SSR
```javascript
// src/pages/mypage.js
import Head from 'next/head';

export default function MyPage({ data }) {
  return (
    <>
      <Head>
        <title>My Page</title>
        <meta name="description" content="Page description" />
      </Head>
      <div>{data}</div>
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();
  return { props: { data } };
}
```

### Use Cart Context
```javascript
import { useCart } from '../components/CartProvider';

function MyComponent() {
  const { items, addToCart, removeFromCart, updateQuantity } = useCart();
  
  const handleAdd = () => {
    addToCart(product, quantity);
  };
  
  return <button onClick={handleAdd}>Add to Cart</button>;
}
```

## Build and Deploy

### Production Build
```bash
npm run build
npm start
```

### Environment Variables
Create `.env.local` if needed:
```
NEXT_PUBLIC_API_URL=https://dummyjson.com
```

## Troubleshooting

### Images Not Loading
- Check next.config.js has correct image domains
- Verify DummyJSON API is accessible

### Cart Not Persisting
- Check browser localStorage is enabled
- Clear localStorage and try again

### Build Errors
- Delete `.next` folder
- Delete `node_modules`
- Run `npm install` again
- Run `npm run build`

## Project Requirements Met

✅ Next.js Pages Router  
✅ JavaScript only (no TypeScript)  
✅ Custom CSS only (no Tailwind/Bootstrap)  
✅ DummyJSON API integration  
✅ Server-side rendering with getServerSideProps  
✅ Client hydration and interactivity  
✅ Cart state with React Context  
✅ localStorage persistence  
✅ Responsive design (3 breakpoints)  
✅ SEO meta tags on all pages  
✅ next/image for optimization  
✅ next/link for navigation  
✅ PropTypes validation  
✅ CSS Modules for styling  
✅ CSS variables for theming  
✅ Error handling in getServerSideProps  

## API Endpoints Used

- GET /products?limit=8 - Home featured products
- GET /products/categories - Category list
- GET /products/search?q={query} - Search products
- GET /products/category/{category} - Category products
- GET /products/{id} - Single product details
- Pagination: ?skip={n}&limit={n}

## Performance Optimizations

- Server-side rendering for fast first paint
- next/image for automatic image optimization
- CSS Modules for tree-shaking
- React Context instead of global state library
- Minimal bundle size (no UI frameworks)

Enjoy building with FakeMart!
