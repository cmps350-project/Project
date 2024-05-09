import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

class PurchasesRepo {

    //for statistics
    async getTotalPurchasesPerProductPerYear() {
        try {
          const purchases = await prisma.purchase.groupBy({
            by: ['artworkNo', { purchaseDate: { year: true } }],
            _sum: { totalPrice: true }
          });
          return purchases;
        } catch (error) {
          console.error("Error fetching total purchases per product per year:", error);
          throw error;
        }
      }

      //statistics
      async getAveragePurchaseAmountPerCustomer() {
        try {
          const averageAmount = await prisma.purchase.aggregate({
            _avg: { totalPrice: true }
          });
          return averageAmount;
        } catch (error) {
          console.error("Error fetching average purchase amount per customer:", error);
          throw error;
        }
      }

      //statistics
      async getTotalPurchasesPerCustomer() {
        try {
          const totalPurchases = await prisma.purchase.groupBy({
            by: ['customerId'],
            _count: true
          });
          return totalPurchases;
        } catch (error) {
          console.error("Error fetching total purchases per customer:", error);
          throw error;
        }
      }

      





}
export default new PurchasesRepo()