import prisma from "@/lib/db";

export const POST = async (req: Request) => {
  try {
    const data = await req.json();
    console.log(data);

    const startIndex = parseInt(data.startIndex) || 0;
    const limit = parseInt(data.limit) || 9;
    const sortDirection = data.order === "asc" ? "asc" : "desc";

    const whereClause: any = {};

    if (data.userId) {
      whereClause.userId = Number(data.userId);
    }

    if (
      data.category &&
      data.category !== "null" &&
      data.category !== "undefined"
    ) {
      whereClause.category = data.category;
    }

    if (data.slug) {
      whereClause.slug = data.slug;
    }

    if (data.postId) {
      whereClause.id = Number(data.postId);
    }

    if (data.searchTerm) {
      whereClause.OR = [
        { title: { contains: data.searchTerm, mode: "insensitive" } },
        { content: { contains: data.searchTerm, mode: "insensitive" } },
      ];
    }

    const posts = await prisma.post.findMany({
      where: whereClause,
      orderBy: { updatedAt: sortDirection },
      skip: startIndex,
      take: limit,
    });

    const totalPosts = await prisma.post.count();

    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthPosts = await prisma.post.count({
      where: {
        createdAt: { gte: oneMonthAgo },
      },
    });

    return new Response(JSON.stringify({ posts, totalPosts, lastMonthPosts }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error getting posts:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
