import {topMenu, login, logout, accountSettings} from '../support/pom.ts'
let username = Cypress.env('user_name')
let password = Cypress.env('user_pass')
let url = Cypress.env('pyxisdev')
let urlQA = Cypress.env('pyxisqa')


describe('Validate the UI on Dashboard, My saved reports, Reports shared with me, notifications and Account settings', () => {
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

  it('Validate Top Menu', () => {
    topMenu('');
    
  })

  it('Validate My Saved Reports Page', () => {
    topMenu('Saved');
    //mySavedReports();
  })

  it('Validate Shared with me Page', () => {
    topMenu('Shared');
    //mySavedReports();
  })

  it('Validate Account settings', () => {
        cy.wait(1000)
        accountSettings('Notifications')
        
    })
})