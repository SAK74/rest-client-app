"use client";

import { use, useState } from "react";
import Method from "../_components/Method";
import UrlInput from "../_components/UrlInput";
import HeadersHandler from "../_components/HeadersHandler";
import { Button } from "@/components/ui/button";
import BodyEditor from "../_components/BodyEditor";
import ResponseView from "../_components/ResponseView";
import CodeViewer from "../_components/CodeView";

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

  const urlPlain = decodeURIComponent(url || "");
  const bodyPlain = decodeURIComponent(body || "");

  //eslint-disable-next-line
  const [response, setResponse] = useState<Promise<Response> | undefined>();

  const onGo = () => {
    //method = method
    //
    // const url = atob(bodyPlain);
    // const body = atob(bodyPlain);
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
      <section className="flex gap-6">
        {/* Request section */}
        <Method method={method} />
        <UrlInput url={urlPlain} />
        <HeadersHandler _headers={_headers} />
        <BodyEditor body={bodyPlain} />
        <CodeViewer />
        <Button onClick={onGo}>Go!</Button>
      </section>
      <section>
        <ResponseView response={response} />
      </section>
    </main>
  );
}
