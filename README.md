# FakeMart - Next.js E-commerce Application

A fully functional e-commerce application built with Next.js Pages Router, featuring server-side rendering, custom CSS, and integration with the DummyJSON API.

## Features

- **Server-Side Rendering (SSR)**: All product pages use `getServerSideProps` for optimal SEO and fast first paint
- **Shopping Cart**: Persistent cart state using React Context and localStorage
- **Product Search**: Full-text search with filtering and sorting
- **Category Browsing**: Browse products by categories
- **Product Details**: Image gallery, reviews, and add to cart functionality
- **Checkout Flow**: Complete checkout process with form validation
- **Responsive Design**: Mobile-first design with custom CSS modules
- **SEO Optimized**: Meta tags, semantic HTML, and optimized images

## Tech Stack

- Next.js 14 (Pages Router)
- React 18
- JavaScript (no TypeScript)
- CSS Modules (no frameworks)
- DummyJSON API
- PropTypes for type validation

## Project Structure

```
src/
  pages/
    _app.js              - Custom App with CartProvider, Header, Footer
    _document.js         - Custom Document for SEO meta tags
    index.js             - Home page with featured products and categories
    search.js            - Search results with filters and pagination
    checkout.js          - Shopping cart and checkout flow
    product/
      [id].js            - Dynamic product detail page
  components/
    Header/              - Navigation header with search and cart
    Footer/              - Site footer with links
    ProductCard/         - Reusable product card component
    CartProvider/        - Shopping cart context and state management
    ImageGallery/        - Product image gallery with thumbnails
  styles/
    globals.css          - Global styles and CSS variables
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Pages

### Home Page (/)
- Hero banner with promotional message
- Featured products section (8 products)
- Category browsing grid
- Server-side data fetching

### Search Page (/search)
- Search by query or category
- Client-side price range filter
- Sort by price (low-high, high-low) or rating
- Pagination (12 items per page)
- Server-side data fetching with query params

### Product Detail (/product/[id])
- Image gallery with thumbnail navigation
- Product information (title, brand, price, description)
- Stock availability
- Quantity selector and add to cart
- Mock customer reviews
- Server-side data fetching

### Checkout (/checkout)
- Shopping cart summary
- Update quantities or remove items
- Shipping information form
- Order summary with subtotal, shipping, tax, and total
- Order confirmation modal
- Client-side only (cart state dependent)

## Features Details

### Cart Management
- Add products to cart from product detail page
- Update quantities in checkout
- Remove items from cart
- Persistent cart using localStorage
- Cart count badge in header

### Responsive Design
Breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### CSS Architecture
- CSS Variables for consistent theming
- CSS Modules for component scoping
- No inline styles
- No CSS frameworks (Tailwind, Bootstrap, etc.)

### SEO Optimization
- Page-specific meta tags using next/head
- Semantic HTML structure
- Optimized images with next/image
- Server-side rendering for all product pages

## API Integration

Using DummyJSON API (https://dummyjson.com):
- GET /products?limit=8 - Featured products
- GET /products/categories - All categories
- GET /products/search?q={query} - Search products
- GET /products/category/{category} - Category products
- GET /products/{id} - Single product

## License

MIT

## Author

Built with Next.js and DummyJSON API
