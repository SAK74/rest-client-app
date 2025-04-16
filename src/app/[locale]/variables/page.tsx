"use client";
import dynamic from "next/dynamic";

const VariablesClient = dynamic(() => import("./VariablesClient"), {
  loading: () => <p>Loading variables...</p>,
  ssr: false,
});

export default function VariablesPage() {
  return <VariablesClient />;
}
