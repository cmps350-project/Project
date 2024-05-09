import artworkRepo from '@/app/repo/artwork-repo'
import userRepo from '@/app/repo/user-repo'
import purchaseRepo from '@/app/repo/purchases-repo'
import User from '@/app/artworks/[userId]/User'
import React from 'react'
import styles from '@/app/styles/page.module.css'

export default async function page({ params }) {
  const userId = params.userId
    //get admin from userId
    const user = await userRepo.getAdminByUserId(userId)

    //fetch total customers and sellers
    const customers = await userRepo.getTotalCustomers();
    const sellers = await userRepo.getTotalSellers();

    //fetch average quantity sold per artwork
    const averageQuantity = await artworkRepo.getAverageQuantitySoldPerArtwork();

    //fetch top 3 products sold over the last 6 months
    const topProductsResult = await artworkRepo.getTop3ProductsLast6Months();


  return (
    <>
      <div className={styles.pageBody}>
        <User user={user}></User>
        <h2>Here are some interesting insights about your platform!</h2>

        {/* Display total customers */}
        {customers && (
          <p className={styles.stat}>
            Total Customers: {customers}
          </p>
        )}

        {/* Display total sellers */}
        {sellers && (
          <p className={styles.stat}>
            Total Sellers: {sellers}
          </p>
        )}

        {/* Display average quantity sold per artwork */}
        {averageQuantity && (
          <p className={styles.stat}>
            Average Quantity Sold Per Artwork: {averageQuantity._avg.quantity.toFixed(2)}
          </p>
        )}

        {/* Display top 3 products sold over the last 6 months */}
        {topProductsResult.length > 0 && (
          <div className={styles.topProducts}>
            <h3>Top 3 Products Sold Over the Last 6 Months:</h3>
            <ul>
                {topProductsResult.map((product, index) => (
                <li key={index}>
                    {index + 1}. ArtworkId: {product.artworkNo}, Artwork Title: {product.title}
                </li>
                ))}
            </ul>
          </div>
        )}


      </div>
    </>
  )
}
