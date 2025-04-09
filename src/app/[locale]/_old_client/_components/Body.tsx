"use client";

import { useState } from "react";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Select from "@/components/ui/select";

export default function Body() {
  return (
    <div>
      <CardHeader className="px-0">
        <CardTitle>Body:</CardTitle>
      </CardHeader>
      <CardContent className="px-0 py-6">
        <SimpleJSONEditor />
      </CardContent>
    </div>
  );
}

const mode = ["JSON", "text"];
const SelectOptions = mode.map((item) => ({ label: item, value: item }));

function SimpleJSONEditor() {
  const [text, setText] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState("JSON");

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setText(value);

    if (mode === "JSON") {
      try {
        JSON.parse(value);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Invalid JSON");
      }
    } else {
      setError(null);
    }
  };

  const handleChangeMode = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setMode(value);

    if (value === "text") {
      setError(null);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="mb-4">
        <Select
          label="Mode"
          options={SelectOptions}
          value={mode}
          onChange={handleChangeMode}
        />
      </div>

      <textarea
        value={text}
        onChange={handleTextChange}
        className="w-full h-60 p-2 border rounded font-mono text-sm"
        spellCheck="false"
      />

      {error && (
        <div className="mt-2 p-2 bg-red-100 text-red-700 rounded">
          Error: {error}
        </div>
      )}
    </div>
  );
}
