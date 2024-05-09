import userRepo from "@/app/repo/user-repo";

export async function GET(request, { params }) {
    const adminId = params.adminId;
    const admin = await userRepo.getAdminByUserId(adminId);
    return Response.json(admin, { status: 200 })
}