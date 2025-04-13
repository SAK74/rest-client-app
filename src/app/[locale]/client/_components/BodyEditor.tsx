import { FC, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { Select } from "@/components";
import { Button } from "@/components/ui/button";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

const selectOptions = ["json", "text"];

const Body: FC<{ body?: string; onBodyChange: (body: string) => void }> = ({
  body,
  onBodyChange,
}) => {
  const { theme } = useTheme();

  const [text, setText] = useState<string>(() => body || "");
  const [isError, setIsError] = useState<boolean>(false);
  const [mode, setMode] = useState("json");

  useEffect(() => {
    validateBody(body, mode);
  }, [body, mode]);

  const validateBody = (value: string | undefined, modeValue: string) => {
    if (modeValue === "json") {
      try {
        JSON.parse(value || "");
        setIsError(false);
      } catch (err) {
        console.error("JSON parse error", err);
        setIsError(true);
      }
    } else {
      setIsError(false);
    }
  };

  const handleTextChange = (value: string | undefined) => {
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
            onBodyChange(text);
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
      />
    </div>
  );
};

export default Body;
