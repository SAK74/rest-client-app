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
    console.log("Error logging");
    console.log({ err });
    // TODO: handle errors
    return { success: false, message: "Loggin error" };
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
    console.log("Error register: ", err);
    return { success: false, message: "Error in user create" };
  }
}
