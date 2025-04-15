import { Suspense } from "react";
import DashboardClient from "./DashboardClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardClient />
    </Suspense>
  );
}
