"use client";

import { notFound } from "next/navigation";
import { useParams } from "next/navigation";
import React from "react";

export default function AnyPage() {
  const params = useParams();
  const anyParams = params.any || "";
  const path = Array.isArray(anyParams) ? anyParams.join("/") : anyParams;

  const validPaths = ["client", "variables", "login", "register", "home"];

  if (!validPaths.includes(path)) {
    notFound();
  }

  return (
    <div>
      <h1>Any page (AnyPage)</h1>
      <p>This is the dynamic page handler for `/en/[any]`</p>
      <p>Path: {anyParams}</p>
    </div>
  );
}
