import prisma from "@/lib/db";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { clerkClient } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    const evt = await verifyWebhook(req);
    if (evt.type === "user.created" || evt.type === "user.updated") {
      const {
        id,
        email_addresses,
        first_name,
        last_name,
        image_url,
        username,
      } = evt.data;
      try {
        const newUser = await prisma.user.upsert({
          where: { email: email_addresses[0].email_address },
          update: {
            firstName: first_name,
            lastName: last_name,
            profilePicture: image_url,
            username: username,
          },
          create: {
            clerkUserId: id,
            email: email_addresses[0].email_address,
            firstName: first_name,
            lastName: last_name,
            profilePicture: image_url,
            username: username,
          },
        });
        const client = await clerkClient();
        if (newUser && evt.type === "user.created") {
          try {
            await client.users.updateUserMetadata(id, {
              publicMetadata: {
                userId: newUser.id,
                isAdmin: newUser.isAdmin,
              },
            });
          } catch (error) {
            console.log("Error updating user metadata:", error);
          }
        }
        return new Response(JSON.stringify(newUser), { status: 201 });
      } catch (error) {
        console.error("Error: Failed to store event in the database:", error);
        return new Response("Error: Failed to store event in the database", {
          status: 500,
        });
      }
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
