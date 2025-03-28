"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "use-intl";

export default function Header() {
  const t = useTranslations("Header");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = Object.fromEntries(searchParams.entries());

  const onLangClick = () => {
    router.replace(
      { pathname, query },
      { scroll: false, locale: locale === "en" ? "pl" : "en" },
    );
  };

  return (
    <header className="flex justify-center">
      <h3 className="grow text-center">{t("tittle")}</h3>
      <button className="mx-6 cursor-pointer" onClick={onLangClick}>
        {locale}
      </button>
    </header>
  );
}
