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
            return prisma.artwork.findMany()
        } catch (error) {
            return {
                error: error.message
            }
        }
    }

    async getArtworksWithArtists() {
        try {
          return await prisma.artwork.findMany({
            include: {
              artist: {
                select: { name: true } 
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