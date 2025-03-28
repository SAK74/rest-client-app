import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import type { NextRequest } from "next/server";

const intlMiddleware = createIntlMiddleware(routing);
const { auth: authMiddleware } = NextAuth(authConfig) as unknown as {
  auth: (req: NextRequest) => Response | Promise<Response>;
};

const publicRoutes = ["/", "/login", "/register"];
const publicPathnameRegex = RegExp(
  `^(/(${routing.locales.join("|")}))?(${publicRoutes
    .flatMap((p) => (p === "/" ? ["", "/"] : p))
    .join("|")})/?$`,
  "i",
);

export default function middleware(req: NextRequest) {
  const isPublicRoute = publicPathnameRegex.test(req.nextUrl.pathname);
  console.log(
    "Middleware, isPublicRoute: ",
    req.nextUrl.pathname,
    isPublicRoute,
  );

  return isPublicRoute ? intlMiddleware(req) : authMiddleware(req);
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
