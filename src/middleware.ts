import { intlMiddleware, routing } from "./i18n/routing";
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import type { NextRequest } from "next/server";

const { auth } = NextAuth(authConfig) as unknown as {
  auth: (req?: NextRequest) => Response | Promise<Response>;
};

const isPublicPage = ["/", "/login", "/register"];
const publicPathnameRegex = RegExp(
  `^(/(${routing.locales.join("|")}))?(${isPublicPage
    .flatMap((p) => (p === "/" ? ["", "/"] : p))
    .join("|")})/?$`,
  "i",
);

export default function middleware(req: NextRequest) {
  const isPublicRoute = publicPathnameRegex.test(req.nextUrl.pathname);

  return isPublicRoute ? intlMiddleware(req) : auth(req);
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
