import { useState } from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';
import styles from './ImageGallery.module.css';

export default function ImageGallery({ images, title }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className={styles.gallery}>
      <div className={styles.mainImage}>
        <Image
          src={images[selectedIndex]}
          alt={`${title} - Image ${selectedIndex + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className={styles.mainImageImg}
          priority={selectedIndex === 0}
        />
      </div>

      {images.length > 1 && (
        <div className={styles.thumbnails}>
          {images.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setSelectedIndex(index)}
              className={`${styles.thumbnail} ${
                index === selectedIndex ? styles.thumbnailActive : ''
              }`}
              aria-label={`View image ${index + 1}`}
            >
              <Image
                src={image}
                alt={`${title} thumbnail ${index + 1}`}
                fill
                sizes="100px"
                className={styles.thumbnailImg}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired
};
