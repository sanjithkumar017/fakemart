import { useState, useMemo } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import ProductCard from '../components/ProductCard';
import styles from './search.module.css';

const ITEMS_PER_PAGE = 12;

export default function Search({ products, total, query, category, currentPage, error }) {
  const router = useRouter();
  const [sortBy, setSortBy] = useState('');
  const [priceRange, setPriceRange] = useState('all');

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Filter by price range
    if (priceRange === 'under-50') {
      result = result.filter(p => p.price < 50);
    } else if (priceRange === '50-100') {
      result = result.filter(p => p.price >= 50 && p.price < 100);
    } else if (priceRange === '100-500') {
      result = result.filter(p => p.price >= 100 && p.price < 500);
    } else if (priceRange === 'over-500') {
      result = result.filter(p => p.price >= 500);
    }

    // Sort products
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [products, priceRange, sortBy]);

  const handlePageChange = (page) => {
    const query = new URLSearchParams(router.query);
    query.set('page', page);
    router.push(`/search?${query.toString()}`);
  };

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  const pageTitle = query 
    ? `Search results for "${query}"`
    : category
    ? `${category.charAt(0).toUpperCase() + category.slice(1)} - Products`
    : 'All Products';

  if (error) {
    return (
      <>
        <Head>
          <title>Error - FakeMart</title>
        </Head>
        <div className={styles.error}>
          <h1>Failed to load products</h1>
          <p>{error}</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{pageTitle} - FakeMart</title>
        <meta name="description" content={`Browse ${pageTitle.toLowerCase()} at FakeMart`} />
      </Head>

      <div className="container">
        <div className={styles.searchPage}>
          <div className={styles.header}>
            <h1 className={styles.title}>{pageTitle}</h1>
            <p className={styles.subtitle}>
              {total} {total === 1 ? 'product' : 'products'} found
            </p>
          </div>

          <div className={styles.controls}>
            <div className={styles.filterGroup}>
              <label htmlFor="priceRange" className={styles.filterLabel}>
                Price Range
              </label>
              <select
                id="priceRange"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className={styles.select}
              >
                <option value="all">All Prices</option>
                <option value="under-50">Under $50</option>
                <option value="50-100">$50 - $100</option>
                <option value="100-500">$100 - $500</option>
                <option value="over-500">Over $500</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label htmlFor="sortBy" className={styles.filterLabel}>
                Sort By
              </label>
              <select
                id="sortBy"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={styles.select}
              >
                <option value="">Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {filteredAndSortedProducts.length > 0 ? (
            <>
              <div className={styles.productsGrid}>
                {filteredAndSortedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className={styles.pagination}>
                  <button
                    type="button"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={styles.pageButton}
                    aria-label="Previous page"
                  >
                    Previous
                  </button>

                  <span className={styles.pageInfo}>
                    Page {currentPage} of {totalPages}
                  </span>

                  <button
                    type="button"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={styles.pageButton}
                    aria-label="Next page"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className={styles.noResults}>
              <h2 className={styles.noResultsTitle}>No products found</h2>
              <p>Try adjusting your filters or search query</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { q, category, page = '1' } = context.query;
  const currentPage = parseInt(page, 10);
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    let url;
    
    if (q) {
      url = `https://dummyjson.com/products/search?q=${encodeURIComponent(q)}&limit=${ITEMS_PER_PAGE}&skip=${skip}`;
    } else if (category) {
      url = `https://dummyjson.com/products/category/${encodeURIComponent(category)}?limit=${ITEMS_PER_PAGE}&skip=${skip}`;
    } else {
      url = `https://dummyjson.com/products?limit=${ITEMS_PER_PAGE}&skip=${skip}`;
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    const data = await response.json();

    return {
      props: {
        products: data.products || [],
        total: data.total || 0,
        query: q || null,
        category: category || null,
        currentPage,
        error: null
      }
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return {
      props: {
        products: [],
        total: 0,
        query: q || null,
        category: category || null,
        currentPage,
        error: error.message || 'An error occurred while fetching products'
      }
    };
  }
}
