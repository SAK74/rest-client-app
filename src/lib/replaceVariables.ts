import { getVariables } from "./getVariables";

export function replaceVariables(input: string) {
  if (!input) return input;

  const vars = getVariables();
  const pattern = /{{(.*?)}}/g;

  return input.replace(pattern, (_, varName) => {
    const trimmed = varName.trim();
    return vars[trimmed] ?? `{{${trimmed}}}`;
  });
}
