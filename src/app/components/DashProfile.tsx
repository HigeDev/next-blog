"use client";

import { UserProfile } from "@clerk/nextjs";

export default function DashProfile() {
  return (
    <div className="flex justify-center items-center w-full">
      <UserProfile routing="hash" />
    </div>
  );
}
