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

      async getUserByUsername(username) {
        try {
          //find by username across all user types
          const user = await prisma.$queryRaw`
            SELECT * FROM (
              SELECT * FROM customer WHERE username = ${username}
              UNION ALL
              SELECT * FROM seller WHERE username = ${username}
              UNION ALL 
              SELECT * FROM admin WHERE username = ${username}
            ) AS users
            LIMIT 1;
          `;
          return user[0]; 
        } catch (error) {
          console.error("Error fetching user by username:", error);
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
      
  
}

export default new UserRepo()