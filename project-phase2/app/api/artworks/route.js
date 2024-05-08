import artworksRepo from "@/app/repo/artwork-repo";


export async function GET(request) {
    const artworks = await artworksRepo.getArtworks();
    return Response.json(artworks, { status: 200 })
}

export async function POST(request) {
    const artwork = await request.json()
    const newArtwork = await artworksRepo.addArtwork(artwork)
    return Response.json(newArtwork)

}