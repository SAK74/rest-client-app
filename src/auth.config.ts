import { AuthError, type NextAuthConfig } from "next-auth";
import github from "next-auth/providers/github";
import credentials from "next-auth/providers/credentials";
import { intlMiddleware } from "./i18n/routing";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase";
import { FirebaseError } from "firebase/app";
import { UserCredentials } from "./schemas";

export const authConfig = {
  pages: { signIn: "/login" },
  trustHost: true,
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
        const { email, password, name } = credentials as UserCredentials;
        if (email && password) {
          try {
            const firebase = await signInWithEmailAndPassword(
              auth,
              email,
              password,
            );
            return { ...firebase.user, name };
          } catch (err) {
            let message = "Firebase error";
            if (err instanceof FirebaseError) {
              message = err.message;
            }
            throw new AuthError(message, { cause: err });
          }
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
  events: {
    signOut() {
      signOut(auth);
    },
  },
} satisfies NextAuthConfig;
