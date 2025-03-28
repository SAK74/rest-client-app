import { auth } from "@/auth";
import { redirect } from "@/i18n/navigation";
import { getLocale, getTranslations } from "next-intl/server";

export default async function Home() {
  const session = await auth();
  const locale = await getLocale();
  if (session) {
    redirect({ href: "/client", locale });
  }
  const t = await getTranslations("Welcome_Page");
  return (
    <div className="text-center py-12">
      <p>{t("tittle")}</p>
    </div>
  );
}
