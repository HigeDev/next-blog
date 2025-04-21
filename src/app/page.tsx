import prisma from "@/lib/db";
import React from "react";

export default async function Home() {
  const users = await prisma.user.findMany();
  return (
    <div>
      <h1>Hello Worlddd</h1>
      {JSON.stringify(users)}
    </div>
  );
}
