import {topMenu, mySavedReports, login, addKPI, removeKPI, logout, accountSettings} from '../support/pom.ts'
let username = Cypress.env('user_name')
let password = Cypress.env('user_pass')
let url = Cypress.env('pyxisdev')
let urlQA = Cypress.env('pyxisqa')


describe('Test the login and landpage', () => {
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

   it.skip('Validate My Saved Reports Page', () => {
    topMenu('Saved');
    //mySavedReports();
  })

  it.skip('Validate Top Menu', () => {
    topMenu('');
    
  })
  it.skip('Go to dashboard and add a KPI with minimun requirements', () => {
    // KPI parameters so far: Merchant, Period and Metrics
    addKPI('LULULEMON', 'Latest Month', 'Units');
    cy.wait(15000)
  })

  it.skip('Go to dashboard and add a KPI with minimun requirements', () => {
    // KPI parameters so far: Merchant, Period and Metrics
    addKPI('NIKE', 'Latest 4 weeks', 'Sales');
    cy.wait(15000)
  })

  it.skip('Add "N" KPIs', () => {
    let numberOfRuns = 5;
    for (let i = 0; i < numberOfRuns; i++) {
      // KPI parameters so far: Merchant, Period, and Metrics
      addKPI('LULULEMON', 'Latest Month', 'Units');
      cy.wait(15000);
    }
  })
  
  it.skip('Remove "N" numbers of KPI, by deleting the first one several times', () => {
  
  let numberOfRuns = 3;
    for (let i = 0; i < numberOfRuns; i++) {
      cy.wait(20000)
      removeKPI()
  cy.visit(urlQA)
  cy.wait(4000)

}
  })
  it('Account settings', () => {
        cy.wait(1000)
        accountSettings('Notifications')
        
    })
})