import userRepo from "@/app/repo/user-repo";


export async function GET(request) {
    const users = await userRepo.getAllSellers();
    return Response.json(users, { status: 200 })
}
