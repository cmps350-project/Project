import userRepo from "@/app/repo/user-repo";

export async function GET(request, { params }) {
    const userId = params.customerId;
    const customer = await userRepo.getCustomerByUserId(userId);
    return Response.json(customer, { status: 200 })
}

export async function PUT(request, { params }) {
    const customerid = params.customerId;
    const customer = await request.json()
    const updatedCustomer = await userRepo.updateCustomer(customerid, customer)
    return Response.json(updatedCustomer)
}