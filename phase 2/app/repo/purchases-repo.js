import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

class PurchasesRepo {
    async addPurchase(quantity, totalPrice, artworkNo, customerId) {
        try {
          const purchase = await prisma.purchase.create({
            data: {
              quantity: quantity,
              totalPrice: totalPrice,
              artworkNo: artworkNo,
              customerId: customerId,
            }
          })
          return purchase;
        } catch (error) {
          throw new Error(`Error adding purchase: ${error}`);
        }
      }
      async getPurchases(){
        try {
            return await prisma.purchase.findMany()
          } catch (error) {
            return {
              error: error.message
            };
          }
        }

      //statistics
      async getTotalPurchasesPerCustomer() {
        try {
          const totalPurchases = prisma.purchase.groupBy({
            by: ['customerId'],
            _count: true
          });
          return totalPurchases;
        } catch (error) {
          console.error("Error fetching total purchases per customer:", error);
          throw error;
        }
      }
      async getPurchasesByCustomerId(customerId) {
        try {
          const customerPurchases = await prisma.purchase.findMany({
            where: {
              customerId: customerId
            },
            include: {
              artwork: {
                include: {
                  image: true 
                }
              }
            }
          });
          return customerPurchases;
        } catch (error) {
          console.error('Error fetching purchases for customer:', error);
          throw error;
        }
      }
      

      
      
      


}

export default new PurchasesRepo()