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

    //fetch total artworks sold
    const totalSold = await artworkRepo.getTotalArtworksSold();

    //fetch top 3 products sold over the last 6 months
    const topProductsResult = await artworkRepo.getTop3ProductsLast6Months();

    //fetch total purchases per customer
    const totalPurchases = await purchaseRepo.getTotalPurchasesPerCustomer();

    //fetch top spending customers
    const topSpendingCustomers = await userRepo.getTopNSpendingCustomers(3);

    //fetch top spending customers in 2024
    const topSpendingCustomers2024 = await userRepo.getTopNSpendingCustomersInYear(3, 2024);

    //fetch most popular art category
    const popularCategory = await artworkRepo.getMostPopularCategoryByQuantitySold();

   return (
    <>
      <div className={styles.pageBody}>
        <User user={user}></User>
        <h3 className = {styles.stat}>Here are some interesting insights about your platform!</h3>

    <div className = {styles.cardContainer}>
        {/*display total customers */}
        <div className = {styles.statCard}>
        <h3 className = {styles.stat}>No of Users:</h3>
        {customers && (
          <p className={styles.tableTitle}>
            Total Customers: {customers}
          </p>
        )}
        {sellers && (
          <p className={styles.tableTitle}>
            Total Sellers: {sellers}
          </p>
        )}
            <p className={styles.tableTitle}>
            Total Users: {sellers + customers}
          </p>
        </div>



        {/*display average quantity sold per artwork */}
        <div className = {styles.statCard}>
        <h3 className = {styles.stat}>Artwork Sales</h3>
        {averageQuantity && (
          <p className={styles.tableTitle}>Average Quantity of Artwork Sales:
            {averageQuantity._avg.quantity.toFixed(2)}
          </p>
        )}
        {totalSold && (
          <p className={styles.tableTitle}>Total Number of Artworks Sold:
            {totalSold.toFixed(2)}
          </p>
        )}

        </div>

        {/*display most popular artwork categories*/}
        <div className = {styles.statCard}>
        {popularCategory.length > 0 && (
          <div className={styles.topProducts}>
            <h3 className = {styles.stat}>Top 3 Most Popular Artwork Categories:</h3>
            <ul>
            <li key="1" className={styles.tableTitle}>1. {popularCategory[0].category}</li>
            <li key="2" className={styles.tableTitle}>2. {popularCategory[1].category}</li>
            <li key="3" className={styles.tableTitle}>3. {popularCategory[2].category}</li>
            </ul>
            </div>
        )}
        </div>

        {/*display top 3 products sold over the last 6 months */}
        <div className = {styles.statCard}>
        {topProductsResult.length > 0 && (
          <div className={styles.topProducts}>
            <h3 className = {styles.stat}>Top 3 Products Sold Over the Last 6 Months:</h3>
            <ul>
                {topProductsResult.map((product, index) => (
                <li key={index} className={styles.tableTitle}>
                    {index + 1}. ArtworkId: {product.artworkNo}, Artwork Title: {product.title}
                </li>
                ))}
            </ul>
            </div>
        )}
        </div>
        {/*display top 3 spending customers in 2024*/}
        <div className = {styles.statCard}>
        {topSpendingCustomers2024.length > 0 && (
          <div className={styles.topProducts}>
            <h3 className = {styles.stat}>Top 3 Spending Customers in 2024:</h3>
            <ul>
                {topSpendingCustomers2024.map((customer, index) => (
                <li key={index} className={styles.tableTitle}>
                    {index + 1}. CustomerId: {customer?.customerId || 'N/A'}
                </li>
                ))}
            </ul>
            </div>
        )}
        </div>


        {/*display top 3 spending customers of all time */}
        <div className = {styles.statCard}>
        {topSpendingCustomers.length > 0 && (
          <div className={styles.topProducts}>
            <h3 className = {styles.stat}>Top 3 Spending Customers of all time:</h3>
            <ul>
                {topSpendingCustomers.map((customer, index) => (
                <li key={index} className={styles.tableTitle}>
                    {index + 1}. CustomerId: {customer?.customerId || 'N/A'}
                </li>
                ))}
            </ul>
            </div>
        )}
        </div>
        
    </div>
        {/*display total purchases per customer */}
        {totalPurchases.length > 0 && (
          <div className={styles.tableContainer}>
            <h3 className = {styles.stat}> Total Purchases Per Customer:</h3>
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
