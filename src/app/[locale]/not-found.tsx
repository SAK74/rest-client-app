"use client";

import { useRouter, Link } from "@/i18n/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <div style={{ marginTop: "1rem" }}>
        <button onClick={() => router.back()}>Go Back</button>
        <Link href="/">
          <button style={{ marginLeft: "1rem" }}>Go to Home</button>
        </Link>
      </div>
    </div>
  );
}
