import type { FC, ReactEventHandler } from "react";
import { Select } from "@/components";
import { Methods } from "@/app/_constants/methods";
import { Input } from "@/components/ui/input";

const InputUrl: FC<{
  method: string;
  onMethodChange: (method: string) => void;
  url: string;
  onUrlChange: (url: string) => void;
}> = ({ method, onMethodChange, url, onUrlChange }) => {
  const handleMethodChange = (value: string) => {
    onMethodChange(value);
  };

  const onSubmit: ReactEventHandler<HTMLFormElement> = (ev) => {
    ev.preventDefault();
    const value = (
      ev.currentTarget.elements.namedItem("url") as HTMLInputElement
    ).value;
    onUrlChange(value.trim());
  };

  return (
    <form
      className="grid grid-cols-[auto_620px_auto] gap-4 items-end"
      onSubmit={onSubmit}
      onMouseLeave={onSubmit}
    >
      <Select
        label="Method"
        options={Methods.map((value) => ({ label: value, value }))}
        onChange={handleMethodChange}
        value={method}
      />
      <div>
        <label htmlFor="url">Endpoint URL</label>
        <Input
          id="url"
          name="url"
          placeholder="Type URL here..."
          defaultValue={url}
          spellCheck="false"
        />
      </div>
    </form>
  );
};

export default InputUrl;
