'use client'
import React, { useState } from 'react';
import styles from '@/app/styles/checkout.module.css'
import { useRouter } from 'next/navigation'

export default function Checkout () {
  const router = useRouter()
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
  
    const { street, city, country, ...restFormData } = formData;
    const shippingAddress = `${street}, ${city}, ${country}`;
  
    const artworkWithQuantity = JSON.parse(localStorage.getItem('artwork'));
    const { artworkNo, quantity, totalPrice } = artworkWithQuantity;
  
    const customerId = localStorage.getItem('userId');
  
    const purchaseData = {
      quantity: quantity,
      totalPrice: totalPrice.toString(),
      artworkNo: artworkNo,
      customerId: customerId,
    };
  
    try {
      const updatedCustomer = await fetch(`/api/users/customers/${customerId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ shippingAddress }),
      });
  
      if (!updatedCustomer.ok) {
        throw new Error('Failed to update shipping address');
      }
  
      const response = await fetch('/api/purchases', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(purchaseData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to confirm order');
      }
  
      alert("Your order has been confirmed. Thank you for shopping with us!");
  
      localStorage.removeItem('artwork');
  
      router.push('/');
    } catch (error) {
      console.error('Error confirming order:', error);
    }
  }
  

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


