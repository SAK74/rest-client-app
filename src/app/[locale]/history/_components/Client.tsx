"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getFullClientLink } from "@/lib/getFullClientLink";
import NoRequests from "./NoRequests";
import { useHistoryStorage } from "@/lib/hooks/useLocalStorage";
import { useState } from "react";

export default function ClientPage() {
  const t = useTranslations("History_Page");

  const { history, resetHistory } = useHistoryStorage();
  const [, setState] = useState<string | undefined>();

  const clearHistory = () => {
    resetHistory();
    // to allow page rerendering
    setState("");
  };

  return (
    <main className="flex flex-col gap-8 py-4 items-center">
      <Card className="mx-6 w-4xl">
        <CardHeader>
          <CardTitle className="flex flex-col items-center">
            {t("history_page")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!history.length ? (
            <NoRequests />
          ) : (
            <div className="flex flex-col items-start">
              {history.reverse().map((item, i) => (
                <Link key={i} href={getFullClientLink(item)}>
                  {item.method} {item.url}
                </Link>
              ))}
              <Button className="self-end" onClick={clearHistory}>
                {t("clear_history")}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
