"use client";

import { login, register } from "@/actions/userAuth";
import { useRouter, Link } from "@/i18n/navigation";
import { DEFAULT_REDIRECT_AFTER_LOGIN } from "@/routes";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { type FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { credentialsSchema, registerSchema, UserCredentials } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import Socials from "./Socials";
import { Separator } from "@/components/ui/separator";
import { toastType } from "@/_setup";

export type FormProps = {
  formType: "login" | "register";
};

type FormData = UserCredentials & { password_confirm?: string };

const CustomForm: FC<FormProps> = ({ formType }) => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("Login_Form");

  const form = useForm<FormData>({
    resolver: zodResolver(
      formType === "register" ? registerSchema : credentialsSchema,
    ),
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
      password_confirm: "",
    },
  });
  const { update } = useSession();
  const onValid: SubmitHandler<
    UserCredentials & { password_confirm?: string }
  > = async ({ email, password }) => {
    const formAction = formType === "login" ? login : register;
    const result = await formAction({ email, password });
    if (result.success) {
      toast.success(result.message, toastType);
      update();
      router.push(
        formType === "register"
          ? "/login"
          : callbackUrl || DEFAULT_REDIRECT_AFTER_LOGIN,
        { scroll: false, locale },
      );
    } else {
      toast.error(result.message, toastType);
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="">
          {formType === "login" ? t("login_tittle") : t("register_tittle")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onValid)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email: </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e-mail" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password: </FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {formType === "register" && (
              <FormField
                control={form.control}
                name="password_confirm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm password: </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="confirm password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <Button>{t("submit_btn")}</Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col">
        <Link href={formType === "login" ? "/register" : "/login"}>
          {formType === "login" ? t("login_link") : t("register_link")}
        </Link>
        <Separator className="my-4" />
        <Socials />
      </CardFooter>
    </Card>
  );
};

export default CustomForm;
