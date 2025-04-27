import { Button } from "@/components/ui/button";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { FC } from "react";
import { DEFAULT_REDIRECT_AFTER_LOGIN } from "@/routes";
import { useTranslations } from "next-intl";

type SocialsProps = {
  callbackUrl?: string;
};

const Socials: FC<SocialsProps> = ({ callbackUrl }) => {
  const t = useTranslations("Login_Form");
  const onGitClick = async () => {
    await signIn("github", {
      redirectTo: callbackUrl || DEFAULT_REDIRECT_AFTER_LOGIN,
    });
  };
  return (
    <div className="text-center space-y-2">
      <p>{t("login_with_provider")}</p>
      <Button onClick={onGitClick} className="space-x-6">
        <Image
          src={"/github.svg"}
          alt="github_logo"
          width={20}
          height={20}
          className="h-5 not-dark:invert"
        />
        <span>Github</span>
      </Button>
    </div>
  );
};

export default Socials;
