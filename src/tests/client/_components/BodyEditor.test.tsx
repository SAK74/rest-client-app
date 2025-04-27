import Body from "@/app/[locale]/client/_components/BodyEditor";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

vi.mock("next/dynamic", () => ({
  __esModule: true,
  default: vi.fn().mockImplementation((loader) => {
    loader().then((module: { default: unknown }) =>
      vi.fn().mockReturnValue(module.default),
    );
    return function MockEditor({ value, onChange }: unknown) {
      return (
        <textarea
          data-testid="mock-monaco-editor"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
        />
      );
    };
  }),
}));

vi.mock("next-themes", () => ({
  useTheme: () => ({ theme: "light" }),
}));

vi.mock("@/components/Select", () => ({
  Select: ({
    onChange,
    value,
  }: {
    onChange: (data: string) => void;
    value: string;
  }) => (
    <select
      data-testid="mode-select"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="json">json</option>
      <option value="text">text</option>
    </select>
  ),
}));

describe("BodyEditor Component", () => {
  const mockOnBodyChange = vi.fn();
  const initialQuery = {};

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default values", () => {
    render(<Body onBodyChange={mockOnBodyChange} query={initialQuery} />);

    expect(screen.getByTestId("mock-monaco-editor")).toBeInTheDocument();
    expect(screen.getByTestId("mode-select")).toHaveValue("json");
    expect(screen.getByText("Ok")).toBeInTheDocument();
  });

  it("changes mode from json to text", async () => {
    render(<Body onBodyChange={mockOnBodyChange} query={initialQuery} />);

    const select = screen.getByTestId("mode-select");
    await userEvent.selectOptions(select, "text");

    expect(select).toHaveValue("text");
  });

  it("validates JSON and shows error state", async () => {
    render(<Body onBodyChange={mockOnBodyChange} query={initialQuery} />);

    const editor = screen.getByTestId("mock-monaco-editor");
    await userEvent.type(editor, "invalid json");

    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("accepts valid JSON", async () => {
    render(<Body onBodyChange={mockOnBodyChange} query={initialQuery} />);

    const editor = screen.getByTestId("mock-monaco-editor");

    await userEvent.type(editor, '{{"valid": true}}', {
      skipClick: true,
    });

    expect(screen.getByRole("button", { name: /ok/i })).not.toBeDisabled();
  });

  it("handles text mode without validation", async () => {
    render(<Body onBodyChange={mockOnBodyChange} query={initialQuery} />);

    const select = screen.getByTestId("mode-select");
    await userEvent.selectOptions(select, "text");

    const editor = screen.getByTestId("mock-monaco-editor");
    await userEvent.type(editor, "any text content");

    expect(screen.getByRole("button")).not.toBeDisabled();
  });

  it("sets Content-Type header when submitting JSON", async () => {
    render(<Body onBodyChange={mockOnBodyChange} query={{}} body="" />);

    const editor = screen.getByTestId("mock-monaco-editor");
    const button = screen.getByRole("button", { name: /ok/i });

    fireEvent.change(editor, { target: { value: '{"test": 123}' } });
    await userEvent.click(button);

    expect(mockOnBodyChange).toHaveBeenCalledTimes(1);

    const [body, params] = mockOnBodyChange.mock.calls[0];

    expect(body).toBe('{"test": 123}');

    const expectedParams = new URLSearchParams();
    expectedParams.set("Content-Type", "application/json");

    expect(params.toString()).toBe(expectedParams.toString());
  });

  it("sets Content-Type header when submitting Text", async () => {
    render(<Body onBodyChange={mockOnBodyChange} query={{}} body="" />);

    const select = screen.getByTestId("mode-select");
    await userEvent.selectOptions(select, "text");

    const editor = screen.getByTestId("mock-monaco-editor");
    const button = screen.getByRole("button", { name: /ok/i });

    fireEvent.change(editor, { target: { value: "test" } });
    await userEvent.click(button);

    expect(mockOnBodyChange).toHaveBeenCalledTimes(1);

    const [body, params] = mockOnBodyChange.mock.calls[0];

    expect(body).toBe("test");

    const expectedParams = new URLSearchParams();
    expectedParams.set("Content-Type", "text/plain; charset=utf-8");

    expect(params.toString()).toBe(expectedParams.toString());
  });

  it("auto-sets text mode when Content-Type is text/plain in query", () => {
    const queryWithTextContent = { "Content-Type": "text/plain" };
    render(
      <Body onBodyChange={mockOnBodyChange} query={queryWithTextContent} />,
    );

    expect(screen.getByTestId("mode-select")).toHaveValue("text");
  });

  it("removes Content-Type when submitting empty body", async () => {
    render(
      <Body onBodyChange={mockOnBodyChange} query={initialQuery} body="" />,
    );

    const button = screen.getByRole("button");
    await userEvent.click(button);

    expect(mockOnBodyChange).toHaveBeenCalledTimes(1);

    const [body, params] = mockOnBodyChange.mock.calls[0];

    expect(body).toBe("");

    const expectedParams = new URLSearchParams();
    expectedParams.delete("Content-Type");

    expect(params.toString()).toBe(expectedParams.toString());
  });
});
