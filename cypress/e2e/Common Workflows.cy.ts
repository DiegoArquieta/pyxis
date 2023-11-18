import {topMenu, mySavedReports, login} from '../support/pom.js'
let username = Cypress.env('user_name')
let password = Cypress.env('user_pass')
let url = Cypress.env('pyxisdev')

describe('Test the login and landpage', () => {
  beforeEach(() => {
    // run these tests as if in a desktop
    // browser with a 1080p monitor
    cy.viewport(1980, 1080)
    cy.visit(url)
  })

  it('Login to Pyxis app fx', () => {
    login(username, password);
   })

  it.only('Validate My Saved Reports Page', () => {
    login(username, password);
    topMenu();
    mySavedReports();
  })
  

  
})