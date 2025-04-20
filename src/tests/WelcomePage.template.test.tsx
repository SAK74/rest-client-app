import { render, screen } from "@testing-library/react";
import Home from "@/app/[locale]/page";
import type { Mock } from "vitest";

vi.mock("@/i18n/navigation", () => ({
  redirect: vi.fn(),
}));

vi.mock("next-intl/server", () => ({
  getLocale: () => Promise.resolve("en"),
  getTranslations: () => (key: string) =>
    key === "tittle" ? "Welcome Title" : "",
}));

describe.skip("Home Page", () => {
  it("redirects to /client if session exists", async () => {
    const { auth } = await import("@/auth");
    const { redirect } = await import("@/i18n/navigation");
    (auth as Mock).mockResolvedValueOnce(true);

    await Home();

    expect(redirect).toHaveBeenCalledWith({ href: "/client", locale: "en" });
  });

  it("renders the welcome page if no session exists", async () => {
    const { auth } = await import("@/auth");
    (auth as Mock).mockResolvedValueOnce(false);
    const content = await Home();
    render(content);
    expect(screen.getByText("Welcome Title")).toBeInTheDocument();
  });
});
