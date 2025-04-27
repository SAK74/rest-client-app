import { type FC, startTransition, useEffect, useRef, useState } from "react";
import codegen, { getLanguageList } from "postman-code-generators";
import { Request, Header, RequestBodyDefinition } from "postman-collection";
import { cn } from "@/lib/utils";
import { Methods } from "@/app/_constants/methods";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components";

type CodeParams = {
  _url: string;
  _headers: { [k: string]: string };
  _body?: string;
  _method: (typeof Methods)[number];
};

const supportedLang = codegen.getLanguageList();

const CodeViewer: FC<CodeParams> = ({ _headers, _url, _body, _method }) => {
  const header = Object.entries(_headers).map(
    ([key, value]) => new Header({ key, value }),
  );
  const body: RequestBodyDefinition = {
    mode: "raw",
    raw: _body,
  };

  const request = new Request({
    url: _url,
    method: _method,
    header,
    body,
  });

  const [language, setLanguage] =
    useState<ReturnType<typeof getLanguageList>[number]["key"]>("nodejs");
  const [variant, setVariant] =
    useState<(typeof supportedLang)[number]["variants"][number]["key"]>(
      "Request",
    );

  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setVariant(
      supportedLang.find(({ key }) => key === language)!.variants[0].key,
    );
  }, [language]);

  const textRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    codegen.convert(
      language,
      variant,
      request,
      { ES6_enabled: true, indentCount: 3 },
      (err, snipp) => {
        if (err) {
          let message = "Error of code generating";
          if (typeof err === "string") {
            message = err;
          } else if (err instanceof Error) {
            message = err.message;
          }
          if (textRef.current) {
            setIsError(true);
            textRef.current.value = message;
          }
        } else {
          setIsError(false);
          if (textRef.current) {
            textRef.current.value = snipp;
          }
        }
      },
    );
  }, [variant]);

  return (
    <div className="relative -top-6">
      <div className="float-right flex mb-1 gap-2">
        <Select
          size="sm"
          value={language}
          onChange={(val) => {
            setLanguage(val);
          }}
          options={supportedLang.map(({ key, label }) => ({
            label,
            value: key,
          }))}
        />

        <Select
          size="sm"
          value={variant}
          onChange={(value) => {
            startTransition(() => {
              setVariant(value);
            });
          }}
          options={
            supportedLang
              .find(({ key }) => key === language)
              ?.variants.map(({ key }) => ({ label: key, value: key })) || []
          }
        />
      </div>

      <Textarea
        readOnly
        spellCheck="false"
        ref={textRef}
        defaultValue={""}
        className={cn("p-4 max-h-60 bg-gray-100", {
          "text-destructive": isError,
        })}
      ></Textarea>
    </div>
  );
};

export default CodeViewer;
