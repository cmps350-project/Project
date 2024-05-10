import React from 'react'
import User from '@/app/artworks/[userId]/User'
import userRepo from '@/app/repo/user-repo'
import purchasesRepo from '@/app/repo/purchases-repo'
import styles from '@/app/styles/page.module.css'


export default async function page({params}) {
  const userId = params.userId
  const user = await userRepo.getCustomerByUserId(userId)
  let customerDetails = {};
  if (user) {
    customerDetails = await fetchCustomerDetails(userId);
  }

  async function fetchCustomerPurchases(userId) {
    try {
      const customerPurchases = await purchasesRepo.getPurchasesByCustomerId(userId);
      return { purchases: customerPurchases };
    } catch (error) {
      console.error('Error fetching customer purchases:', error);
      return {};
    }
  }

  let customerPurchases= await fetchCustomerPurchases(userId)

  async function fetchCustomerDetails(userId) {
    try {
      const customerDetails = await userRepo.getCustomerDetails(userId);
      return customerDetails;
    } catch (error) {
      console.error('Error fetching customer details:', error);
      return {};
    }
  }

  return (
    <div className={styles.pageBody}>
      {user && <User user={user} {...customerDetails} />}
      
      {customerPurchases.purchases && customerPurchases.purchases.length > 0 && (
        <div className={styles.purchasedArtworks}>
          <h2>Purchased Artworks</h2>
          <ul>   
          {customerPurchases.purchases.map((purchase) => (
            <li key={purchase.artwork.artworkNo}>
            <p>Title: {purchase.artwork.title}</p>
            <img src={purchase.artwork.image.image_url} alt={purchase.artwork.image.alternate_url} />
            <p>Quantity: {purchase.quantity}</p>
            <p>Price Paid: {Number(purchase.totalPrice)}</p>
            </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  
}





