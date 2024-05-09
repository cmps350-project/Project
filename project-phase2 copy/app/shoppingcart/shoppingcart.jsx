'use client';

import React, { useState } from 'react';
import styles from '@/app/styles/basket.module.css';

const ShoppingCart = ({ artwork }) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className={styles.basketContainer}>
      <div className={styles.basketArtworkItem}>
        <img
          className={styles.basketArtworkItemImg}
          src={artwork.image.image_url}
          alt={artwork.description}
        />
        <div className={styles.basketArtworkDetails}>
          <h3 className={styles.mainArtTitle}>{artwork.title}</h3>
          <p className={styles.artist}>By: {artwork.artist.name}</p>
          <p className={styles.price}>Price: ${artwork.price}</p>
          <p className={styles.description}>{artwork.description}</p>
          <p className={styles.category}>Category: {artwork.category}</p>
          <p className={styles.medium}>Medium: {artwork.medium}</p>
          <p className={styles.year}>Year: {artwork.year}</p>

          
          <div className={styles.quantityContainer}>
            <button className={styles.quantityButton} onClick={handleDecrement}>
              -
            </button>
            <span className={styles.quantity}>{quantity}</span>
            <button className={styles.quantityButton} onClick={handleIncrement}>
              +
            </button>
          </div>
        </div>
      </div>
      <button className={styles.checkoutButton}>Add to Cart</button>
    </div>
  );
};

export default ShoppingCart;