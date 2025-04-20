import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NotFound from "@/app/_components/NotFound";

const back = vi.fn();

vi.mock("@/i18n/navigation", () => ({
  useRouter: () => ({ back }),
  Link: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

describe("NotFound component", () => {
  it("renders 404 message", () => {
    render(<NotFound />);
    expect(screen.getByText("404 - Page Not Found")).toBeInTheDocument();
  });

  it("calls router.back() on 'Go Back' click", async () => {
    render(<NotFound />);
    await userEvent.click(screen.getByText("Go Back"));
    expect(back).toHaveBeenCalled();
  });

  it("has a working home link", () => {
    render(<NotFound />);
    const link = screen.getByText("Go to Home").closest("a");
    expect(link).toHaveAttribute("href", "/");
  });
});
