import userRepo from "@/app/repo/user-repo";

export async function GET(request, { params }) {
    const userId = params.customerId;
    const customer = await userRepo.getCustomerByUserId(userId);
    return Response.json(customer, { status: 200 })
}