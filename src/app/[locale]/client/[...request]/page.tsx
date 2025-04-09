"use client";

import { use, useState } from "react";
import Method from "../_components/Method";
import UrlInput from "../_components/UrlInput";
import HeadersHandler from "../_components/HeadersHandler";
import { Button } from "@/components/ui/button";
import BodyEditor from "../_components/BodyEditor";
import ResponseView from "../_components/ResponseView";
import CodeViewer from "../_components/CodeView";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// try to type http://localhost:3000/client/POST/aHR0cHM6Ly9qc29ucGxhY2Vob2xkZXIudHlwaWNvZGUuY29tL3Bvc3Rz/eyJ0aXRsZSI6ImZha2VUaXRsZSIsInVzZXJJZCI6MSwiYm9keSI6ImZha2VNZXNzYWdlIn0=?Content-Type=application%2Fjson

export default function Page({
  params,
  searchParams,
}: {
  params: Promise<{ request: string[] }>;
  searchParams: Promise<Record<string, string>>;
}) {
  const { request } = use(params);
  const _headers = use(searchParams);
  console.log({ request, _headers });
  const [method, url, body] = request;

  const pathname = usePathname();
  const pathnameArr = pathname.split("/");
  const router = useRouter();

  const onMethodChange = (method: string) => {
    pathnameArr[2] = method;
    router.replace(
      { pathname: pathnameArr.join("/"), query: _headers },
      { scroll: false },
    );
  };

  const urlDecoded = url && atob(decodeURIComponent(url));
  const onUrlChange = (url: string) => {
    pathnameArr[3] = encodeURIComponent(btoa(url));
    router.replace(
      { pathname: pathnameArr.join("/"), query: _headers },
      { scroll: false },
    );
  };

  const bodyDecoded = body && atob(decodeURIComponent(body));

  //eslint-disable-next-line
  const [response, setResponse] = useState<Promise<Response> | undefined>();

  const onGo = () => {
    //method = method
    //
    // TODO: variables insertion
    // TODO: create route handlers and
    // const response = fetch(`/api/request?url=${url}`, {
    //   method,
    //   headers: _headers,
    //   body,
    // });
    // setResponse(response)
  };

  return (
    <main className="flex flex-col gap-6">
      <section className="flex flex-col gap-6">
        {/* Request section */}
        <div className="flex gap-6">
          <Method method={method} onMethodChange={onMethodChange} />
          <UrlInput decodedUrl={urlDecoded} onUrlChange={onUrlChange} />
          {/* <CodeViewer /> */}
          <Button onClick={onGo}>Go!</Button>
        </div>

        <Tabs defaultValue={"headers"}>
          <TabsList>
            <TabsTrigger value="headers">Headers</TabsTrigger>
            <TabsTrigger value="body">Body</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
          <TabsContent value="headers">
            <HeadersHandler _headers={_headers} />
          </TabsContent>
          <TabsContent value="body">
            <BodyEditor decodedBody={bodyDecoded} />
          </TabsContent>
          <TabsContent value="code">
            <CodeViewer />
          </TabsContent>
        </Tabs>
      </section>
      <section>
        <ResponseView response={response} />
      </section>
    </main>
  );
}
