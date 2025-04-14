"use client";

import { UserProfile } from "@clerk/nextjs";
import { useTheme } from "next-themes";

export default function DashProfile() {
  const { theme } = useTheme();
  return (
    <div className="flex justify-center items-center w-full">
      <UserProfile routing="hash" />
    </div>
  );
}
