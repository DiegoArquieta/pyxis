import { defineConfig } from "cypress";

export default defineConfig({
  projectId: 'mw72gu',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  viewportWidth: 1980,
  viewportHeight: 1080,
});

