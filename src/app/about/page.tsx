import React from "react";
import { clerkClient } from "@clerk/nextjs/server";

export default function About() {
  console.log(typeof clerkClient);
  return (
    <div>
      <h1>About</h1>
    </div>
  );
}
