'use client';

import React, { useState } from 'react';
import styles from '@/app/styles/basket.module.css';
import { useRouter } from 'next/navigation'


export default function ShoppingCart ({ artwork }) {
    const router = useRouter();
    const [quantity, setQuantity] = useState(1);

  function handleIncrement () {
    setQuantity(quantity + 1);
  };

  function handleDecrement () {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  function handleCheckout(){
    const artworkWithQuantity = {
        artworkNo: artwork.artworkNo,
        quantity: quantity,
        totalPrice: artwork.price*quantity
    };
    localStorage.setItem('artwork', JSON.stringify(artworkWithQuantity));
    router.push(`/checkout`);
  }


  return (
    <>
        <div className={styles.basketContainer}>
        <h2 className = {styles.h2}>Your Basket</h2>
        <hr className = {styles.hr}></hr>
      <div className={styles.basketArtworkItem}>
        <img
          className={styles.basketArtworkItemImg}
          src={artwork.image.image_url}
          alt={artwork.description}
        />
        <div className={styles.basketArtworkDetails}>
          <h3 className={styles.h2}>{artwork.title}</h3>
          <p className={styles.artist}>By: {artwork.artist.name}</p>
          <p className={styles.price}>Price: ${artwork.price}</p>
          <p className={styles.description}>{artwork.description}</p>
          <p className={styles.category}>Category: {artwork.category}</p>
          <p className={styles.medium}>Medium: {artwork.medium}</p>
          <p className={styles.year}>Year: {artwork.year}</p>
          <div className={styles.quantityWrapper}>
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
      </div>
      
      <button className={styles.checkoutButton} onClick={handleCheckout}>Checkout</button>
    </div>
    </>

  );
};

