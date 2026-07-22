import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// Points at the default request config location: ./i18n/request.ts
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // Emit a self-contained server build for Docker (see Dockerfile).
  output: "standalone",
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Cloudflare R2 public bucket. The host is derived from the public R2 URL
    // (NEXT_PUBLIC_R2_PUBLIC_URL), e.g. https://pub-xxxx.r2.dev or a custom CDN
    // domain mapped to the bucket. Add/adjust patterns as the domain is finalized.
    remotePatterns: [
      // {
      //   protocol: "https",
      //   hostname: "pub-xxxxxxxx.r2.dev",
      // },
      // {
      //   protocol: "https",
      //   hostname: "cdn.ebiresources.co.id",
      // },
    ],
  },
};

export default withNextIntl(nextConfig);
