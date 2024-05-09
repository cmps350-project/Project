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



}
export default new PurchasesRepo()