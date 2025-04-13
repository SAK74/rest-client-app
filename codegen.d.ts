declare module "postman-code-generators" {
  import { Request } from "postman-collection";

  function getOptions(
    language: string,
    variant: string | string[],
    callback: Function,
  ): void;
  function getLanguageList(): {
    key: string;
    label: string;
    syntax_mode: string;
    variants: { key: string }[];
  }[];
  function convert(
    language: string,
    variant: string,
    request: string | Request,
    options?: {
      indentType?: "Tab" | "Space";
      indentCount?: number;
      requestTimeout?: number;
      trimRequestBody?: boolean;
      addCacheHeader?: boolean;
      followRedirect?: boolean;
      ES6_enabled?: boolean;
    },
    callback: (err: unknown, snipp: string) => void,
  ): unknown;
}
