import userRepo from "@/app/repo/user-repo";

export async function GET(request, { params }) {
    try {
        if (!params || !params.details) {
            return new Response("Invalid request: Details not provided", { status: 400 });
        }

        const userInfo = params.details.split(",");
        if (userInfo.length !== 2) {
            return new Response("Invalid request: Details should contain username and password separated by comma", { status: 400 });
        }

        const [username, password] = userInfo;
        if (!username || !password) {
            return new Response("Invalid request: Username or password is missing", { status: 400 });
        }

        const user = await userRepo.getUserByUsernameAndPassword(username, password);
        if (!user) {
            return new Response("User not found", { status: 404 });
        }

        return new Response(JSON.stringify(user), { status: 200, headers: { "Content-Type": "application/json" } });
    } catch (error) {
        console.error("Error:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}
