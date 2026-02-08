import Head from 'next/head';
import Link from 'next/link';
import ProductCard from '../components/ProductCard';
import styles from './index.module.css';

export default function Home({ products, categories, error }) {
  if (error) {
    return (
      <>
        <Head>
          <title>FakeMart - Your Online Shopping Destination</title>
          <meta name="description" content="Shop the best products at FakeMart" />
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
        <title>FakeMart - Your Online Shopping Destination</title>
        <meta name="description" content="Shop the best products at FakeMart. Browse smartphones, laptops, fragrances, and more with great deals and fast shipping." />
      </Head>

      <div className={styles.hero}>
        <div className="container">
          <h1 className={styles.heroTitle}>Welcome to FakeMart</h1>
          <p className={styles.heroSubtitle}>
            Discover amazing products at unbeatable prices. Shop now and save big!
          </p>
        </div>
      </div>

      <section className={styles.section}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Featured Products</h2>
          <div className={styles.productsGrid}>
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section} style={{ backgroundColor: 'var(--color-bg-gray)' }}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Shop by Category</h2>
          <div className={styles.categoriesGrid}>
            {categories.map(category => (
              <Link
                key={category.slug}
                href={`/search?category=${category.slug}`}
                className={styles.categoryCard}
              >
                <div className={styles.categoryIcon}>{getCategoryIcon(category.slug)}</div>
                <div className={styles.categoryName}>{category.name}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function getCategoryIcon(category) {
  const icons = {
    smartphones: '📱',
    laptops: '💻',
    fragrances: '🌸',
    skincare: '🧴',
    groceries: '🛒',
    'home-decoration': '🏠',
    furniture: '🛋️',
    tops: '👕',
    'womens-dresses': '👗',
    'womens-shoes': '👠',
    'mens-shirts': '👔',
    'mens-shoes': '👞',
    'mens-watches': '⌚',
    'womens-watches': '⌚',
    'womens-bags': '👜',
    'womens-jewellery': '💍',
    sunglasses: '🕶️',
    automotive: '🚗',
    motorcycle: '🏍️',
    lighting: '💡'
  };
  return icons[category] || '🏷️';
}

export async function getServerSideProps() {
  try {
    const [productsRes, categoriesRes] = await Promise.all([
      fetch('https://dummyjson.com/products?limit=8'),
      fetch('https://dummyjson.com/products/categories')
    ]);

    if (!productsRes.ok || !categoriesRes.ok) {
      throw new Error('Failed to fetch data');
    }

    const productsData = await productsRes.json();
    const categoriesData = await categoriesRes.json();

    return {
      props: {
        products: productsData.products || [],
        categories: categoriesData || [],
        error: null
      }
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        products: [],
        categories: [],
        error: error.message || 'An error occurred while fetching data'
      }
    };
  }
}
