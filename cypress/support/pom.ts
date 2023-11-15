export function login(username, password){
     //Validate elements that should be displayed on the page
     cy.get('.okta-form-title.o-form-head').should('have.text', 'Welcome to Pyxis')
     cy.get('.okta-form-label').should('have.text','Email\u00a0')
    // cy.get('label[for="okta-signin-password"]').should('have.text','Password\u00a0')
 
     //Enter credentials and click button to login
     cy.get('#input28').type(Cypress.env('user_name'), { log: false })
     cy.get('.custom-checkbox > label').should('have.text', 'Keep me signed in')
     cy.get('.js-unlock').should('have.text', 'Unlock account?')
     cy.get('.js-help').should('have.text', 'Help')
     
     cy.get('.button').should('have.value', 'Next').click()
 
     cy.get('.okta-form-title').should('have.text', 'Verify with your password')
     cy.get('.identifier').should('have.text', username, { log: false })
     cy.get('#input60').type(password, { log: false })
     cy.wait(10000)
     cy.get('.button').should('have.value', 'Verify').click()
     cy.get('.js-forgot-password').should('have.text', 'Forgot password?')
     cy.get('.js-cancel').should('have.text', 'Back to sign in')
     cy.wait(5000)
    // cy.get('span.text-3xl.font-bold:contains("Welcome, Diego")')
   //.should('be.visible')
   cy.get('span.text-3xl.font-bold')
   .should('be.visible').and('have.text', 'Welcome, Diego')
  }
  
  // and now somewhere in a test
  //logout();

  export function menuValidation (){

    cy.contains('Overview')
    cy.get(':nth-child(1) > .w-auto > .px-3 > .flex > .text-sm').should('have.text', 'a\u00a0')
    cy.get(':nth-child(2) > .w-auto > .px-3 > .flex > .text-sm').should('have.text', 'Assets Library\u00a0')



  }