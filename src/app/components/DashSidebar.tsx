"use client";

import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";
import {
  HiUser,
  HiArrowSmRight,
  HiDocumentText,
  HiUserGroup,
  HiChartPie,
} from "react-icons/hi";
import { GrTask } from "react-icons/gr";
import { useEffect, useState, Suspense, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { SignOutButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

// Komponen khusus untuk baca search param
function TabReader({ onTabChange }: { onTabChange: (tab: string) => void }) {
  const searchParams = useSearchParams();
  const tabFromUrl = searchParams.get("tab") || "";

  useEffect(() => {
    onTabChange(tabFromUrl);
  }, [tabFromUrl, onTabChange]);

  return null;
}

export default function DashSidebar() {
  const [tab, setTab] = useState("");
  const { user, isSignedIn } = useUser();

  const handleTabChange = useCallback((newTab: string) => {
    setTab(newTab);
  }, []);

  if (!isSignedIn) return null;

  return (
    <Sidebar className="w-full md:w-56">
      <Suspense fallback={null}>
        <TabReader onTabChange={handleTabChange} />
      </Suspense>

      <SidebarItems>
        <SidebarItemGroup className="flex flex-col gap-1">
          <SidebarItem
            as="a"
            href="/dashboard?tab=dash"
            active={tab === "dash" || !tab}
            icon={HiChartPie}
          >
            Dashboard
          </SidebarItem>

          <Link href="/dashboard?tab=profile">
            <SidebarItem
              active={tab === "profile"}
              icon={HiUser}
              label={user?.publicMetadata?.isAdmin ? "Admin" : "User"}
              labelColor="dark"
              as="div"
            >
              Profile
            </SidebarItem>
          </Link>
          {user?.publicMetadata?.isAdmin ? (
            <Link href="/dashboard?tab=posts">
              <SidebarItem
                active={tab === "posts"}
                icon={HiDocumentText}
                as="div"
              >
                Posts
              </SidebarItem>
            </Link>
          ) : null}
          {user?.publicMetadata?.isAdmin ? (
            <Link href="/dashboard?tab=projects">
              <SidebarItem active={tab === "projects"} icon={GrTask} as="div">
                Projects
              </SidebarItem>
            </Link>
          ) : null}
          {user?.publicMetadata?.isAdmin ? (
            <Link href="/dashboard?tab=users">
              <SidebarItem active={tab === "users"} icon={HiUserGroup} as="div">
                Users
              </SidebarItem>
            </Link>
          ) : null}
          <SidebarItem icon={HiArrowSmRight} className="cursor-pointer">
            <SignOutButton />
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
}
