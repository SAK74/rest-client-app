import Select from "@/app/_components/Select";
import { Methods } from "@/app/_constants/methods";
import { getTranslations } from "next-intl/server";

const SelectOptions = Methods.map((item) => ({ label: item, value: item }));

export default async function ClientPage() {
  const t = await getTranslations("Client_Page");

  return (
    <div>
      <h3>{t("REST_Client")}</h3>
      <Select label={t("Method")} options={SelectOptions} />
    </div>
  );
}
