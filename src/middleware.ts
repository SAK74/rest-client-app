import { intlMiddleware, routing } from "./i18n/routing";
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import type { NextRequest } from "next/server";
import { publicPages } from "./routes";

const { auth } = NextAuth(authConfig) as unknown as {
  auth: (req?: NextRequest) => Response | Promise<Response>;
};

const publicPathnameRegex = RegExp(
  `^(/(${routing.locales.join("|")}))?(${publicPages
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
