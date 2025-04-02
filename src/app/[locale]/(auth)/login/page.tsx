import { Link } from "@/i18n/navigation";
import Form from "../_components/FormComponent";

export default async function LoginPage({}: {
  params: Promise<unknown>;
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  // console.log({ params: await params, searchParams: await searchParams });

  return (
    <div className="border border-">
      <h2>Login page</h2>
      <Form formType="login" />
      <Link href={"/register"}>Don&apos;t have account? Register. </Link>
    </div>
  );
}
