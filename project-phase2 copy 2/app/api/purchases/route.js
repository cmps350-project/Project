import purchasesRepo from "@/app/repo/purchases-repo";

export async function POST(request) {
    const purchase = await request.json();
    const { quantity, totalPrice, artworkNo, customerId } = purchase;
    const newPurchase = await purchasesRepo.addPurchase(quantity, totalPrice, artworkNo, customerId);
    return new Response(JSON.stringify(newPurchase), { status: 200 });
}
export async function GET(request) {
    const purchases = await purchasesRepo.getPurchases();
    return Response.json(purchases, { status: 200 })
}
