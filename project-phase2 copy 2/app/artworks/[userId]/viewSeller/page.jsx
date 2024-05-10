import React from 'react';
import User from '@/app/artworks/[userId]/User';
import userRepo from '@/app/repo/user-repo';
import artworkRepo from '@/app/repo/artwork-repo'; 
import styles from '@/app/styles/page.module.css';

export default async function SellerPage({ params }) {
  const userId = params.userId;
  const seller = await userRepo.getSellerByUserId(userId);
  const artworks = await artworkRepo.getArtworksBySellerId(userId);
  const saleHistory = await artworkRepo.getSaleHistoryForArtist(userId);

  return (
    <div className={styles.pageBody}>
      {seller && <User user={seller} />}
      <h2 className={styles.h2}>This is the art you are currently selling</h2>

      <div className={styles.cardContainer}>
         <ul>   
          {artworks.map((artwork) => (
            <div className = {styles.card}>
            <tr key={artwork.artworkNo}>
            <p className={styles.title}>{artwork.title}</p>
            <img src={artwork.image.image_url} alt={artwork.image.alternate_url} height="200" width="150" />
            <p className={styles.fontUpperC}>Price: {Number(artwork.price)}</p>
            </tr>
            </div>
            ))}
          </ul>
      </div>
      <hr className={styles.hr} />
      <h2 className={styles.h2}>Sale History</h2>

      <div className={styles.tableContainer}>
        <table className={`${styles.table} ${styles.bordered}`}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Image</th>
              <th>Customer</th>
              <th>Purchase Date</th>
              <th>Quantity</th>
              <th>Price Paid</th>
            </tr>
          </thead>
          <tbody>
            {saleHistory.map((purchase) => (
              <tr key={purchase.purchaseNo}>
                <td>{purchase.artwork.title}</td>
                <td><img src={purchase.artwork.image.image_url} alt={purchase.artwork.image.alternate_url} height="100" width="75" /></td>
                <td>{purchase.customer.username}</td>
                <td>{purchase.purchaseDate.toDateString()}</td>
                <td>{purchase.quantity}</td>
                <td>{Number(purchase.totalPrice)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
