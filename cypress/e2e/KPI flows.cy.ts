import { login, addKPI, removeKPI, logout } from '../support/pom.ts'
let username = Cypress.env('user_name')
let password = Cypress.env('user_pass')
let url = Cypress.env('pyxisdev')
let urlQA = Cypress.env('pyxisqa')


describe('Test all the KPI functionality', () => {
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

  it.skip('Go to dashboard and add a KPI with minimun requirements', () => {
    // KPI parameters so far: Merchant, Period and Metrics
    addKPI('Lululemon', 'Latest Month', 'Sales');
    cy.wait(15000)
  })
  it.skip('Go to dashboard and add a KPI with minimun requirements', () => {
    // KPI parameters so far: Merchant, Period and Metrics
    addKPI('Nike', 'Latest 52 Weeks', 'Units');
    cy.wait(15000)
  })
  it.skip('Go to dashboard and validate that you need the minimum requirements for a KPI (Merchant missing)', () => {
    try {
      // KPI parameters so far: Merchant, Period, and Metrics
      addKPI('', 'Latest 4 Weeks', 'Sales');
      cy.wait(15000);
    } catch (error) {
      // Handle the error, log it, or perform any other necessary action
      cy.log(`Error: ${error.message}`);
    }
  });
  it.skip('Go to dashboard and validate that you need the minimum requirements for a KPI(Period missing)', () => {
    try {
      // KPI parameters so far: Merchant, Period, and Metrics
      addKPI('Nike', '', '');
      cy.wait(15000);
    } catch (error) {
      // Handle the error, log it, or perform any other necessary action
      cy.log(`Error: ${error.message}`);
    }
  });

  it.skip('Go to dashboard and validate that you need the minimum requirements for a KPI(Merchant missing)', () => {
    try {
      // KPI parameters so far: Merchant, Period, and Metrics
      addKPI('', 'Latest 4 weeks', 'Sales');
      cy.wait(15000);
    } catch (error) {
      // Handle the error, log it, or perform any other necessary action
      cy.log(`Error: ${error.message}`);
    }
  });
66
  

  it.skip('Add "N" KPIs', () => {
    let numberOfRuns = 3;
    for (let i = 0; i < numberOfRuns; i++) {
      // KPI parameters so far: Merchant, Period, and Metrics
      addKPI('Lululemon', 'Latest Month', 'Sales');
      cy.wait(15000);
    }
  })
  
  it('Remove "N" numbers of KPI, by deleting the first one several times', () => {
  
  let numberOfRuns = 106;
    for (let i = 0; i < numberOfRuns; i++) {
      cy.wait(8000)
      removeKPI()
  cy.visit(urlQA)
  cy.wait(8000)

}
  })
  
})