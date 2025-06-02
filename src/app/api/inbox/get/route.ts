import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/db";

export const POST = async (req: Request) => {
  try {
    const data = await req.json();
    console.log(data);
    const user = await currentUser();
    const whereClause: any = {};
    const limit = parseInt(data.limit) || 9;

    if (!user || !user.publicMetadata.userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    if (data.userId) {
      whereClause.userId = Number(data.userId);
    }
    const inboxes = await prisma.inbox.findMany({
      where: whereClause,
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            profilePicture: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
    });

    const inboxCount = await prisma.inbox.count({
      where: whereClause,
    });

    return new Response(JSON.stringify({ inboxes, inboxCount }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching inbox:", error);
    return new Response("Failed to fetch inbox", { status: 500 });
  }
};
