import { usePathname, useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { FC, FormEventHandler } from "react";

const UrlInput: FC<{ url?: string }> = ({ url }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const onSubmit: FormEventHandler<HTMLFormElement> = (ev) => {
    ev.preventDefault();
    const value = (
      ev.currentTarget.elements.namedItem("url") as HTMLInputElement
    ).value;

    const pathnameArr = pathname.split("/");
    pathnameArr[3] = btoa(value);
    const query = Object.fromEntries(searchParams.entries());

    router.replace(
      { pathname: pathnameArr.join("/"), query },
      { scroll: false },
    );
  };
  return (
    <form onSubmit={onSubmit}>
      <input type="text" size={50} defaultValue={atob(url || "")} name="url" />
    </form>
  );
};

export default UrlInput;
