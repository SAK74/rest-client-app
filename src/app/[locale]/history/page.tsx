import dynamic from "next/dynamic";

const HistoryClient = dynamic(() => import("./_components/Client"), {
  loading: () => <p>Loading history...</p>,
});

export default async function HistoryPage() {
  return <HistoryClient />;
}
