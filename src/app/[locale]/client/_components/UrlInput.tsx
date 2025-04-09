import { FC, FormEventHandler } from "react";

const UrlInput: FC<{
  decodedUrl?: string;
  onUrlChange: (url: string) => void;
}> = ({ decodedUrl, onUrlChange }) => {
  const onSubmit: FormEventHandler<HTMLFormElement> = (ev) => {
    ev.preventDefault();
    const value = (
      ev.currentTarget.elements.namedItem("url") as HTMLInputElement
    ).value;

    onUrlChange(value);
  };
  return (
    <form onSubmit={onSubmit}>
      <input type="text" size={50} defaultValue={decodedUrl} name="url" />
    </form>
  );
};

export default UrlInput;
