'use client'
import React, { useState } from 'react';
import styles from '@/app/styles/checkout.module.css'

export default function Checkout () {
  const [formData, setFormData] = useState({
    street: '',
    city: '',
    country: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  function handleChange (e)  {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    
    const artworkWithQuantity = JSON.parse(localStorage.getItem('artwork'));
    const { artworkNo, quantity } = artworkWithQuantity;

    const customerId = localStorage.getItem('customerId');

   //handle submit not done yet
  };


  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Checkout</h2>
      <form onSubmit={handleSubmit} className={styles.checkoutForm}>
        <div className={styles.formContainer}>
          <label htmlFor="street">Street:</label>
          <input
            type="text"
            id="street"
            name="street"
            value={formData.street}
            onChange={handleChange}
            className={styles.formInput}
            placeholder="Enter your street address"
            required
          />

          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className={styles.formInput}
            placeholder="Enter your city"
            required
          />

          <label htmlFor="country">Country:</label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className={styles.formInput}
            placeholder="Enter your country"
            required
          />

          <label htmlFor="cardNumber">Card Number:</label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            className={styles.formInput}
            placeholder="Enter your card number"
            required
          />

          <label htmlFor="expiryDate">Expiry Date:</label>
          <input
            type="text"
            id="expiryDate"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            className={styles.formInput}
            placeholder="MM/YY"
            required
          />

          <label htmlFor="cvv">CVV:</label>
          <input
            type="text"
            id="cvv"
            name="cvv"
            value={formData.cvv}
            onChange={handleChange}
            className={styles.formInput}
            placeholder="CVV"
            required
          />

          <button type="submit" className={styles.checkoutBtn} onClick={handleSubmit}>
            Confirm Order
          </button>
        </div>
      </form>
    </div>
  );
};


