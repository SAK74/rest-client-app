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
import Image from "next/image";

const ThemeChanger = dynamic(() => import("./ThemeChanger"), { ssr: false });

export default function Header() {
  const t = useTranslations("Header");
  const { status } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  const onLogout = async () => {
    try {
      await signOut({ redirect: false });
      dropTost("You are logged out", "success");
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

  return (
    <header
      className={cn(
        "w-full flex justify-center items-center px-4 py-2 sticky top-0 h-(--header-height) z-10 bg-slate-400 dark:bg-slate-800",
        {
          "bg-transparent backdrop-blur-md dark:bg-transparent dark:backdrop-blur-md":
            isScrolling,
        },
      )}
    >
      <Link href={"/"}>
        <Image
          src={"/rest_logo.png"}
          alt="project_logo"
          width={56}
          height={40}
          className="dark:invert-75 h-10"
        />
      </Link>

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
