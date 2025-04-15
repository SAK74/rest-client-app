"use client";

import { useTranslations } from "next-intl";
import { useLocalStorage } from "@/lib/hooks/useLocalStorage";
import NoRequests from "./NoRequests";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ClientPage() {
  const t = useTranslations("History_Page");

  const [history] = useLocalStorage("history");

  return (
    <main className="flex flex-col gap-8 py-4 items-center">
      <Card className="mx-6 w-4xl">
        <CardHeader>
          <CardTitle className="flex flex-col items-center">
            {t("history_page")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!history?.length ? <NoRequests t={t} /> : <></>}
        </CardContent>
      </Card>
    </main>
  );
}
