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
      <h2 className = {styles.h2}>Purchase History</h2>
      <hr className = {styles.hr}></hr>
      {customerPurchases.purchases && customerPurchases.purchases.length > 0 && (
        <div className={styles.cardContainer}>
          <ul>   
          {customerPurchases.purchases.map((purchase) => (
            <div className = {styles.card}>
            <tr key={purchase.artwork.artworkNo}>
            <p className={styles.fontUpperC}>Title: {purchase.artwork.title}</p>
            <img src={purchase.artwork.image.image_url} alt={purchase.artwork.image.alternate_url} height= "200" width = "150"/>
            <p className={styles.fontUpperC}>Quantity: {purchase.quantity}</p>
            <p className={styles.fontUpperC}>Price Paid: {Number(purchase.totalPrice)}</p>
            </tr>
            </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  
}





