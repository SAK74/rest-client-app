import { type NextAuthConfig } from "next-auth";
import github from "next-auth/providers/github";
import credentials from "next-auth/providers/credentials";
import { intlMiddleware } from "./i18n/routing";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase";

export const authConfig = {
  pages: { signIn: "/login" },
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
        // console.log("In auth authorize: ", credentials);
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        if (email && password) {
          try {
            const firebase = await signInWithEmailAndPassword(
              auth,
              email,
              password,
            );
            return firebase.user;
          } catch (err) {
            console.log("Firebase error:");
            console.log(err);
            return null;
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
      // console.log("Sign OUT");
      // console.log(message);
      signOut(auth);
      // console.log("--------------");
    },
  },
} satisfies NextAuthConfig;
