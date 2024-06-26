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
    const { artworkNo, quantity: requestedQuantity, totalPrice } = artworkWithQuantity;
  
    const customerId = localStorage.getItem('userId');
  
    try {
      const customerResponse = await fetch(`/api/users/customers/${customerId}`);
      const customerData = await customerResponse.json();
      const customerBalance = customerData.moneyBalance;
      
      if (totalPrice > customerBalance) {
        alert('Insufficient balance. Please top up your account.');
        return;
      }
      
      const artworkResponse = await fetch(`/api/artworks/${artworkNo}`);
      const artworkData = await artworkResponse.json();
      const availableQuantity = artworkData.quantity;
      if (requestedQuantity > availableQuantity) {
       alert('Requested quantity exceeds available quantity.');
       return;
      }
      
      const purchaseData = {
        quantity: requestedQuantity,
        totalPrice: totalPrice.toString(),
        artworkNo: artworkNo,
        customerId: customerId,
      };
      
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
      
      const updatedCustomer = await fetch(`/api/users/customers/${customerId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          shippingAddress,
          moneyBalance: (customerBalance - totalPrice).toString(), 
        }),
      });
  
      if (!updatedCustomer.ok) {
        throw new Error('Failed to update customer data');
      }
      
      const updatedArtwork = await fetch(`/api/artworks/${artworkNo}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          quantity: (availableQuantity - requestedQuantity)
        }),
      });
  
      if (!updatedArtwork.ok) {
        throw new Error('Failed to update artwork quantity');
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
      <h2 className={styles.h2}>Checkout</h2>
      <hr className = {styles.hr}></hr>
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


