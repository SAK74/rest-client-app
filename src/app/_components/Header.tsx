"use client";

import { useSession } from "next-auth/react";
import { useLocale } from "next-intl";
import { useTranslations } from "use-intl";
import { signOut } from "next-auth/react";
import LangSwitcher from "./LangSwitcher";
import { Button } from "@/components/ui/button";
import { Link, usePathname } from "@/i18n/navigation";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const ThemeChanger = dynamic(() => import("./ThemeChanger"), { ssr: false });

export default function Header() {
  const t = useTranslations("Header");
  const locale = useLocale();
  const { status } = useSession();
  const pathname = usePathname();

  const onLogout = () => {
    signOut({ redirectTo: `/${locale}` });
  };

  const [isScrolling, setIsscrolling] = useState(false);

  const handlescroll = () => {
    if (window.scrollY > 20) {
      setIsscrolling(true);
    } else {
      setIsscrolling(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handlescroll);
    return () => {
      window.removeEventListener("scroll", handlescroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "flex justify-center items-center px-4 py-2 sticky top-0 h-(--header-height) z-10 bg-slate-400 dark:bg-slate-800",
        {
          "bg-transparent backdrop-blur-md dark:bg-transparent dark:backdrop-blur-md":
            isScrolling,
        },
      )}
    >
      <h3 className="grow text-center">{t("tittle")}</h3>
      <span className="flex gap-4 items-center">
        {status === "authenticated" ? (
          <Button variant={"link"} onClick={onLogout}>
            Logout
          </Button>
        ) : (
          !pathname.includes("login") &&
          !pathname.includes("register") && (
            <>
              <Link href={"/login"} className="hidden md:block">
                {t("login_register")}
              </Link>
              <Link href={"/login"} className="md:hidden">
                🔑
              </Link>
            </>
          )
        )}
        <ThemeChanger />
        <LangSwitcher />
      </span>
    </header>
  );
}
