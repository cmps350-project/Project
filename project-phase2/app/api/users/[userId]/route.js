import userRepo from "@/app/repo/user-repo";

export async function GET(request, { params }) {
    const userId = params.userId;
    const user = await userRepo.getUserByUsername(userId);
    return Response.json(user, { status: 200 })
}