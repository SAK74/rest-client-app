import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import InputUrl from "@/app/[locale]/client/_components/InputUrl";
import { Methods } from "@/app/_constants/methods";

vi.mock("@/components/Select", () => ({
  Select: ({
    onChange,
    value,
    options,
  }: {
    onChange: (data: string) => void;
    value: string;
    options: { value: string; label: string }[];
  }) => (
    <select
      data-testid="method-select"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((opt: { value: string; label: string }) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  ),
}));

vi.mock("@/components/ui/input", () => ({
  Input: ({ defaultValue, ...props }: { defaultValue: string }) => (
    <input data-testid="url-input" defaultValue={defaultValue} {...props} />
  ),
}));

describe("InputUrl Component", () => {
  const mockMethodChange = vi.fn();
  const mockUrlChange = vi.fn();
  const initialProps = {
    method: "GET",
    onMethodChange: mockMethodChange,
    url: "https://api.example.com",
    onUrlChange: mockUrlChange,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly with initial props", () => {
    render(<InputUrl {...initialProps} />);

    const select = screen.getByTestId("method-select") as HTMLSelectElement;
    expect(select.value).toBe("GET");

    const input = screen.getByTestId("url-input") as HTMLInputElement;
    expect(input.value).toBe("https://api.example.com");
    expect(input).toHaveAttribute("placeholder", "Type URL here...");

    Methods.forEach((method) => {
      expect(screen.getByText(method)).toBeInTheDocument();
    });
  });

  it("calls onMethodChange when method is changed", async () => {
    render(<InputUrl {...initialProps} />);

    const select = screen.getByTestId("method-select");
    await userEvent.selectOptions(select, "POST");

    expect(mockMethodChange).toHaveBeenCalledWith("POST");
  });

  it("submits form and calls onUrlChange on form submit", async () => {
    render(<InputUrl {...initialProps} />);

    const form = screen.getByTestId("url-form");
    const input = screen.getByTestId("url-input");

    await userEvent.clear(input);
    await userEvent.type(input, "https://new-api.example.com");
    fireEvent.submit(form);

    expect(mockUrlChange).toHaveBeenCalledWith("https://new-api.example.com");
  });

  it("submits form and calls onUrlChange on mouse leave", async () => {
    render(<InputUrl {...initialProps} />);

    const form = screen.getByTestId("url-form");
    const input = screen.getByTestId("url-input");

    await userEvent.clear(input);
    await userEvent.type(input, "https://another-api.example.com");
    fireEvent.mouseLeave(form);

    expect(mockUrlChange).toHaveBeenCalledWith(
      "https://another-api.example.com",
    );
  });
});
