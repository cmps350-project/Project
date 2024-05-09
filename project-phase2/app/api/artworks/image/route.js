import artworksRepo from "@/app/repo/artwork-repo";

export async function POST(request) {
    const img = await request.json()
    const newImg = await artworksRepo.addArtworkImage(img)
    return Response.json(newImg)

}