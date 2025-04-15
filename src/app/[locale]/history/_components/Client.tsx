"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useLocalStorage } from "@/lib/hooks/useLocalStorage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NoRequests from "./NoRequests";
import { Button } from "@/components/ui/button";
import { getFullClientLink } from "@/lib/getFullClientLink";

export interface HistoryItem {
  method: string;
  url: string;
  body: string;
  headers: { [k: string]: string };
  executionTime: number;
}

export default function ClientPage() {
  const t = useTranslations("History_Page");

  const [history] = useLocalStorage("history");

  const [sortedHistory, setSortedHistory] = useState<HistoryItem[]>();

  useEffect(() => {
    if (!!history.length) {
      try {
        const value: [] = JSON.parse(history);
        const sortedValue = value.sort(
          (a: HistoryItem, b: HistoryItem) => b.executionTime - a.executionTime,
        );
        setSortedHistory(sortedValue);
      } catch (error) {
        console.error("Not able to parse history JSON", error);
      }
    }
  }, [history]);

  return (
    <main className="flex flex-col gap-8 py-4 items-center">
      <Card className="mx-6 w-4xl">
        <CardHeader>
          <CardTitle className="flex flex-col items-center">
            {t("history_page")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!sortedHistory?.length ? (
            <NoRequests t={t} />
          ) : (
            <div className="flex flex-col">
              {sortedHistory.map((item) => (
                <Link key={item.executionTime} href={getFullClientLink(item)}>
                  <Button variant="link">
                    {item.method} {item.url}
                  </Button>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
