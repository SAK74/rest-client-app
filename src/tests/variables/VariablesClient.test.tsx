import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import VariablesClient from "@/app/[locale]/variables/VariablesClient";

describe("VariablesClient", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders existing variables", () => {
    localStorage.setItem(
      "rest_client_variables",
      JSON.stringify({ foo: "bar" }),
    );
    render(<VariablesClient />);

    const item = screen.getByText("foo").closest("li");
    expect(item).toBeInTheDocument();
    expect(item).toHaveTextContent("foo = bar");
  });

  it("adds a new variable", async () => {
    render(<VariablesClient />);

    fireEvent.change(screen.getByPlaceholderText("Variable name"), {
      target: { value: "token" },
    });
    fireEvent.change(screen.getByPlaceholderText("Variable value"), {
      target: { value: "123" },
    });
    fireEvent.click(screen.getByText("Add/Update"));

    await waitFor(() => {
      const item = screen.getByText("token").closest("li");
      expect(item).toHaveTextContent("token = 123");
    });
  });

  it("updates an existing variable", async () => {
    localStorage.setItem(
      "rest_client_variables",
      JSON.stringify({ token: "123" }),
    );
    render(<VariablesClient />);

    fireEvent.change(screen.getByPlaceholderText("Variable name"), {
      target: { value: "token" },
    });
    fireEvent.change(screen.getByPlaceholderText("Variable value"), {
      target: { value: "456" },
    });
    fireEvent.click(screen.getByText("Add/Update"));

    await waitFor(() => {
      const item = screen.getByText("token").closest("li");
      expect(item).toHaveTextContent("token = 456");
    });
  });

  it("deletes a variable", async () => {
    localStorage.setItem(
      "rest_client_variables",
      JSON.stringify({ foo: "bar" }),
    );
    render(<VariablesClient />);

    const deleteBtn = screen.getByText("Delete");
    fireEvent.click(deleteBtn);

    await waitFor(() => {
      expect(screen.queryByText("foo")).not.toBeInTheDocument();
    });
  });

  it("writes to localStorage when variables change", async () => {
    render(<VariablesClient />);

    fireEvent.change(screen.getByPlaceholderText("Variable name"), {
      target: { value: "key" },
    });
    fireEvent.change(screen.getByPlaceholderText("Variable value"), {
      target: { value: "val" },
    });
    fireEvent.click(screen.getByText("Add/Update"));

    await waitFor(() => {
      const stored = JSON.parse(
        localStorage.getItem("rest_client_variables") || "{}",
      );
      expect(stored.key).toBe("val");
    });
  });
});
