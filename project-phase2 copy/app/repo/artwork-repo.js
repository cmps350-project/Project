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
          return await prisma.artwork.findMany({
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
          return await prisma.artwork.findMany({
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
          return await prisma.artwork.findMany({
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
          return await prisma.artwork.findMany({
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

  //for statistics
  async getTop3ProductsLast6Months() {
    try {
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  
      const topProducts = await prisma.purchase.groupBy({
        by: ['artworkNo'],
        where: {
          purchaseDate: {
            gte: sixMonthsAgo
          }
        },
        orderBy: {
          _count: {
            totalPrice: 'desc'
          }
        },
        take: 3
      });
      return topProducts;
    } catch (error) {
      console.error("Error fetching top 3 products over the last 6 months:", error);
      throw error;
    }
  }

  //statistics
  async getMostPopularCategories() {
    try {
      const popularCategories = await prisma.artwork.groupBy({
        by: ['category'],
        _count: true,
        orderBy: {
          _count: 'desc'
        }
      });
      return popularCategories;
    } catch (error) {
      console.error("Error fetching most popular categories of artworks:", error);
      throw error;
    }
  }

  //statistics
  async getAverageQuantitySoldPerArtwork() {
    try {
      const averageQuantity = await prisma.purchase.aggregate({
        _avg: { quantity: true }
      });
      return averageQuantity;
    } catch (error) {
      console.error("Error fetching average quantity sold per artwork:", error);
      throw error;
    }
  }

}

export default new ArtworkRepo()