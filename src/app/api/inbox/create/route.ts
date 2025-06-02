import prisma from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export const POST = async (req: Request) => {
  const user = await currentUser();

  try {
    const data = await req.json();

    console.log(data);
    if (!user) {
      return new Response("Unauthorized", {
        status: 401,
      });
    }

    const newInbox = await prisma.inbox.create({
      data: {
        userId: Number(user.publicMetadata.userId),
        subject: data.subject,
        message: data.message,
      },
    });

    return new Response(JSON.stringify(newInbox), {
      status: 200,
    });
  } catch (error) {
    console.error("Error creating post:", error);
    return new Response("Error creating post", {
      status: 500,
    });
  }
};
