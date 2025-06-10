import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "42hqvg",

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite", // o 'webpack' según tu setup
    },
    indexHtmlFile: "cypress/support/component-index.html",
  },
});
