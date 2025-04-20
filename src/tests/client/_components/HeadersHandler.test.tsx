import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, Mock } from "vitest";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import Headers from "@/app/[locale]/client/_components/HeadersHandler";

vi.mock("react-hook-form", async () => {
  const actual = await vi.importActual("react-hook-form");
  return {
    ...actual,
    useForm: vi.fn().mockReturnValue({
      control: {},
      handleSubmit: vi.fn((fn) => fn),
      reset: vi.fn(),
      formState: { errors: {} },
      getValues: vi.fn(),
      setValue: vi.fn(),
      watch: vi.fn(),
    }),
  };
});

vi.mock("next/navigation", () => ({
  useSearchParams: vi.fn(),
}));

vi.mock("@/lib/replaceVariables", () => ({
  encodeVars: (value: string) => `encoded_${value}`,
  decodeVars: (value: string) => value.replace("encoded_", ""),
}));

describe("Headers Component", () => {
  const mockOnQueryChange = vi.fn();
  const mockSearchParams = new URLSearchParams("test=value&auth=token");

  beforeEach(() => {
    (useSearchParams as Mock).mockReturnValue(mockSearchParams);

    (useForm as Mock).mockReturnValue({
      control: {},
      handleSubmit: (fn: unknown) => fn,
      reset: vi.fn(),
      formState: { errors: {} },
      getValues: vi.fn(),
      setValue: vi.fn(),
      watch: vi.fn(),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders headers table with initial data", () => {
    const initialQuery = { test: "value", auth: "token" };
    render(<Headers query={initialQuery} onQueryChange={mockOnQueryChange} />);

    expect(screen.getByText("Headers:")).toBeInTheDocument();
    expect(screen.getByText("Key")).toBeInTheDocument();
    expect(screen.getByText("Value")).toBeInTheDocument();
    expect(screen.getByText("test")).toBeInTheDocument();
    expect(screen.getByText("encoded_value")).toBeInTheDocument();
    expect(screen.getByText("auth")).toBeInTheDocument();
    expect(screen.getByText("encoded_token")).toBeInTheDocument();
  });

  it("deletes header", async () => {
    const initialQuery = { "to-delete": "value" };
    render(<Headers query={initialQuery} onQueryChange={mockOnQueryChange} />);

    const deleteButtons = screen.getAllByText("Delete");
    await userEvent.click(deleteButtons[0]);

    expect(mockOnQueryChange).toHaveBeenCalledWith(
      expect.not.stringContaining("to-delete=value"),
    );
  });

  it("disables edit/delete for protected headers", async () => {
    const initialQuery = { "content-type": "application/json" };
    render(<Headers query={initialQuery} onQueryChange={mockOnQueryChange} />);

    const editButtons = screen.getAllByText("Edit");
    const deleteButtons = screen.getAllByText("Delete");

    expect(editButtons[0]).toBeDisabled();
    expect(deleteButtons[0]).toBeDisabled();
  });
});
