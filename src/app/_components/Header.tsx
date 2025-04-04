"use client";

import { useSession } from "next-auth/react";
import { useLocale } from "next-intl";
import { useTranslations } from "use-intl";
import { signOut } from "next-auth/react";
import LangSwitcher from "./LangSwitcher";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import dynamic from "next/dynamic";

const ThemeChanger = dynamic(() => import("./ThemeChanger"), { ssr: false });

export default function Header() {
  const t = useTranslations("Header");
  const locale = useLocale();
  const { status } = useSession();

  const onLogout = () => {
    signOut({ redirectTo: `/${locale}` });
  };

  return (
    <header className="flex justify-center items-center px-4 py-2">
      <h3 className="grow text-center">{t("tittle")}</h3>
      <span className="flex gap-4 items-center">
        {status === "authenticated" ? (
          <Button variant={"link"} onClick={onLogout}>
            Logout
          </Button>
        ) : (
          <Link href={"/login"}>{t("login_register")}</Link>
        )}
        <ThemeChanger />
        <LangSwitcher />
      </span>
    </header>
  );
}
