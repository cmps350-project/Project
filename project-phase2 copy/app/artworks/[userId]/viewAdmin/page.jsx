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

    //fetch total purchases per customer
    const totalPurchases = await purchaseRepo.getTotalPurchasesPerCustomer();

    //fetch top spending customers
    const topSpendingCustomers = await userRepo.getTopNSpendingCustomers(3);

    //fetch most popular art category
    const popularCategory = await artworkRepo.getMostPopularCategoryByQuantitySold();

    //const X = await purchaseRepo.getTotalRevenueForYear(2010)
    
   return (
    <>
      <div className={styles.pageBody}>
        <User user={user}></User>
        <h3>Here are some interesting insights about your platform!</h3>

        {/*display total customers */}
        {customers && (
          <p className={styles.tableTitle}>
            Total Customers: {customers}
          </p>
        )}

        {/*display total sellers */}
        {sellers && (
          <p className={styles.tableTitle}>
            Total Sellers: {sellers}
          </p>
        )}

        {/*display average quantity sold per artwork */}
        {averageQuantity && (
          <p className={styles.tableTitle}>
            Average Quantity of Artwork Sales: {averageQuantity._avg.quantity.toFixed(2)}
          </p>
        )}


        {/*display most popular artwork categories*/}
        {popularCategory.length > 0 && (
          <div className={styles.topProducts}>
            <h3>Top 3 Most Popular Artwork Category By Quantities Sold:</h3>
            <ul>
            <li key="1" className={styles.tableTitle}>1. {popularCategory[0].category}</li>
            <li key="2" className={styles.tableTitle}>2. {popularCategory[1].category}</li>
            <li key="3" className={styles.tableTitle}>3. {popularCategory[2].category}</li>
            </ul>
            </div>
        )}




        {/*display top 3 products sold over the last 6 months */}
        {topProductsResult.length > 0 && (
          <div className={styles.topProducts}>
            <h3>Top 3 Products Sold Over the Last 6 Months:</h3>
            <ul>
                {topProductsResult.map((product, index) => (
                <li key={index} className={styles.tableTitle}>
                    {index + 1}. ArtworkId: {product.artworkNo}, Artwork Title: {product.title}
                </li>
                ))}
            </ul>
            </div>
        )}
        {/*display top 3 spending customers */}
        {topSpendingCustomers.length > 0 && (
          <div className={styles.topProducts}>
            <h3>Top 3 Spending Customers:</h3>
            <ul>
                {topSpendingCustomers.map((customer, index) => (
                <li key={index} className={styles.tableTitle}>
                    {index + 1}. CustomerId: {customer?.customerId || 'N/A'}
                </li>
                ))}
            </ul>
            </div>
        )}

        {/*display total purchases per customer */}
        {totalPurchases.length > 0 && (
          <div className={styles.tableContainer}>
            <h3> Total Purchases Per Customer:</h3>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Customer ID</th>
                  <th>Total Purchases</th>
                </tr>
              </thead>
              <tbody>
                {totalPurchases.map((purchase, index) => (
                  <tr key={index}>
                    <td>{purchase.customerId}</td>
                    <td>{purchase._count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}






      </div>
    </>
  )
}
