import { getTranslations } from "next-intl/server";
import Input from "@/app/_components/Input";
import Select from "@/app/_components/Select";
import { Methods } from "@/app/_constants/methods";

const SelectOptions = Methods.map((item) => ({ label: item, value: item }));

export default async function ClientPage() {
  const t = await getTranslations("Client_Page");

  return (
    <section className="flex flex-col items-center py-6">
      <h3>{t("REST_Client")}</h3>
      <div className="flex items-end gap-4">
        <Select label={t("Method")} options={SelectOptions} />
        <Input label={t("Endpoint_URL")} id="url" />
      </div>
    </section>
  );
}
