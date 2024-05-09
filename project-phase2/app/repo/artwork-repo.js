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

    async getImages() {
        try {
            return prisma.image.findMany()
        } catch (error) {
            return {
                error: error.message
            }
        }
    }


}

export default new ArtworkRepo()