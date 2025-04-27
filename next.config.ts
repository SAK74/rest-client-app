import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.0.54", "192.168.0.55", "192.168.0.56"],
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
