import artworkRepo from "@/app/repo/artwork-repo";

export async function GET(request, { params }) {
    const artworkId = params.artworkId;
    const artwork = await artworkRepo.getArtworkbyId(artworkId);
    return Response.json(artwork, { status: 200 })
}