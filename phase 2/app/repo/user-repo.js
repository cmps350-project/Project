import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

class UserRepo {

    async getSellerByUserId(userId) {
        try {
          return await prisma.seller.findUnique({
            where: {
              userId: userId,
            },
            include: {
              bankAccount: true,
              Artworks: true,
            },
          });
        } catch (error) {
          console.error("error fetching seller:", error);
          throw error;
        }
      }

      async getCustomerByUserId(userId) {
        try {
          return await prisma.customer.findUnique({
            where: { userId },
            include: { Purchases: true }, 
          });
        } catch (error) {
          console.error("Error fetching customer:", error);
          throw error;
        }
      }

      async getAdminByUserId(userId) {
        try {
          return await prisma.admin.findUnique({
            where: { userId },
          });
        } catch (error) {
          console.error("Error fetching admin:", error);
          throw error;
        }
      }

      async getArtworkBySellerIdAndTitle(sellerId, artworkTitle) {
        try {
          const artwork = await prisma.artwork.findFirst({
            where: {
              AND: [
                { artistId: sellerId },
                { title: artworkTitle },
              ],
            },
          });
    
          return artwork;
        } catch (error) {
          console.error('Error fetching artwork:', error);
          throw error;
        }
      }


        async  getAllUsers() {
        try {
          const customers = await prisma.customer.findMany();
          const sellers = await prisma.seller.findMany();
          const admins = await prisma.admin.findMany();
      
          return [...customers, ...sellers, ...admins];
        } catch (error) {
          console.error("Error fetching all users:", error);
          throw error;
        }
      }

      async  getAllCustomers() {
        try {
          return await prisma.customer.findMany();
        } catch (error) {
          console.error("Error fetching customers:", error);
          throw error;
        }
      }
      
      async getAllAdmins() {
        try {
          return await prisma.admin.findMany();
        } catch (error) {
          console.error("Error fetching admins:", error);
          throw error;
        }
      }
      
      async getAllSellers() {
        try {
          return await prisma.seller.findMany();
        } catch (error) {
          console.error("Error fetching sellers:", error);
          throw error;
        }
      }

      //for statistics
      async getTotalCustomers() {
        try {
          const totalCustomers = await prisma.customer.count();
          return totalCustomers;
        } catch (error) {
          console.error("Error fetching total customers:", error);
          throw error;
        }
      }
      async getTotalSellers() {
        try {
          const totalSellers = await prisma.seller.count();
          return totalSellers;
        } catch (error) {
          console.error("Error fetching total sellers:", error);
          throw error;
        }
      }
      
      

      async getUserByUsernameAndPassword(username, password) {
        try {
          // Check if the user exists in the customer model
          const customer = await prisma.customer.findFirst({
            where: {
              AND: [
                { username: username },
                { password: password }
              ]
            },
            select: {
              userId: true
            }
          });
      
          if (customer) {
            return customer.userId;
          }
      
          //Check if the user exists in the seller model
          const seller = await prisma.seller.findFirst({
            where: {
              AND: [
                { username: username },
                { password: password }
              ]
            },
            select: {
              userId: true
            }
          });
      
          if (seller) {
            return seller.userId;
          }
      
          //Check if the user exists in the admin model
          const admin = await prisma.admin.findFirst({
            where: {
              AND: [
                { username: username },
                { password: password }
              ]
            },
            select: {
              userId: true
            }
          });
      
          if (admin) {
            return admin.userId;
          }
      
          //If the user is not found in any model, return null
          return null;
        } catch (error) {
          console.error("Error fetching user:", error);
          throw error;
        }
      }

      async updateCustomer(userId, updatedFields) {
        try {
          return await prisma.customer.update({
            where: { userId: userId },
            data: updatedFields,
          });
        } catch (error) {
          console.error('Error updating customer:', error);
          throw error;
        }
      }

      //statistics
      async  getTopNSpendingCustomers(n) {
        try {
          const topCustomers =  prisma.purchase.groupBy({
            by: ['customerId'],
            orderBy: {
              _sum: {
                totalPrice: 'desc', 
              },
            },
            take: n,
          });
      
          return topCustomers;
        } catch (error) {
          console.error('Error fetching purchase data:', error);
          throw error;
        }
      }

      async getTopNSpendingCustomersInYear(n, year) {
        try {
          const topCustomers = await prisma.purchase.groupBy({
            by: ['customerId'],
            where: {
              AND: [
                {
                  purchaseDate: {
                    gte: new Date(year, 0, 1), // Start of the given year
                    lt: new Date(year + 1, 0, 1) // Start of the next year
                  }
                }
              ]
            },
            orderBy: {
              _sum: {
                totalPrice: 'desc'
              }
            },
            take: n
          });
      
          return topCustomers;
        } catch (error) {
          console.error('Error fetching top spending customers:', error);
          throw error;
        }
      }
      async getCustomerDetails(userId) {
        try {
          const customerDetails = await prisma.customer.findUnique({
            where: { userId },
            select: { moneyBalance: true, shippingAddress: true }
          });
          return customerDetails;
        } catch (error) {
          console.error("Error fetching customer details:", error);
          throw error;
        }
      }
      async  getRevenuePerYearForSellers() {
        try {
          const purchases = await prisma.purchase.findMany({
            include: {
              artwork: {
                include: {
                  artist: true,
                },
              },
            },
          });
      
          const revenuePerYearForSellers = {};
          
          purchases.forEach((purchase) => {
            const year = new Date(purchase.purchaseDate).getFullYear();
            const sellerId = purchase.artwork.artist.userId;
            const totalPrice = purchase.totalPrice;
      
            if (!revenuePerYearForSellers[year]) {
              revenuePerYearForSellers[year] = {};
            }
            if (!revenuePerYearForSellers[year][sellerId]) {
              revenuePerYearForSellers[year][sellerId] = 0;
            }
            revenuePerYearForSellers[year][sellerId] += Number(totalPrice);
          });
      
          return revenuePerYearForSellers;
        } catch (error) {
          console.error('Error:', error);
          throw error;
        }
      }
      
      
}

export default new UserRepo()