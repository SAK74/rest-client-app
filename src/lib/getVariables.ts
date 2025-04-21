import { VARIABLES_KEY } from "./hooks/useLocalStorage";

export function getVariables(): Record<string, string> | undefined {
  if (typeof window === "undefined") {
    return undefined;
  }
  const raw = localStorage.getItem(VARIABLES_KEY);
  if (!raw) return {};

  try {
    return JSON.parse(raw);
  } catch (error) {
    console.error("Failed to parse variables from localStorage:", error);
    return {};
  }
}
