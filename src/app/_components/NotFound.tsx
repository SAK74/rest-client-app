"use client";

import { Button } from "@/components/ui/button";
import { useRouter, Link } from "@/i18n/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="text-center p-8">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <div className="mt-4 space-x-4">
        <Button variant={"link"} onClick={() => router.back()}>
          Go Back
        </Button>
        <Link href="/">
          <Button variant={"link"}>Go to Home</Button>
        </Link>
      </div>
    </div>
  );
}
