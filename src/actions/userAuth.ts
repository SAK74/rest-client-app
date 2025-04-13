"use server";

import { signIn } from "@/auth";
import { auth } from "@/firebase";
import { UserCredentials } from "@/schemas";
import { createUserWithEmailAndPassword } from "firebase/auth";

type ReturnType = Promise<{
  success: boolean;
  message: string;
}>;

export async function login({ email, password }: UserCredentials): ReturnType {
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return { success: true, message: "Loggin successfully" };
  } catch (err) {
    let message = "Loggin error";
    if (err instanceof Error) {
      message = err.message.split("..")[0];
    }
    return { success: false, message };
  }
}

export async function register({
  email,
  password,
}: UserCredentials): ReturnType {
  try {
    const {
      user: { email: createdMail },
    } = await createUserWithEmailAndPassword(auth, email, password);
    return {
      success: true,
      message: `User with email ${createdMail} has been created`,
    };
  } catch (err) {
    let message = "Register error";
    if (err instanceof Error) {
      message = err.message;
    }
    return { success: false, message };
  }
}
