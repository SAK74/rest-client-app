import { type NextAuthConfig } from "next-auth";
import github from "next-auth/providers/github";
import credentials from "next-auth/providers/credentials";
import { intlMiddleware } from "./i18n/routing";

export const authConfig = {
  providers: [
    github({
      clientId: process.env.GH_CLIENT_ID,
      clientSecret: process.env.GH_CLIENT_SECRET,
    }),
    credentials({
      credentials: {
        email: { label: "email", type: "text", placeholder: "email" },
        password: {
          label: "password",
          type: "password",
          placeholder: "password",
        },
      },
      authorize: async (credentials) => {
        const { email } = credentials as { email: string; password: string };
        if (email) {
          return { email };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = Boolean(auth);
      if (isLoggedIn) {
        return intlMiddleware(request);
      }
      return Boolean(auth);
    },
  },
} satisfies NextAuthConfig;
