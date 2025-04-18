import { Mock } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ClientPage from "@/app/[locale]/history/_components/Client";
import { useLocalStorage } from "@/lib/hooks/useLocalStorage";
import { type HistoryItem } from "@/lib/prepareHistory";
import { getFullClientLink } from "@/lib/getFullClientLink";

vi.mock("@/lib/hooks/useLocalStorage");
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) =>
    ({
      history_page: "History Page",
      no_requests: "No requests yet",
      no_requests_description: "Make your first request to see history",
      clear_history: "Clear history",
    })[key],
}));
vi.mock("@/app/_components/Loader", () => ({
  default: () => <div>Loading mock</div>,
}));

const mockHistory: HistoryItem[] = [
  {
    method: "GET",
    url: "http://api/users",
    body: "",
    headers: {},
  },
  {
    method: "POST",
    url: "http://api/users/login",
    body: '{"username":"test"}',
    headers: { "Content-Type": "application/json" },
  },
];

const mockHistoryJSON = JSON.stringify(mockHistory);

describe("History ClientPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loader while loading history", () => {
    (useLocalStorage as Mock).mockReturnValue(["", vi.fn(), true]);

    render(<ClientPage />);
    expect(screen.getByText("Loading mock")).toBeInTheDocument();
  });

  it("shows empty state when no history exists", () => {
    (useLocalStorage as Mock).mockReturnValue(["", vi.fn(), false]);

    render(<ClientPage />);
    expect(
      screen.getByText("Make your first request to see history"),
    ).toBeInTheDocument();
  });

  it("displays history items when loaded", () => {
    (useLocalStorage as Mock).mockReturnValue([
      mockHistoryJSON,
      vi.fn(),
      false,
    ]);

    render(<ClientPage />);

    expect(screen.getByText("History Page")).toBeInTheDocument();
    expect(
      screen.getByText(`${mockHistory[0].method} ${mockHistory[0].url}`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${mockHistory[1].method} ${mockHistory[1].url}`),
    ).toBeInTheDocument();
  });

  it("renders correct links for history items", () => {
    (useLocalStorage as Mock).mockReturnValue([
      mockHistoryJSON,
      vi.fn(),
      false,
    ]);

    render(<ClientPage />);

    const firstLink = screen
      .getByText(`${mockHistory[0].method} ${mockHistory[0].url}`)
      .closest("a");
    expect(firstLink).toHaveAttribute(
      "href",
      getFullClientLink(mockHistory[0]),
    );

    const secondLink = screen
      .getByText(`${mockHistory[1].method} ${mockHistory[1].url}`)
      .closest("a");
    expect(secondLink).toHaveAttribute(
      "href",
      getFullClientLink(mockHistory[1]),
    );
  });

  it("shows clear history button when history exists", () => {
    (useLocalStorage as Mock).mockReturnValue([
      mockHistoryJSON,
      vi.fn(),
      false,
    ]);

    render(<ClientPage />);
    expect(screen.getByText("Clear history")).toBeInTheDocument();
  });

  it("does not show clear history button when no history", () => {
    (useLocalStorage as Mock).mockReturnValue(["", vi.fn(), false]);

    render(<ClientPage />);
    expect(screen.queryByText("Clear history")).not.toBeInTheDocument();
  });
});

describe("History ClientPage interactions", () => {
  let mockSetHistory: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockSetHistory = vi.fn();
    (useLocalStorage as Mock).mockReturnValue([
      JSON.stringify(mockHistory),
      mockSetHistory,
      false,
    ]);
  });

  it("calls clear history when button clicked", async () => {
    const user = userEvent.setup();
    render(<ClientPage />);

    await user.click(screen.getByText("Clear history"));

    expect(mockSetHistory).toHaveBeenCalledTimes(1);
  });
});
