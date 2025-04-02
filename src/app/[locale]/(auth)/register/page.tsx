import { Link } from "@/i18n/navigation";
import Form from "../_components/FormComponent";

export default function RegisterPage() {
  return (
    <div className="border border-">
      <h2>Register page</h2>
      <Form formType="register" />
      <Link href={"/login"}>Have you accaunt? Login.</Link>
    </div>
  );
}
