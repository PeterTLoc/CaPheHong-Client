import type { NextConfig } from "next";

const nextConfig: NextConfig = {


  /* config options here */
 eslint: {
    // Bỏ qua mọi lỗi ESLint khi build
    ignoreDuringBuilds: true,
  },
  /* các config khác */

};

export default nextConfig;
