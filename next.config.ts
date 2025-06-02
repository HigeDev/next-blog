import type { NextConfig } from "next";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

const nextConfig: NextConfig = {
  output: "standalone", // ⬅️ Tambahkan baris ini
};

export default withFlowbiteReact(nextConfig);
