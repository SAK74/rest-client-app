import { getTranslations } from "next-intl/server";
import Select from "@/components/ui/select";
import { Methods } from "@/app/_constants/methods";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SelectOptions = Methods.map((item) => ({ label: item, value: item }));

export default async function InputUrl() {
  const t = await getTranslations("Client_Page");

  return (
    <div className="grid grid-cols-[auto_620px_auto] gap-4 items-end">
      <Select label={t("Method")} options={SelectOptions} />
      <div>
        <label htmlFor="url">{t("Endpoint_URL")}</label>
        <Input id="url" placeholder="Type URL here..." />
      </div>
      <Button>{t("send_btn")}</Button>
    </div>
  );
}
