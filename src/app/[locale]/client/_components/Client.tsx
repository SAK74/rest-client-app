"use client";

import { useState, startTransition } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/lib/hooks/useLocalStorage";
import { prepareHistory } from "@/lib/prepareHistory";
import Headers from "./HeadersHandler";
import InputUrl from "./InputUrl";
import Code from "./CodeView";
import Body from "./BodyEditor";
import ResponseView from "./ResponseView";
import { dropTost } from "@/lib/toast";

export default function ClientPage() {
  const t = useTranslations("Client_Page");
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams<{ request: string[] }>();
  const pathnameArr = pathname.split("/");
  const searchParams = useSearchParams();
  const query = Object.fromEntries(searchParams.entries());

  const [method, url, body] = params.request;

  const [history, setHistory] = useLocalStorage("history");

  const onMethodChange = (newMethod: string) => {
    router.replace(
      { pathname: pathname.replace(method, newMethod), query },
      { scroll: false },
    );
  };
  const urlDecoded = url && atob(decodeURIComponent(url));
  const onUrlChange = (url: string) => {
    if (!url) {
      return;
    }
    pathnameArr[3] = btoa(url);
    router.replace(
      {
        pathname: pathnameArr.join("/"),
        query,
      },
      { scroll: false },
    );
  };

  const bodyDecoded = body && atob(decodeURIComponent(body));

  const onBodyChange = (text: string, searchParams: URLSearchParams) => {
    const query = Object.fromEntries(searchParams.entries());
    pathnameArr[4] = btoa(text);
    router.replace(
      {
        pathname: pathnameArr.join("/"),
        query,
      },
      { scroll: false },
    );
  };

  const onQueryChange = (query: string) => {
    router.replace(`?${query}`, { scroll: false });
  };

  const [response, setResponse] = useState<Response | undefined>();

  const onGo = async () => {
    // TODO: variables insertion
    startTransition(() => {
      setResponse(undefined);
    });
    try {
      const response = await fetch(
        `/api/request/${url}?${searchParams.toString()}`,
        {
          method,
          ...(method !== "GET" && method !== "HEAD" && { body: bodyDecoded }),
        },
      );
      if (response.headers.has("x-app-error")) {
        dropTost(
          response.headers.get("x-app-error") || "Request error",
          "error",
          "look at server console",
        );
      } else {
        startTransition(() => {
          setResponse(response);
          // TODO: save to history !
          const newHistory = prepareHistory(history, {
            headers: query,
            method: method,
            url: urlDecoded,
            body: bodyDecoded,
          });

          setHistory(newHistory);
        });
      }
    } catch (err) {
      console.log(err);
      dropTost("Internal app error", "error");
    }
  };

  return (
    <main className="flex flex-col gap-8 py-4 items-center">
      <section>
        <Card className="mx-6 w-4xl">
          <CardHeader>
            <CardTitle className="flex flex-col items-center">
              {t("REST_Client")}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-8">
            <div className="flex items-end justify-between">
              <InputUrl
                {...{
                  method,
                  onMethodChange,
                  onUrlChange,
                  url: urlDecoded.trim(),
                }}
              ></InputUrl>
              <Button onClick={onGo} disabled={!url}>
                Go!
              </Button>
            </div>
            <Tabs defaultValue={"headers"}>
              <TabsList>
                <TabsTrigger value="headers">Headers</TabsTrigger>
                <TabsTrigger value="body">Body</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
              </TabsList>
              <TabsContent value="headers">
                <Headers {...{ query, onQueryChange }} />
              </TabsContent>
              <TabsContent value="body">
                <Body
                  body={bodyDecoded}
                  onBodyChange={onBodyChange}
                  query={query}
                />
              </TabsContent>
              <TabsContent value="code">
                <Code
                  {...{
                    _headers: query,
                    _method: method,
                    _url: urlDecoded,
                    _body: bodyDecoded,
                  }}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </section>
      <section>
        <Card className="mx-6 w-4xl">
          <CardHeader>
            <CardTitle className="flex flex-col items-center">
              <ResponseView response={response} />
            </CardTitle>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      </section>
    </main>
  );
}
