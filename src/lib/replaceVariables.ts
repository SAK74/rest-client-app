export function replaceVariables(input: string, vars: Record<string, string>) {
  if (!input) return input;
  const pattern = /{{(.*?)}}/g;
  return input.replace(pattern, (_, varName) => {
    const trimmed = varName.trim();
    return vars[trimmed] ?? `{{${trimmed}}}`;
  });
}
