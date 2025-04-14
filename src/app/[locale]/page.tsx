import { auth } from "@/auth";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

export default async function Home() {
  const session = await auth();
  const t = await getTranslations("Welcome_Page");
  return (
    <div className="text-center py-12">
      {session ? (
        <>
          <h1>
            {t("welcome")}, {session.user?.name}!
          </h1>
          <h2>{t("navi")}</h2>
          <div className="mt-6 space-x-6">
            <Link href={"/client"}>REST {t("client")}</Link>
            <Link href={"/history"}>{t("history")}</Link>
            <Link href={"/variables"}>{t("variables")}</Link>
          </div>
        </>
      ) : (
        <>
          <h1>{t("welcome")}!</h1>
          <h2>{t("must_log_in")}... </h2>
          <div className="mt-6 space-x-6">
            <Link href={"/login"}>{t("login")}</Link>
            <Link href={"/register"}>{t("signup")}</Link>
          </div>
        </>
      )}
    </div>
  );
}
