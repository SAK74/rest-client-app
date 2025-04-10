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
  // console.log({ _body });

  // const header = new Header({ key: "Content-type", value: "application/json" });
  const header = Object.entries(_headers).map(
    ([key, value]) => new Header({ key, value }),
  );
  const body: RequestBodyDefinition = {
    mode: "raw",
    // raw: JSON.stringify({ data: { x: 1, y: 2 } }),
    // raw: JSON.stringify({ data: { x: 1, y: 2 } }),
    raw: _body,
  };
  // console.log({ header, body });

  const request = new Request({
    // url: "https://google.com",
    url: _url,
    method: _method,
    header,
    body,
  });

  // codegen.getOptions("nodejs", "Request", (err, opt) => {
  //   console.log({ opt });
  // });

  // console.log({ supportedLang });

  const [language, setLanguage] =
    useState<ReturnType<typeof getLanguageList>[number]["key"]>("nodejs");
  const [variant, setVariant] = useState<
    (typeof supportedLang)[number]["variants"][number]["key"]
  >(
    "Request",
    // () => supportedLang.find(({ key }) => key === language)!.variants[0].key,
  );

  const [isError, setIsError] = useState(false);

  useEffect(() => {
    // startTransition(() => {
    setVariant(
      supportedLang.find(({ key }) => key === language)!.variants[0].key,
    );
    // });
  }, [language]);

  // const [data, setData] = useState("some data");
  const textRef = useRef<HTMLTextAreaElement | null>(null);
  console.log({ language, variant });

  useEffect(() => {
    codegen.convert(
      language,
      variant,
      request,
      { ES6_enabled: true, indentCount: 3 },
      (err, snipp) => {
        if (err) {
          let message = "Error of code generating";
          console.log({ err });
          if (typeof err === "string") {
            message = err;
          } else if (err instanceof Error) {
            message = err.message;
          }
          if (textRef.current) {
            setIsError(true);
            textRef.current.value = message;
            // textRef.current.style.color = "red";
          }
        } else {
          // console.log("Code: ", snipp);
          setIsError(false);
          if (textRef.current) {
            textRef.current.value = snipp;
          }
          // setData(snipp);
        }
      },
    );
  }, [variant]);

  return (
    <>
      <div className="float-right">
        <Select
          label="Lang"
          value={language}
          onChange={(val) => {
            setLanguage(val);
          }}
          options={supportedLang.map(({ key, label }) => ({
            label,
            value: key,
          }))}
        />
        <select
          value={language}
          onChange={({ target: { value } }) => {
            // startTransition(() => {
            setLanguage(value);
            // });
          }}
        >
          {supportedLang.map(({ key, label }) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
        <select
          value={variant}
          onChange={({ target: { value } }) => {
            startTransition(() => {
              setVariant(value);
            });
          }}
        >
          {supportedLang
            .find(({ key }) => key === language)
            ?.variants.map(({ key }) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
        </select>
      </div>

      {/* <code>{data}</code> */}
      {/* <p>{data}</p> */}
      <Textarea
        readOnly
        spellCheck="false"
        rows={20}
        ref={textRef}
        defaultValue={""}
        // onChange={() => {}}
        className={cn("p-4", { "text-destructive": isError })}
      ></Textarea>
    </>
  );
};

export default CodeViewer;
