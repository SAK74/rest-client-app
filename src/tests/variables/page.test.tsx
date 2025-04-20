import { Mock, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import VariablesPage from "@/app/[locale]/variables/page";

vi.mock("next-intl/server", () => ({
  getLocale: () => Promise.resolve("en"),
}));

describe("VariablesPage", () => {
  beforeEach(async () => {
    const { auth } = await import("@/auth");
    (auth as Mock).mockResolvedValueOnce(false);
  });

  it("renders dynamic component with loading fallback", async () => {
    const content = await VariablesPage();
    render(content);

    expect(screen.getByText("Loading variables...")).toBeInTheDocument();
  });
});
