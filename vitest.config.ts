import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import tsconfigpaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigpaths()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/tests/setup.ts",
    coverage: {
      provider: "v8",
      exclude: ["src/components/ui"],
      include: ["src/**/*.tsx"],
    },
  },
});
