"use client";

import { notFound } from "next/navigation";
import { Link, usePathname } from "@/i18n/navigation";
import React from "react";

export default function AnyPage() {
  const pathname = usePathname();
  const params = pathname.split("/").filter(Boolean).slice(1);
  const anyParams = params.length > 0 ? params.join("/") : "";

  const validPaths = ["client", "variables", "login", "register", "home"];

  if (!validPaths.includes(params[0])) {
    notFound();
  }

  return (
    <div>
      <h1>Any page (AnyPage)</h1>
      <p>This is the dynamic page handler for `/en/[any]`</p>
      <p>Path: {anyParams}</p>

      <div style={{ marginTop: "1rem" }}>
        <Link href="/client">Go to Client</Link>
        <br />
        <Link href="/variables">Go to Variables</Link>
      </div>
    </div>
  );
}
