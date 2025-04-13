import dynamic from "next/dynamic";

const Client = dynamic(() => import("../_components/Client"));

// try to type http://localhost:3000/client/POST/aHR0cHM6Ly9qc29ucGxhY2Vob2xkZXIudHlwaWNvZGUuY29tL3Bvc3Rz/eyJ0aXRsZSI6ImZha2VUaXRsZSIsInVzZXJJZCI6MSwiYm9keSI6ImZha2VNZXNzYWdlIn0=?Content-Type=application%2Fjson

export default function Page() {
  return <Client />;
}
