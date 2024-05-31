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

  it('Go to dashboard and add a KPI with minimun requirements: latest month', () => {
    // KPI parameters so far: Data Source, Merchant, Period and Metrics
    addKPI(' Test - Apparel Online - Jeans ', 'Under Armour', 'Latest Month', 'Sales');
    cy.wait(15000)
  })
  it('Bug #13 validation', () => {
    // KPI parameters so far: Data Source, Merchant, Period and Metrics
    addKPI(' Test - Apparel Online - Jeans ', 'Lululemon', 'Latest Month', 'Sales');
    cy.wait(15000)
  })
  it('Go to dashboard and add a KPI with minimun requirements: Latest 52 weeks', () => {
    // KPI parameters so far: Data Source, Merchant, Period and Metrics
    addKPI(' Test - Apparel Online - Jeans ', 'Asos', 'Latest 52 Weeks', 'Sales');
    cy.wait(15000)
  })
  it('Go to dashboard and validate that you need the minimum requirements for a KPI (Merchant missing)', () => {
    try {
      // KPI parameters so far: Merchant, Period, and Metrics
      addKPI(' Test - Apparel Online - Jeans ', '', 'Latest 4 Weeks', 'Sales');
      cy.wait(15000);
    } catch (error) {
      // Handle the error, log it, or perform any other necessary action
      cy.log(`Error: ${error.message}`);
    }
  });
  it.only('Go to dashboard and validate that you need the minimum requirements for a KPI(Period missing)', () => {
    try {
      // KPI parameters so far: Merchant, Period, and Metrics
      addKPI(' Test - Apparel Online - Jeans ', 'Gap', '', 'Sales');
      cy.wait(15000);
    } catch (error) {
      // Handle the error, log it, or perform any other necessary action
      cy.log(`Error: ${error.message}`);
    }
  });

  
  
  it('Add "N" KPIs', () => {
    //Enter here how many KPI would you like to create
    let numberOfRuns = 2;
    for (let i = 0; i < numberOfRuns; i++) {
      // KPI parameters so far: Merchant, Period, and Metrics
      addKPI(' Test - Apparel Online - Jeans ', 'Asos', 'Latest Month', 'Sales');
      cy.wait(15000);
    }
  })
  
  it('Remove "N" numbers of KPI, by deleting the first one several times', () => {
  //Enter here how many KPI you want to delete. Take into consideration how many are already, otherwise is gonna fail.
  let numberOfRuns = 4;
    for (let i = 0; i < numberOfRuns; i++) {
      cy.wait(8000)
      removeKPI()
  cy.visit(urlQA)
  cy.wait(8000)

}
  })
  
})