import { defineConfig } from "rolldown";

export default defineConfig({
  input: "src/index.ts",
  output: {
    format: "es",
    file: "dist/index.js",
    minify: true,
  },
});
