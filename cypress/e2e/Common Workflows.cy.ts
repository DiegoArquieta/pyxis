import {topMenu, mySavedReports, login, addKPI, removeKPI, logout, accountSettings, createReportbutton, addReport} from '../support/pom.ts'
let username = Cypress.env('user_name')
let password = Cypress.env('user_pass')
let url = Cypress.env('pyxisdev')
let urlQA = Cypress.env('pyxisqa')


describe('Test,login, landp and settings page', () => {
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

   it('Validate My Saved Reports Page', () => {
    topMenu('Saved');
    //mySavedReports();
  })

  it('Validate Top Menu', () => {
    topMenu('');
    
  })

  it('Account settings notifications', () => {
        cy.wait(1000)
        accountSettings('Notifications')
        
    })

    it('Create Top Product report', () => {
      // Select the type of report and which one to build
      createReportbutton('Create from template', ' Top Product Overview ');
      cy.wait(15000)
      addReport('Test Orion Apparel Activewear Online', 'Lululemon', 'Latest 12 Weeks', 'Sales');
    })
})