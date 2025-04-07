import dynamic from "next/dynamic";

const VariablesClient = dynamic(() => import("./VariablesClient"), {
  loading: () => <p>Loading variables...</p>,
});

export default async function VariablesPage() {
  return <VariablesClient />;
}
