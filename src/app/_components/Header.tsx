"use client";

import { useSession } from "next-auth/react";
import { useLocale } from "next-intl";
import { useTranslations } from "use-intl";
import { signOut } from "next-auth/react";
import LangSwitcher from "./LangSwitcher";
import { Button } from "@/components/ui/button";

export default function Header() {
  const t = useTranslations("Header");
  const locale = useLocale();
  const { status } = useSession();

  const onLogout = () => {
    signOut({ redirectTo: `/${locale}` });
  };

  return (
    <header className="flex justify-center px-4 py-2">
      <h3 className="grow text-center">{t("tittle")}</h3>
      <span className="space-x-4">
        {status === "authenticated" && (
          <Button variant={"link"} onClick={onLogout}>
            Logout
          </Button>
        )}
        <LangSwitcher />
      </span>
    </header>
  );
}
