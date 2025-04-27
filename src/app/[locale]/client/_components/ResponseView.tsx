"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Loader from "@/app/_components/Loader";

const Monaco = dynamic(() => import("@monaco-editor/react"), { ssr: false });

type Props = {
  response?: Response;
};

export default function ResponseView({ response }: Props) {
  const [body, setBody] = useState<string>("");
  const { resolvedTheme } = useTheme();

  const monacoTheme = resolvedTheme === "dark" ? "vs-dark" : "light";

  useEffect(() => {
    if (!response) return;

    response
      .text()
      .then((text) => setBody(text))
      .catch(() => setBody("Could not read body"));
  }, [response]);

  if (!response) return <p>No response yet</p>;

  return (
    <div className="w-full text-left space-y-4 text-sm">
      <div>
        <strong>Status:</strong> {response.status} {response.statusText}
      </div>
      <Tabs defaultValue={"headers"}>
        <TabsList className="*:cursor-pointer">
          <TabsTrigger value="headers">Headers</TabsTrigger>
          <TabsTrigger value="body">Body</TabsTrigger>
        </TabsList>
        <TabsContent value="headers" className="border p-2 rounded-md bg-muted">
          <table className="">
            <tbody className="space-y-1">
              {[...response.headers.entries()].map(([key, value]) => (
                <tr key={key} className="odd:bg-muted-foreground/15 rounded">
                  <th scope="row" className="w-1/3">
                    {key}
                  </th>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TabsContent>
        <TabsContent value="body">
          <Monaco
            language="json"
            theme={monacoTheme}
            value={body}
            options={{
              readOnly: true,
              minimap: { enabled: false },
              fontSize: 14,
              scrollBeyondLastLine: false,
            }}
            height="300px"
            loading={<Loader />}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
