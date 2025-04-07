"use client";

import { Methods } from "@/app/_constants/methods";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { ChangeEventHandler, FC } from "react";

const Method: FC<{ method: string }> = ({ method }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onChange: ChangeEventHandler<HTMLSelectElement> = ({
    target: { value },
  }) => {
    const pathnameArr = pathname.split("/");
    pathnameArr[2] = value;
    const query = Object.fromEntries(searchParams.entries());

    router.replace(
      { pathname: pathnameArr.join("/"), query },
      { scroll: false },
    );
  };

  return (
    <div>
      <select value={method} onChange={onChange}>
        {Methods.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Method;
