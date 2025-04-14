import { auth } from "@/auth";
import Form from "../_components/FormComponent";
import { redirect } from "next/navigation";

export default async function RegisterPage() {
  if (await auth()) {
    redirect("/");
  }
  return <Form formType="register" />;
}
