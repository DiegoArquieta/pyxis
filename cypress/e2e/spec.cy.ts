import {login} from '../support/pom.ts'
let username = Cypress.env('user_name')
let password = Cypress.env('pass')
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

  it.only('Validate upper menu', () => {
    login(username, password);
    
    cy.contains('Overview')
    cy.get(':nth-child(1) > .w-auto > .px-3 > .flex > .text-sm').should('have.text', 'a\u00a0')
    cy.get(':nth-child(2) > .w-auto > .px-3 > .flex > .text-sm').should('have.text', 'Assets Library\u00a0')
  })

  
})