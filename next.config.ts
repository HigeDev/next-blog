import type { NextConfig } from "next";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

const nextConfig: NextConfig = {
  output: "standalone", // ⬅️ Tambahkan baris ini
  images: {
    domains: ["img.clerk.com"],
  },
};

export default withFlowbiteReact(nextConfig);
