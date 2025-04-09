import { FC, useState } from "react";
import { Select } from "@/components";
import { Button } from "@/components/ui/button";

const selectOptions = ["JSON", "text"];

const Body: FC<{ body?: string; onBodyChange: (body: string) => void }> = ({
  body,
  onBodyChange,
}) => {
  const [text, setText] = useState<string>(() => body || "");
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

  const handleChangeMode = (value: string) => {
    setMode(value);

    if (value === "text") {
      setError(null);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="mb-4 flex items-end justify-between">
        <Select
          label="Mode"
          options={selectOptions.map((value) => ({ label: value, value }))}
          value={mode}
          onChange={handleChangeMode}
        />
        <Button
          disabled={!!error}
          onClick={() => {
            onBodyChange(text);
          }}
        >
          Ok
        </Button>
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
};

export default Body;
