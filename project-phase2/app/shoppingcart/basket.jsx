'use client';

import React, { useEffect, useState } from 'react';
import Item from '@/app/shoppingcart/item'
import styles from '@/app/styles/basket.module.css';

export default function Basket({ basketItems, artworks, handleQuantityChange, handleCheckout }) {


  return (
    <section className={styles.basketSection}>
      <h2 className={styles.title}>Your Basket</h2>
      <div className={styles.basketItems}>
        {basketItems.map((item) => {
          const artwork = artworks.find((artwork) => artwork.id === item.artworkID);
          return artwork ? (
            <Item
              key={artwork.id}
              artwork={artwork}
              quantity={item.quantity}
              handleQuantityChange={handleQuantityChange}
            />
          ) : null;
        })}
      </div>
      <button className={styles.checkoutBtn} onClick={handleCheckout}>
        Checkout
      </button>
    </section>
  );
};

