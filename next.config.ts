import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // تجاهل جميع أخطاء ESLint أثناء البناء
    ignoreDuringBuilds: true,
  },
  typescript: {
    // تجاهل جميع أخطاء TypeScript أثناء البناء
    ignoreBuildErrors: true,
  },
  // لإنشاء نسخة ثابتة
  output: "export",
  trailingSlash: true,
  // تجاهل تحذيرات الصور
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
