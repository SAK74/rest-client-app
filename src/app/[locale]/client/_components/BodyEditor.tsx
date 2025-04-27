import { FC, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { Select } from "@/components";
import { Button } from "@/components/ui/button";
import Loader from "@/app/_components/Loader";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

const selectOptions = ["json", "text"];

const Body: FC<{
  body?: string;
  onBodyChange: (body: string, params: URLSearchParams) => void;
  query: Record<string, string>;
}> = ({ body, onBodyChange, query }) => {
  const { theme } = useTheme();

  const [text, setText] = useState<string>(() => body || "");
  const [isError, setIsError] = useState<boolean>(false);
  const [mode, setMode] = useState("json");

  useEffect(() => {
    const key = Object.keys(query).find(
      (k) => k.toLowerCase() === "content-type",
    );
    const contentType = key ? query[key] : undefined;

    if (contentType?.includes("text/plain")) {
      setMode("text");
    }
  }, [query]);

  useEffect(() => {
    validateBody(body, mode);
  }, [body, mode]);

  const validateBody = (value: string | undefined, modeValue: string) => {
    if (modeValue === "json" && value) {
      try {
        JSON.parse(value);
        setIsError(false);
      } catch {
        setIsError(true);
      }
    } else {
      setIsError(false);
    }
  };

  const handleTextChange = (value?: string) => {
    setText(value || "");
    validateBody(value, mode);
  };

  const handleChangeMode = (value: string) => {
    setMode(value);
    validateBody(body, value);
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
          disabled={isError}
          onClick={() => {
            const params = new URLSearchParams(query);
            if (text.length) {
              if (mode === "json") {
                params.set("Content-Type", "application/json");
              } else {
                params.set("Content-Type", "text/plain; charset=utf-8");
              }
            } else {
              params.delete("Content-Type");
            }

            onBodyChange(text, params);
          }}
        >
          Ok
        </Button>
      </div>

      <MonacoEditor
        height="300px"
        language={mode}
        theme={theme === "dark" ? "vs-dark" : "light"}
        value={text}
        onChange={handleTextChange}
        loading={<Loader />}
      />
    </div>
  );
};

export default Body;
