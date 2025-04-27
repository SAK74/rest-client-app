import dynamic from "next/dynamic";

const Client = dynamic(() => import("../_components/Client"));

export default function Page() {
  return <Client />;
}
