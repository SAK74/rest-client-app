"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useLocalStorage } from "@/lib/hooks/useLocalStorage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getFullClientLink } from "@/lib/getFullClientLink";
import Loader from "@/app/_components/Loader";
import NoRequests from "./NoRequests";
import { type HistoryItem } from "@/lib/prepareHistory";

export default function ClientPage() {
  const t = useTranslations("History_Page");

  const [history, , isLoadingHistory] = useLocalStorage("history");
  const sortedHistory = history.length
    ? (JSON.parse(history) as Array<HistoryItem>).reverse()
    : [];

  return (
    <main className="flex flex-col gap-8 py-4 items-center">
      <Card className="mx-6 w-4xl">
        <CardHeader>
          <CardTitle className="flex flex-col items-center">
            {t("history_page")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoadingHistory ? (
            <Loader />
          ) : !sortedHistory?.length ? (
            <NoRequests t={t} />
          ) : (
            <div className="flex flex-col items-start">
              {sortedHistory.map((item, i) => (
                <Link key={i} href={getFullClientLink(item)}>
                  {item.method} {item.url}
                </Link>
              ))}
              {/* would be nice to have */}
              <Button className="self-end">Clear history</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
