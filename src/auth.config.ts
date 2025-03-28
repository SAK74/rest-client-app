import { type NextAuthConfig } from "next-auth";
import github from "next-auth/providers/github";

export const authConfig = {
  providers: [
    github({
      clientId: process.env.GH_CLIENT_ID,
      clientSecret: process.env.GH_CLIENT_SECRET,
    }),
  ],
} satisfies NextAuthConfig;
