import { Mock, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import HistoryPage from "@/app/[locale]/history/page";

vi.mock("next-intl/server", () => ({
  getLocale: () => Promise.resolve("en"),
  getTranslations: () => (key: string) =>
    key === "history_page" ? "History" : "",
}));

describe("HistoryPage", () => {
  beforeEach(async () => {
    const { auth } = await import("@/auth");
    (auth as Mock).mockResolvedValueOnce(false);
  });

  it("renders dynamic component with loading fallback", async () => {
    const content = await HistoryPage();
    render(content);

    expect(screen.getByText("Loading history...")).toBeInTheDocument();
  });
});
