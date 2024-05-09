import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

class ArtworkRepo {

    async addArtwork(artwork) {
        try {
            return prisma.artwork.create({
                data: artwork
            })
        } catch (error) {
            return {
                error: error.message
            }
        }
    }

    async addArtworkImage(image) {
        try {
            return prisma.image.create({
                data: image
            })
        } catch (error) {
            return {
                error: error.message
            }
        }
    }

    async getArtworks() {
        try {
          return prisma.artwork.findMany({
            include: {
              artist: {
                select: { name: true } 
              },
              image: {
                select: { image_url: true, alternate_url: true } 
              }
            }
          });
        } catch (error) {
          return {
            error: error.message
          };
        }
      }

      async getArtworksByTitle(title) {
        try {
            const normalizedName = title.toLocaleLowerCase();
          return prisma.artwork.findMany({
            where: {
                title: { 
                    contains: normalizedName 
                  },
            },
            include: {
                artist: {
                    select: { name: true } 
                  },
                  image: {
                    select: { image_url: true, alternate_url: true } 
                  }
            }
          });
        } catch (error) {
          return { error: error.message };
        }
      }
      
      async getArtworksByArtist(artistName) {
        try {
          const normalizedName = artistName.toLocaleLowerCase();
          return prisma.artwork.findMany({
            where: {
              artist: {
                name: { 
                  contains: normalizedName 
                },
              },
            },
            include: {
                artist: {
                    select: { name: true } 
                  },
                  image: {
                    select: { image_url: true, alternate_url: true } 
                  }
            }
          });
        } catch (error) {
          return { error: error.message };
        }
      }
      
      async getArtworksByCategory(category) {
        const normalizedName = category.toLocaleLowerCase();
        try {
          return prisma.artwork.findMany({
            where: {
                category: { 
                    contains: normalizedName 
                  },
            },
            include: {
                artist: {
                    select: { name: true } 
                  },
                  image: {
                    select: { image_url: true, alternate_url: true } 
                  }
            },
          });
        } catch (error) {
          return { error: error.message };
        }
      }
      

    async getImages() {
        try {
            return prisma.image.findMany()
        } catch (error) {
            return {
                error: error.message
            }
        }
    }
    async getArtworkbyId(id) {
      try {
          return prisma.artwork.findUnique({
              where: { artworkNo: id },
              include: {
                  artist: {
                      select: { name: true }
                  },
                  image: {
                      select: { image_url: true, alternate_url: true }
                  }
              }
          })
      } catch (error) {
          return { error: error.message };
      }
  }

  async getTop3ProductsLast6Months() {
    try {
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  
      const topPurchases = await prisma.purchase.findMany({
        where: {
          purchaseDate: {
            gte: sixMonthsAgo
          }
        },
        orderBy: {
          totalPrice: 'desc'
        },
        take: 3,
        include: {
          artwork: true
        }
      });

      return topPurchases.map(purchase => purchase.artwork);
    } catch (error) {
      console.error("Error fetching top 3 products over the last 6 months:", error);
      throw error;
    }
  }
  
  

  //statistics
  async getAverageQuantitySoldPerArtwork() {
    try {
      const averageQuantity = prisma.purchase.aggregate({
        _avg: { quantity: true }
      });
      return averageQuantity;
    } catch (error) {
      console.error("Error fetching average quantity sold per artwork:", error);
      throw error;
    }
  }

  async  getMostPopularCategoryByQuantitySold() {
    try {
      const mostPopularCategory =  prisma.artwork.groupBy({
        by: ['category'],
        _sum: { quantity: true },
        orderBy: {
          _sum: {
            quantity: 'desc'
          }
        },
        take: 3
      });
      return mostPopularCategory;
    } catch (error) {
      console.error('Error fetching artwork data:', error);
      throw error;
    }
  }

  
  

}

export default new ArtworkRepo()