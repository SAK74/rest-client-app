"use client";

import { useSession } from "next-auth/react";
import { useTranslations } from "use-intl";
import { signOut } from "next-auth/react";
import LangSwitcher from "./LangSwitcher";
import { Button } from "@/components/ui/button";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { dropTost } from "@/lib/toast";
import Logo from "./Logo";
import NavMenu from "./Menu";
import { LogOutIcon } from "lucide-react";

const ThemeChanger = dynamic(() => import("./ThemeChanger"), { ssr: false });

export default function Header() {
  const t = useTranslations("Header");
  const { status, update: updateSession } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  const onLogout = async () => {
    try {
      await signOut({ redirect: false });
      dropTost("You are logged out", "success");
      updateSession();
      router.replace("/");
    } catch (err) {
      let message = "Somethink went wrong...";
      if (err instanceof Error) {
        message = err.message;
      } else if (typeof err === "string") {
        message = err;
      }
      dropTost(message, "error");
    }
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
  const isAuthenticated = status === "authenticated";

  const paths: { path: string; name: string }[] = [
    { path: "/client", name: t("client") },
    { path: "/history", name: t("history") },
    { path: "/variables", name: t("variables") },
  ].filter((path) => !pathname.startsWith(path.path));

  return (
    <header
      className={cn(
        "w-full flex justify-between gap-2 items-center px-1 md:px-4 py-2 sticky top-0 h-(--header-height) z-10 bg-slate-400 dark:bg-slate-800",
        {
          "bg-transparent backdrop-blur-md dark:bg-transparent dark:backdrop-blur-md":
            isScrolling,
        },
      )}
    >
      <Logo />
      <h3 className="grow text-center">{t("tittle")}</h3>
      {isAuthenticated && <NavMenu paths={paths} />}
      {isAuthenticated ? (
        <>
          <Button variant={"link"} onClick={onLogout} className="">
            <LogOutIcon className="inline md:hidden" />
            <span className="hidden md:inline">{t("logout")}</span>
          </Button>
        </>
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
    </header>
  );
}
