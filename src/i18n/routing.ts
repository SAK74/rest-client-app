import { defineRouting } from "next-intl/routing";
import createIntlMiddleware from "next-intl/middleware";

export const routing = defineRouting({
  locales: ["en", "pl"] as const,
  defaultLocale: "en",
  localeDetection: false,
});

export const intlMiddleware = createIntlMiddleware(routing);
