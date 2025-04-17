"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";

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

      <div>
        <strong>Headers:</strong>
        <div className="mt-2 border p-2 rounded-md bg-muted">
          <ul className="space-y-1">
            {[...response.headers.entries()].map(([key, value]) => (
              <li key={key}>
                <span className="font-semibold">{key}</span>: {value}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <strong>Body:</strong>
        <div className="mt-2">
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
          />
        </div>
      </div>
    </div>
  );
}
