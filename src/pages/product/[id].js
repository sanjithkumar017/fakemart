import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useCart } from '../../components/CartProvider';
import ImageGallery from '../../components/ImageGallery';
import { useAnalytics } from '../../hooks/useAnalytics';
import styles from './[id].module.css';

export default function ProductDetail({ product, error }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { trackViewItem, trackAddToCart } = useAnalytics();

  useEffect(() => {
    if (product) {
      trackViewItem(product);
    }
  }, [product]);

  if (error) {
    return (
      <>
        <Head>
          <title>Product Not Found - FakeMart</title>
        </Head>
        <div className={styles.error}>
          <h1>Product not found</h1>
          <p>{error}</p>
        </div>
      </>
    );
  }

  const {
    title,
    brand,
    description,
    price,
    discountPercentage,
    rating,
    stock,
    category,
    images
  } = product;

  const originalPrice = discountPercentage 
    ? (price / (1 - discountPercentage / 100)).toFixed(2)
    : null;

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    
    for (let i = 0; i < 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`${styles.star} ${i >= fullStars ? styles.starEmpty : ''}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    
    return stars;
  };

  const generateMockReviews = (rating) => {
    const reviews = [
      {
        id: 1,
        author: 'John D.',
        date: '2026-01-15',
        rating: Math.min(5, Math.ceil(rating)),
        comment: 'Great product! Exactly as described and works perfectly. Highly recommend!'
      },
      {
        id: 2,
        author: 'Sarah M.',
        date: '2026-01-10',
        rating: Math.max(1, Math.floor(rating)),
        comment: 'Good quality for the price. Delivery was fast and packaging was secure.'
      },
      {
        id: 3,
        author: 'Mike T.',
        date: '2026-01-05',
        rating: Math.round(rating),
        comment: 'Very satisfied with this purchase. Would buy again!'
      }
    ];
    return reviews;
  };

  const reviews = generateMockReviews(rating);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    trackAddToCart(product, quantity);
    setQuantity(1);
  };

  const increaseQuantity = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <>
      <Head>
        <title>{title} - FakeMart</title>
        <meta name="description" content={description} />
      </Head>

      <div className="container">
        <div className={styles.productPage}>
          <div className={styles.productContainer}>
            <div className={styles.imageSection}>
              <ImageGallery images={images} title={title} />
            </div>

            <div className={styles.infoSection}>
              {brand && <div className={styles.brand}>{brand}</div>}
              
              <h1 className={styles.title}>{title}</h1>

              <div className={styles.rating}>
                <div className={styles.stars}>
                  {renderStars(rating)}
                </div>
                <span className={styles.ratingText}>
                  {rating.toFixed(1)} out of 5 ({reviews.length} reviews)
                </span>
              </div>

              <div className={styles.priceContainer}>
                <span className={styles.price}>${price.toFixed(2)}</span>
                {originalPrice && (
                  <>
                    <span className={styles.originalPrice}>${originalPrice}</span>
                    <span className={styles.discount}>
                      Save {discountPercentage.toFixed(0)}%
                    </span>
                  </>
                )}
              </div>

              <p className={styles.description}>{description}</p>

              <div className={styles.details}>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Category:</span>
                  <span className={styles.detailValue}>{category}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Availability:</span>
                  <span className={stock > 0 ? styles.stock : styles.outOfStock}>
                    {stock > 0 ? `In Stock (${stock} available)` : 'Out of Stock'}
                  </span>
                </div>
              </div>

              <div className={styles.addToCartSection}>
                <div className={styles.quantitySelector}>
                  <button
                    type="button"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    className={styles.quantityButton}
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className={styles.quantityValue}>{quantity}</span>
                  <button
                    type="button"
                    onClick={increaseQuantity}
                    disabled={quantity >= stock}
                    className={styles.quantityButton}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={stock === 0}
                  className={styles.addToCartButton}
                >
                  {stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            </div>
          </div>

          <div className={styles.reviewsSection}>
            <h2 className={styles.reviewsTitle}>Customer Reviews</h2>
            <div className={styles.reviewsList}>
              {reviews.map(review => (
                <div key={review.id} className={styles.review}>
                  <div className={styles.reviewHeader}>
                    <div className={styles.reviewAuthor}>{review.author}</div>
                    <div className={styles.reviewDate}>{review.date}</div>
                  </div>
                  <div className={styles.rating}>
                    <div className={styles.stars}>
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  <p className={styles.reviewComment}>{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    const response = await fetch(`https://dummyjson.com/products/${id}`);

    if (!response.ok) {
      throw new Error('Product not found');
    }

    const product = await response.json();

    return {
      props: {
        product,
        error: null
      }
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    return {
      props: {
        product: null,
        error: error.message || 'Failed to load product'
      }
    };
  }
}
