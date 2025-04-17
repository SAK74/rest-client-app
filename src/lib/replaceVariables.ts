import { getVariables } from "./getVariables";

export function decodeVars(input: string) {
  if (!input) return input;

  const vars = getVariables();
  const pattern = /{{(.*?)}}/g;

  return input.replace(pattern, (_, varName: string) => {
    const trimmed = varName.trim();
    return vars ? vars[trimmed] : `{{${trimmed}}}`;
  });
}

export const encodeVars = (input: string) => {
  const vars = getVariables();

  if (!input) return input;
  if (!vars) {
    return "";
  }
  let result = input;

  Object.entries(vars).forEach(([key, value]) => {
    result = result.replaceAll(value, `{{${key}}}`);
  });

  return result;
};
