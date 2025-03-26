import { relative } from "path";

/**
 *
 * @param {string[]} filenames
 * @returns {string}
 */
const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames.map((f) => relative(process.cwd(), f)).join(" --file ")}`;

export default {
  "**/*.*": "prettier --ignore-unknown --write",
  "src/**/*.{ts,tsx}": buildEslintCommand,
};
