import { auth } from "@/auth";
import { redirect } from "@/i18n/navigation";
import dynamic from "next/dynamic";

const VariablesClient = dynamic(() => import("./VariablesClient"), {
  loading: () => <p>Loading variables...</p>,
});

export default async function VariablesPage({
  params,
}: {
  params: { locale: string };
}) {
  const session = await auth();
  if (!session) {
    redirect({
      href: "/login",
      locale: params.locale,
    });
  }

  return <VariablesClient />;
}
