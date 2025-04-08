export function getVariables(): Record<string, string> {
  const raw = localStorage.getItem("rest_client_variables");
  if (!raw) return {};

  try {
    return JSON.parse(raw);
  } catch (error) {
    console.error("Failed to parse variables from localStorage:", error);
    return {};
  }
}
