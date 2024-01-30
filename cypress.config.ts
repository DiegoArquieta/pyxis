import { defineConfig } from "cypress";

export default defineConfig({
  projectId: 'mw72gu',
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      // implement node event listeners here
      
    },
  },
  viewportWidth: 1980,
  viewportHeight: 1080,
});

