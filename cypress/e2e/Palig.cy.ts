//import {topMenu, mySavedReports, login} from '../support/pom.js'


describe('Test the login and landpage', () => {
  beforeEach(() => {
    // run these tests as if in a desktop
    // browser with a 1080p monitor
    cy.viewport(1980, 1080)
    cy.visit('https://palig--qa.sandbox.lightning.force.com/lightning/page/home')
  })

  it.only('Login to Pyxis app fx', () => {
    cy.wait(10000)
    cy.get('.htmlelement')
   })

   
})