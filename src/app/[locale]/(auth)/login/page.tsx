import { auth } from "@/auth";
import Form from "../_components/FormComponent";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  if (await auth()) {
    redirect("/");
  }
  return <Form formType="login" />;
}
