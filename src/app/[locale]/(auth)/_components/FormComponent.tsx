"use client";

import { login, register } from "@/actions/userAuth";
import { useRouter } from "@/i18n/navigation";
import { DEFAULT_REDIRECT_AFTER_LOGIN } from "@/routes";
import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { FormEventHandler, type FC } from "react";

export type FormProps = {
  formType: "login" | "register";
};
export type UserCredentials = {
  email: string;
  password: string;
};

const Form: FC<FormProps> = ({ formType }) => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const router = useRouter();
  const locale = useLocale();

  const onSubmit: FormEventHandler<HTMLFormElement> = async (ev) => {
    ev.preventDefault();
    const formAction = formType === "login" ? login : register;
    const result = await formAction(new FormData(ev.currentTarget));
    console.log({ result });
    // TODO: drom a toast

    if (result.success) {
      router.push(
        formType === "register"
          ? "/login"
          : callbackUrl || DEFAULT_REDIRECT_AFTER_LOGIN,
        { scroll: false, locale },
      );
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <label>
        Email:
        <input type="text" name="email" />
      </label>
      <label>
        Password:
        <input type="password" name="password" />
      </label>
      {callbackUrl && (
        <input type="hidden" name="callbackUrl" value={callbackUrl} />
      )}
      <button>Submit</button>
    </form>
  );
};

export default Form;
