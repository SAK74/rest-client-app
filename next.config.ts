import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const allowedDevOrigins = new Array(9)
  .fill("")
  .map((_, i) => `192.168.0.5${i + 1}`);

const nextConfig: NextConfig = {
  allowedDevOrigins,
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
