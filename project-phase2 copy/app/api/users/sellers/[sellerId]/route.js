import userRepo from "@/app/repo/user-repo";

export async function GET(request, { params }) {
    const sellerId = params.sellerId;
    const seller = await userRepo.getSellerByUserId(sellerId);
    return Response.json(seller, { status: 200 })
}
