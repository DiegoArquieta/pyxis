import {topMenu, mySavedReports, login, addKPI} from '../support/pom.ts'
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
  })
  afterEach(function () {
    // Check if the test or a test step failed
    if (this.currentTest.state === 'failed') {
      // Take a screenshot and save it with a meaningful name
      const screenshotName = `${this.currentTest.title}--${Cypress.spec.name}`;
      cy.screenshot(screenshotName);
    }
  });

  it.skip('Login to Pyxis app fx', () => {
    login(username, password);
   })
   it.skip('Validate My Saved Reports Page', () => {
    login(username, password);
    topMenu('Saved');
    mySavedReports();
  })

  it.skip('Validate Top Menu', () => {
    login(username, password);
    topMenu('Saved');
    
  })
  it('Go to dashboard and add a KPI with minimun requirements', () => {

    login(username, password);
    // KPI parameters so far: Merchant, Period and Metrics
    addKPI('NIKE', 'Latest Month', 'Units');
  
  

  
})
})