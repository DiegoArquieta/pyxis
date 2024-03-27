import { login, removeKPI, logout } from '../support/pom.js'
let username = Cypress.env('user_name')
let password = Cypress.env('user_pass')
let url = Cypress.env('pyxisdev')
let urlQA = Cypress.env('pyxisqa')


describe.skip('Test all the KPI functionality', () => {
  beforeEach(() => {
    // run these tests as if in a desktop
    // browser with a 1080p monitor
    cy.viewport(1980, 1080)
    cy.visit(urlQA)
    login(username, password);
  })
  afterEach(function () {
    // Check if the test or a test step failed
    if (this.currentTest.state === 'failed') {
      // Take a screenshot and save it with a meaningful name
      const screenshotName = `${this.currentTest.title}--${Cypress.spec.name}`;
      cy.screenshot(screenshotName);
    }
    logout()
  });
  it('Remove "N" numbers of KPI, by deleting the first one several times', () => {
    try {
      let numberOfRuns = 10;
      for (let i = 0; i < numberOfRuns; i++) {
        cy.wait(8000)
        removeKPI()
    cy.visit(urlQA)
    cy.wait(8000)
    }
   } catch (error) {
      // Handle the error, log it, or perform any other necessary action
      cy.log(`Error: ${error.message}`);
    }
  

  })
})