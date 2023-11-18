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
     //cy.wait(10000)
     cy.get('.button').should('have.value', 'Verify').click()
     cy.get('.js-forgot-password').should('have.text', 'Forgot password?')
     cy.get('.js-cancel').should('have.text', 'Back to sign in')
     //cy.wait(5000)
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

  export function mySavedReports (){

    cy.contains('Assets Library').click()
    cy.get('.bg-white > :nth-child(1) > .text-gray-500').should('have.text', 'My Saved Reports').click()
    cy.get('.flex-row > .flex > .w-full').invoke('attr', 'placeholder').should('contain', 'Search...')
    cy.get('[col-id="name"]').should('have.attr', 'aria-description', 'Press Space to toggle all rows selection (unchecked) Press ENTER to sort. Press CTRL ENTER to open column menu.')
    cy.get('[col-id="name"] > .ag-header-cell-comp-wrapper > .ag-cell-label-container > .ag-header-cell-label > .ag-header-cell-text').should('have.text', 'NAME').and('be.visible')
    cy.get('[col-id="lastViewed"] > .ag-header-cell-comp-wrapper > .ag-cell-label-container > .ag-header-cell-label > .ag-header-cell-text').should('have.text', 'LAST VIEWED').and('be.visible')
    cy.get('[col-id="lastViewed"]').should('have.attr', 'aria-description', 'Press ENTER to sort. Press CTRL ENTER to open column menu.')
    cy.get('[col-id="lastUpdated"] > .ag-header-cell-comp-wrapper > .ag-cell-label-container > .ag-header-cell-label > .ag-header-cell-text').should('have.text', 'LAST MODIFIED').and('be.visible')
    cy.get('[col-id="lastUpdated"]').should('have.attr', 'aria-description', 'Press ENTER to sort. Press CTRL ENTER to open column menu.')
    cy.get('[col-id="owner"] > .ag-header-cell-comp-wrapper > .ag-cell-label-container > .ag-header-cell-label > .ag-header-cell-text').should('have.text', 'OWNER').and('be.visible')
    cy.get('[col-id="owner"]').should('have.attr', 'aria-description', 'Press ENTER to sort. Press CTRL ENTER to open column menu.')
    
    cy.get('[col-id="0"] > .ag-header-cell-comp-wrapper > .ag-cell-label-container > .ag-header-cell-label > .ag-header-cell-text').should('have.text', 'PIN').and('be.visible')

    cy.get('.text-container').eq(0).should('have.text', 'Share')
    cy.get('.text-container').eq(1).should('have.text', 'Delete')
    cy.get('#ag-33-input').should('exist').should('have.attr', 'aria-label', 'Press Space to toggle all rows selection (unchecked)')
  }

  export function topMenu () {
    cy.get('.flex.flex-nowrap.justify-between.px-5.py-3.items-center').should('be.visible')
    cy.get('a > img').should('be.visible')
    cy.get(':nth-child(3) > .flex-col > .px-3 > .flex > .text-sm').should('be.visible').and('have.text', ' Assets Library ')
    cy.get('.justify-left > :nth-child(4) > .flex-col > .px-3').should('be.visible').and('have.text', ' Create new report ')
    cy.get('.notification-icon-btn > .flex > .my-auto').should('be.visible')
    cy.get('.help-icon-btn > .flex > .my-auto').should('be.visible')
    cy.get('.ml-auto > lib-dropdown > .flex-col > .px-3 > div.flex > .text-sm').should('be.visible')





  }