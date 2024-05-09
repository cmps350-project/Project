import purchasesRepo from "@/app/repo/purchases-repo";

export async function POST(request) {
    const purchase = await request.json()
    const newpurchase = await purchasesRepo.addPurchase(purchase)
    return Response.json(newpurchase)

}
export async function GET(request) {
    const purchases = await purchasesRepo.getPurchases();
    return Response.json(purchases, { status: 200 })
}
