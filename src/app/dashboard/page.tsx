"use client";

import { useEffect, useState, Suspense, useCallback } from "react";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";
import DashPosts from "../components/DashPosts";
import DashProjects from "../components/DashProjects";
import DashUsers from "../components/DashUsers";
import DashboardComp from "../components/DashboardComp";
import { useSearchParams } from "next/navigation";
import DashInboxes from "../components/DashInboxes";

// Komponen kecil untuk ambil nilai tab dari searchParams
function TabReader({ onTabChange }: { onTabChange: (tab: string) => void }) {
  const searchParams = useSearchParams();
  const tabFromUrl = searchParams.get("tab") || "";

  useEffect(() => {
    onTabChange(tabFromUrl);
  }, [tabFromUrl, onTabChange]);

  return null;
}

export default function Dashboard() {
  const [tab, setTab] = useState("");

  const handleTabChange = useCallback((newTab: string) => {
    setTab(newTab);
  }, []);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <Suspense fallback={null}>
        <TabReader onTabChange={handleTabChange} />
      </Suspense>

      <div className="md:w-56">
        {/* Sidebar */}
        <DashSidebar />
      </div>

      {/* Konten berdasarkan tab */}
      {tab === "profile" && <DashProfile />}
      {tab === "posts" && <DashPosts />}
      {tab === "projects" && <DashProjects />}
      {tab === "users" && <DashUsers />}
      {tab === "inboxes" && <DashInboxes />}
      {tab === "dash" && <DashboardComp />}
    </div>
  );
}
