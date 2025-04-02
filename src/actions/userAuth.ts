"use server";

import { UserCredentials } from "@/app/[locale]/(auth)/_components/FormComponent";
import { signIn } from "@/auth";
import { auth } from "@/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

type ReturnType = Promise<{
  success: boolean;
  message: string;
}>;

export async function login(data: FormData): ReturnType {
  // console.log("In login action: ", data);
  const { email, password } = Object.fromEntries(
    data.entries(),
  ) as UserCredentials;
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
      // redirectTo: callbackUrl || DEFAULT_REDIRECT_AFTER_LOGIN_REGISTER,
    });
    return { success: true, message: "Loggin successfully" };
  } catch (err) {
    console.log("Error logging");
    console.log({ err });
    // TODO: handle errors
    return { success: false, message: "Loggin error" };
  }
}

export async function register(data: FormData): ReturnType {
  // console.log("In register action: ", data);
  const { email, password } = Object.fromEntries(data.entries()) as {
    email: string;
    password: string;
  };
  try {
    const {
      user: { email: createdMail },
    } = await createUserWithEmailAndPassword(auth, email, password);
    // console.log({ createdMail });
    return {
      success: true,
      message: `User with email ${createdMail} has been created`,
    };
  } catch (err) {
    console.log("Error register: ", err);
    return { success: false, message: "Error in user create" };
  }
}
