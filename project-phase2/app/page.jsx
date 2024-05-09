import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
import artworkRepo from '@/app/repo/artwork-repo'
import Artworks from '@/app/artworks/Artworks'


export default async function Home() {
  const artworks = await artworkRepo.getArtworks()

  return (
    <>
    <Artworks initialArtworks={artworks}> </Artworks>

    </>

  )
}
