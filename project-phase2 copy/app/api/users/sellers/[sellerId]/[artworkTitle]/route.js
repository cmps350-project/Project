import userRepo from "@/app/repo/user-repo";

export async function GET(request, { params }) {
    const sellerId = params.sellerId;
    const artworkTitle = params.artworkTitle;
    const artwork = await userRepo.getArtworkBySellerIdAndTitle(sellerId, artworkTitle);
    return Response.json(artwork, { status: 200 })
}