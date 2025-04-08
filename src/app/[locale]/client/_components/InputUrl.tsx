"use client";
import { useState } from "react";
import { useRouter, usePathname, useParams } from "next/navigation";
import Select from "@/components/ui/select";
import { Methods } from "@/app/_constants/methods";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { replaceVariables } from "@/lib/replaceVariables";

const SelectOptions = Methods.map((item) => ({ label: item, value: item }));

/*
export async function sendRequest(url: string, method: string, body: string, headers: Record<string, string>) {
  const finalUrl = replaceVariables(url);
  const finalBody = replaceVariables(body);

  const finalHeaders: Record<string, string> = {};
  for (const [key, value] of Object.entries(headers)) {
    finalHeaders[key] = replaceVariables(value);
  }

  console.log("Final URL:", finalUrl);
  console.log("Final Headers:", finalHeaders);
  console.log("Final Body:", finalBody);

  try {
    const response = await fetch(finalUrl, {
      method,
      headers: finalHeaders,
      body: method !== "GET" && method !== "HEAD" ? finalBody : undefined,
    });

    const result = await response.json();
    console.log("Response:", result);
    return result;
  } catch (error) {
    console.error("Fetch error:", error);
  }
}
*/

export default function InputUrl() {
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();

  const methodValue = params.slug?.[0];

  const [method, setMethod] = useState<string | undefined>(methodValue);

  const [url, setUrl] = useState<string>("");

  const handleMethodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setMethod(value);
    if (methodValue) {
      router.push(`${pathname.replace(methodValue, value)}`, { scroll: false });
    } else {
      router.push(`${pathname}/${value}`, { scroll: false });
    }
  };

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  return (
    <div className="grid grid-cols-[auto_620px_auto] gap-4 items-end">
      <Select
        label="Method"
        options={SelectOptions}
        onChange={handleMethodChange}
        value={method}
      />
      <div>
        <label htmlFor="url">Endpoint URL</label>
        <Input
          id="url"
          placeholder="Type URL here..."
          value={url}
          onChange={handleUrlChange}
        />
      </div>
      <Button>Send</Button>
    </div>
  );
}
