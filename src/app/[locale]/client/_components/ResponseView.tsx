"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Monaco = dynamic(() => import("@monaco-editor/react"), { ssr: false });

type Props = {
  response?: Response;
};

export default function ResponseView({ response }: Props) {
  const [body, setBody] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    if (!response) return;

    const cloned = response.clone();
    setStatus(`${cloned.status} ${cloned.statusText}`);

    cloned
      .text()
      .then(setBody)
      .catch(() => setBody("Could not read body"));
  }, [response]);

  return (
    <div className="w-full text-left space-y-4">
      <div className="text-sm">
        <strong>Status:</strong> {status}
      </div>
      <div>
        <strong>Body:</strong>
        <div className="mt-2">
          <Monaco
            language="json"
            value={body}
            options={{
              readOnly: true,
              minimap: { enabled: false },
              fontSize: 14,
            }}
            height="300px"
          />
        </div>
      </div>
    </div>
  );
}
