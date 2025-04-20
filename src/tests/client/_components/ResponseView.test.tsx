import { render, screen, waitFor } from "@testing-library/react";
import ResponseView from "@/app/[locale]/client/_components/ResponseView";
import { vi } from "vitest";

vi.mock("next-themes", () => ({
  useTheme: () => ({ resolvedTheme: "light" }),
}));

vi.mock("@monaco-editor/react", () => ({
  __esModule: true,
  default: ({ value }: { value: string }) => (
    <div data-testid="monaco">{value}</div>
  ),
}));

describe("ResponseView", () => {
  it("renders fallback if no response", () => {
    render(<ResponseView />);
    expect(screen.getByText("No response yet")).toBeInTheDocument();
  });

  it("renders status, headers and body", async () => {
    const mockResponse = {
      status: 200,
      statusText: "OK",
      headers: new Headers({
        "content-type": "application/json",
        "x-custom": "value",
      }),
      text: vi.fn().mockResolvedValue('{ "success": true }'),
    } as unknown as Response;

    render(<ResponseView response={mockResponse} />);

    expect(screen.getByText("Status:")).toBeInTheDocument();
    expect(screen.getByText(/200 OK/)).toBeInTheDocument();

    await waitFor(() => {
      expect(
        screen.getByText((content) => content.includes("content-type")),
      ).toBeInTheDocument();
      expect(
        screen.getByText((content) => content.includes("application/json")),
      ).toBeInTheDocument();
      expect(
        screen.getByText((content) => content.includes("x-custom")),
      ).toBeInTheDocument();
      expect(
        screen.getByText((content) => content.includes("value")),
      ).toBeInTheDocument();
      expect(screen.getByTestId("monaco")).toHaveTextContent(
        '{ "success": true }',
      );
    });
  });

  it("shows error if reading body fails", async () => {
    const mockResponse = {
      status: 500,
      statusText: "Internal Server Error",
      headers: new Headers(),
      text: vi.fn().mockRejectedValue(new Error("fail")),
    } as unknown as Response;

    render(<ResponseView response={mockResponse} />);

    await waitFor(() => {
      expect(screen.getByTestId("monaco")).toHaveTextContent(
        "Could not read body",
      );
    });
  });
});
