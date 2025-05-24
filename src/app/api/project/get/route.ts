import prisma from "@/lib/db";

export const POST = async (req: Request) => {
  try {
    const data = await req.json();
    console.log(data);

    const startIndex = parseInt(data.startIndex) || 0;
    const limit = parseInt(data.limit) || 9;
    const sortDirection = data.order === "asc" ? "asc" : "desc";

    const whereClause: any = {};

    if (data.slug) {
      whereClause.slug = data.slug;
    }

    if (data.projectId) {
      whereClause.id = Number(data.projectId);
    }

    const totalProjects = await prisma.project.count();

    const allProjects = await prisma.project.findMany({
      include: {
        project_images: true,
        project_skill: true,
      },
      where: whereClause,
      orderBy: { updatedAt: sortDirection },
      skip: startIndex,
      take: limit,
    });
    console.log(allProjects);

    return new Response(JSON.stringify({ totalProjects, allProjects }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error getting posts:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
