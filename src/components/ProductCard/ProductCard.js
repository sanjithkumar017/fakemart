import Link from 'next/link';
import Image from 'next/image';
import PropTypes from 'prop-types';
import styles from './ProductCard.module.css';

export default function ProductCard({ product }) {
  const { id, title, price, thumbnail, rating, brand, discountPercentage } = product;
  
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

  return (
    <Link href={`/product/${id}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={thumbnail}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className={styles.image}
        />
      </div>
      
      <div className={styles.content}>
        {brand && <div className={styles.brand}>{brand}</div>}
        
        <h3 className={styles.title}>{title}</h3>
        
        <div className={styles.rating}>
          <div className={styles.stars}>
            {renderStars(rating)}
          </div>
          <span className={styles.ratingValue}>({rating.toFixed(1)})</span>
        </div>
        
        <div className={styles.priceContainer}>
          <span className={styles.price}>${price.toFixed(2)}</span>
          {originalPrice && (
            <>
              <span className={styles.originalPrice}>${originalPrice}</span>
              <span className={styles.discount}>-{discountPercentage.toFixed(0)}%</span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    brand: PropTypes.string,
    discountPercentage: PropTypes.number
  }).isRequired
};
