import Link from "next/link";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface NoRequestsProps {
  t: (data: string) => string;
}

export default function NoRequests({ t }: NoRequestsProps) {
  return (
    <Card className="px-8">
      <CardTitle>{t("no_requests_title")}</CardTitle>
      <CardDescription>
        {t("no_requests_description")}{" "}
        <Link href="/client" className="mt-8 p-4">
          <Button className="font-semibold text-base" variant="link">
            REST client
          </Button>
        </Link>
      </CardDescription>
    </Card>
  );
}
