import artworkRepo from "@/app/repo/artwork-repo";

export async function GET(request, { params }) {
    const artworkId = params.artworkId;
    const artwork = await artworkRepo.getArtworkbyId(artworkId);
    return Response.json(artwork, { status: 200 })
}
export async function PUT(request, { params }) {
    const artworkid = params.artworkId;
    const artwork = await request.json()
    const updatedartwork = await artworkRepo.updateArtwork(artworkid, artwork)
    return Response.json(updatedartwork)
}