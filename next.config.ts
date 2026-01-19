import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  disable: false,
  workboxOptions: {
    disableDevLogs: true,
  },
});

const nextConfig: NextConfig = {
  // Stagehand를 번들링에서 제외하여 Node.js 네이티브 모듈로 실행되게 함
  serverExternalPackages: ["@browserbasehq/stagehand", "pino-pretty"],
};

export default withPWA(nextConfig);
