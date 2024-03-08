import { login, addKPI, addKPI2, removeKPI, logout } from '../support/pom.ts'
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

  it('Go to dashboard and validate that you need the minimum requirements for a KPI(Merchant missing)', () => {
    try {
      // KPI parameters so far: Merchant, Period, and Metrics
      addKPI2('Nik', 'Latest 4 weeks', 'Sales');
      cy.wait(15000);
    } catch (error) {
      // Handle the error, log it, or perform any other necessary action
      cy.log(`Error: ${error.message}`);
    }
  });
       
})