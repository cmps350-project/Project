import React from 'react';
import User from '@/app/artworks/[userId]/User';
import styles from '@/app/styles/page.module.css';
import userRepo from '@/app/repo/user-repo';
import artworkRepo from '@/app/repo/artwork-repo';
import purchaseRepo from '@/app/repo/purchases-repo';

export default async function page({ params }) {
  const userId = params.userId;
  // Get admin from userId
  const user = await userRepo.getAdminByUserId(userId);

  // Fetch total customers and sellers
  const customers = await userRepo.getTotalCustomers();
  const sellers = await userRepo.getTotalSellers();

  // Fetch average quantity sold per artwork
  const averageQuantity = await artworkRepo.getAverageQuantitySoldPerArtwork();

  // Fetch total artworks sold
  const totalSold = await artworkRepo.getTotalArtworksSold();

  // Fetch top 3 products sold over the last 6 months
  const topProductsResult = await artworkRepo.getTop3ProductsLast6Months();

  // Fetch total purchases per customer
  const totalPurchases = await purchaseRepo.getTotalPurchasesPerCustomer();

  // Fetch top spending customers
  const topSpendingCustomers = await userRepo.getTopNSpendingCustomers(3);

  // Fetch top spending customers in 2024
  const topSpendingCustomers2024 = await userRepo.getTopNSpendingCustomersInYear(3, 2024);

  // Fetch most popular art category
  const popularCategory = await artworkRepo.getMostPopularCategoryByQuantitySold();

  // Fetch revenue per year for every seller
  const revenuePerYearForSellers = await userRepo.getRevenuePerYearForSellers();

  return (
    <>
      <div className={styles.pageBody}>
        <User user={user}></User>
        <h3 className={styles.Vtitle}>Here are some interesting insights about your platform!</h3>

        <div className={styles.cardContainer}>
          {/* Display total customers */}
          <div className={styles.card}>
            <h3 className={styles.Vtitle}>No of Users:</h3>
            {customers && (
              <p className={styles.fontUpperC}>
                Total Customers: {customers}
              </p>
            )}
            {sellers && (
              <p className={styles.fontUpperC}>
                Total Sellers: {sellers}
              </p>
            )}
            <p className={styles.fontUpperC}>
              Total Users: {sellers + customers}
            </p>
          </div>

          {/* Display average quantity sold per artwork */}
          <div className={styles.card}>
            <h3 className={styles.Vtitle}>Artwork Sales</h3>
            {averageQuantity && (
              <p className={styles.fontUpperC}>Average Quantity of Artwork Sales: {averageQuantity._avg.quantity.toFixed(2)}</p>
            )}
            {totalSold && (
              <p className={styles.fontUpperC}>Total Number of Artworks Sold: {totalSold.toFixed(2)}</p>
            )}
          </div>

          {/* Display most popular artwork categories */}
          <div className={styles.card}>
            {popularCategory.length > 0 && (
              <div className={styles.topProducts}>
                <h3 className={styles.Vtitle}>Top 3 Most Popular Artwork Categories:</h3>
                <ul>
                  <li key="1" className={styles.fontUpperC}>1. {popularCategory[0].category}</li>
                  <li key="2" className={styles.fontUpperC}>2. {popularCategory[1].category}</li>
                  <li key="3" className={styles.fontUpperC}>3. {popularCategory[2].category}</li>
                </ul>
              </div>
            )}
          </div>

          {/* Display top 3 products sold over the last 6 months */}
          <div className={styles.card}>
            {topProductsResult.length > 0 && (
              <div className={styles.topProducts}>
                <h3 className={styles.Vtitle}>Top 3 Products Sold Over the Last 6 Months:</h3>
                <ul>
                  {topProductsResult.map((product, index) => (
                    <li key={index} className={styles.fontUpperC}>
                      {index + 1}. ArtworkId: {product.artworkNo}, Artwork Title: {product.title}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Display top 3 spending customers in 2024 */}
          <div className={styles.card}>
            {topSpendingCustomers2024.length > 0 && (
              <div className={styles.topProducts}>
                <h3 className={styles.Vtitle}>Top 3 Spending Customers in 2024:</h3>
                <ul>
                  {topSpendingCustomers2024.map((customer, index) => (
                    <li key={index} className={styles.fontUpperC}>
                      {index + 1}. CustomerId: {customer?.customerId || 'N/A'}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Display top 3 spending customers of all time */}
          <div className={styles.card}>
            {topSpendingCustomers.length > 0 && (
              <div className={styles.topProducts}>
                <h3 className={styles.Vtitle}>Top 3 Spending Customers of all time:</h3>
                <ul>
                  {topSpendingCustomers.map((customer, index) => (
                    <li key={index} className={styles.fontUpperC}>
                      {index + 1}. CustomerId: {customer?.customerId || 'N/A'}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Display total purchases per customer */}
          {totalPurchases.length > 0 && (
            <div className={styles.tableContainer}>
              <h3 className={styles.Vtitle}> Total Purchases Per Customer:</h3>
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

          {/* Display revenue per year for every seller */}
          <div className={styles.card}>
            <h3 className={styles.Vtitle}>Revenue Per Year for Every Seller:</h3>
            {Object.entries(revenuePerYearForSellers).map(([year, sellerRevenue]) => (
              <div key={year}>
                <h4>{year}</h4>
                <ul>
                  {Object.entries(sellerRevenue).map(([sellerId, revenue]) => (
                    <tr key={sellerId}>
                      Seller ID: {sellerId}, Revenue: {Number(revenue).toLocaleString()}
                    </tr>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

