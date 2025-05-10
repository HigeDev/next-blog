import prisma from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export const POST = async (req: Request) => {
  const user = await currentUser();

  try {
    const data = await req.json();

    if (!user?.publicMetadata?.isAdmin) {
      return new Response("Unauthorized", { status: 401 });
    }

    const startIndex = parseInt(data.startIndex) || 0;
    const limit = parseInt(data.limit) || 9;
    const sortDirection = data.sort === "asc" ? "asc" : "desc";

    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: sortDirection,
      },
      skip: startIndex,
      take: limit,
    });

    const totalUsers = await prisma.user.count();

    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthUsers = await prisma.user.count({
      where: {
        createdAt: {
          gte: oneMonthAgo,
        },
      },
    });

    return new Response(JSON.stringify({ users, totalUsers, lastMonthUsers }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error getting the users:", error);
    return new Response("Error getting the users", { status: 500 });
  }
};
