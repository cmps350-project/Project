import artworksRepo from "@/app/repo/artwork-repo";

export async function GET(request) {
    const { searchParams } = new URL(request.url)

    let filterType = [...searchParams.keys()][0]
    let value = searchParams.get(filterType)
    console.log(`The filter is ${filterType} and the value is ${value}`);

    let response
    switch (filterType) {
        case 'title':
            response = await artworksRepo.getArtworksByTitle(value)
            break;
        case 'artistname':
            response = await artworksRepo.getArtworksByArtist(value)
            break;
        case 'category':
            response = await artworksRepo.getArtworksByCategory(value)
            break;
        default:
            response = await artworksRepo.getArtworks();
        }
    return Response.json(response, { status: 200 })

}

export async function POST(request) {
    const artwork = await request.json()
    const newArtwork = await artworksRepo.addArtwork(artwork)
    return Response.json(newArtwork)

}