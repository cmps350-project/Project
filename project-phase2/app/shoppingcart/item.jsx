import React from 'react';
import styles from '@/app/styles/basket.module.css';

export default function Item  ({ artwork, quantity, handleQuantityChange })  {
  return (
    <article className={`${styles.artworkItem} ${styles.basketItem}`}>
      <img className={styles.artworkItemImg} src={artwork.images.url} alt={artwork.description} />
      <div className={styles.artworkDetails}>
        <h3 className={styles.title}>{artwork.title}</h3>
        <p className={styles.description}>{artwork.description}</p>
        <p className={styles.artist}>By Artist: {artwork.artist}</p>
        <p className={styles.category}>Category: {artwork.category}</p>
        <p className={styles.year}>Year: {artwork.year}</p>
        <p className={styles.medium}>Medium: {artwork.medium}</p>
        <p className={styles.price}>Price: ${(artwork.price * quantity).toFixed(2)}</p>
        <div className={styles.quantity}>
          <button
            className={styles.quantityBTN}
            onClick={() => handleQuantityChange(artwork.id, quantity - 1)}
          >
            -
          </button>
          <span className={styles.quantityValue}>{quantity}</span>
          <button
            className={styles.quantityBTN}
            onClick={() => handleQuantityChange(artwork.id, quantity + 1)}
          >
            +
          </button>
        </div>
      </div>
    </article>
  );
};
