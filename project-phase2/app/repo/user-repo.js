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
          console.error("Error fetching seller:", error);
          throw error;
        }
      }
      
  
}

export default new UserRepo()