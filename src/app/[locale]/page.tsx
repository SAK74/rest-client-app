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
          <h1 className="text-4xl pb-2">
            {t("welcome")}, {session.user?.name}!
          </h1>
          <h2 className="text-lg font-bold">{t("navi")}</h2>
          <div className="mt-6 space-x-6 font-bold pb-20">
            <Link href={"/client"}>REST {t("client")}</Link>
            <Link href={"/history"}>{t("history")}</Link>
            <Link href={"/variables"}>{t("variables")}</Link>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-4xl pb-2">{t("welcome")}!</h1>
          <p className="pb-20 text-lg italic">{t("project_description")}</p>
          <p className="text-lg">{t("must_log_in")}... </p>
          <div className="mt-6 space-x-6">
            <Link href={"/login"}>{t("login")}</Link>
            <Link href={"/register"}>{t("signup")}</Link>
          </div>
        </>
      )}
    </div>
  );
}
