import { getTranslations } from "next-intl/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Headers from "../_components/Headers";
import InputUrl from "../_components/InputUrl";

export default async function ClientPage() {
  const t = await getTranslations("Client_Page");

  return (
    <div className="flex flex-col gap-8 py-4 items-center">
      <Card className="mx-6 w-4xl">
        <CardHeader>
          <CardTitle className="flex flex-col items-center">
            {t("REST_Client")}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-8">
          <InputUrl />
          <Headers />
        </CardContent>
      </Card>
      <Card className="mx-6 w-4xl">
        <CardHeader>
          <CardTitle className="flex flex-col items-center">Response</CardTitle>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </div>
  );
}
