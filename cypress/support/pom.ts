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

    cy.get('.my-auto > img').should('be.visible')
    cy.get('[ng-reflect-router-link="/assets/saved"]').should('be.visible').and('have.text', 'My Saved Reports')
    cy.get('[ng-reflect-router-link="/assets/shared"]').should('be.visible').and('have.text', 'Shared With Me')
    }

  export function mySavedReports (){

    let idColumnName = cy.get('[col-id="name"] > .ag-header-cell-comp-wrapper > .ag-cell-label-container > .ag-header-cell-label > .ag-header-cell-text')
    

    cy.contains('My Saved Reports').click()
    cy.get('.justify-between > .text-3xl').should('have.text', ' My Saved Reports ').click()
    cy.get('.flex-row > .flex > .w-full').invoke('attr', 'placeholder').should('contain', 'Search...')
    cy.get('[col-id="name"]').should('have.attr', 'aria-description', 'Press Space to toggle all rows selection (unchecked) Press ENTER to sort. Press CTRL ENTER to open column menu.')
    idColumnName.should('have.text', 'NAME').and('be.visible')
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

  export function topMenu (menuOption) {
    cy.get('.flex.flex-nowrap.justify-between.px-5.py-3.items-center').should('be.visible')
    cy.get('.my-auto > img').should('be.visible')
    cy.get('[ng-reflect-router-link="/assets/saved"]').should('be.visible').and('have.text', 'My Saved Reports')
    cy.get('[ng-reflect-router-link="/assets/shared"]').should('be.visible').and('have.text', 'Shared With Me')
    cy.get('.notification-icon-btn > .flex > .my-auto').should('be.visible')
    cy.get('.help-icon-btn > .flex > .my-auto').should('be.visible')
    cy.get('.ml-auto > lib-dropdown > .flex-col > .px-3 > div.flex > .text-sm').should('be.visible')
    cy.get('lib-dropdown.m-auto > .flex-col > .px-3').should('be.visible').and('have.text', ' Create New Report ')

    // Parameter-based logic
  if (menuOption === 'Saved') {
    cy.get('[ng-reflect-router-link="/assets/saved"]').should('be.visible').and('have.text', 'My Saved Reports').click();
  } else if (menuOption === 'Shared') {
    cy.get('[ng-reflect-router-link="/assets/shared"]').should('be.visible').and('have.text', 'Shared With Me').click();
    // Add code for handling "Shared" case
  } else {
    // Handle other cases or provide a default behavior
    // You can also throw an error for an unsupported parameter
    cy.log(`Unsupported action: ${menuOption}`);
    throw new Error('The condition was not met!')
  }
  }
  export function createReportbutton (reportOption) {
    let reportButton = cy.get('lib-dropdown.m-auto > .flex-col > .px-3').should('be.visible').and('have.text', ' Create New Report ')
    reportButton.click()

    

    // Parameter-based logic
  if (reportOption === 'Build a table') {
    cy.get(':nth-child(1) > .text-gray-500').should('be.visible').and('have.text', 'Build a table').click();
  } else if (reportOption === 'Create from template') {
    cy.get(':nth-child(2) > .text-gray-500').should('be.visible').and('have.text', 'Create from template').click();
    // Add code for handling "Create from template" case
  } else {
    // Handle other cases or provide a default behavior
    // You can also throw an error for an unsupported parameter
    throw new Error(`Unsupported action: ${reportOption}`);
  }




  }
//, geography, customer, product, period, metrics
  export function addKPI (merchant, period, metrics) {
    cy.contains('Add KPI').click()
    cy.contains('RAKUTEN QA APPAREL ACTIVEWEAR ERECEIPT').click()
    cy.contains('Create KPI').click()
    cy.wait(1000)
    let nameMerchant = merchant
    cy.get('.cdk-virtual-scroll-viewport').within(() => {
    if (merchant === 'ALO YOGA') {
      cy.contains(nameMerchant).click( {force: true})
    } else if (merchant === 'LULULEMON') {
      cy.contains(nameMerchant).click( {force: true})
    } else if (merchant === 'NIKE') {
      cy.contains(nameMerchant).click( {force: true})
    } else if (merchant === 'UNDER ARMOUR') {
      cy.contains(nameMerchant).click( {force: true})
    }
  })
    //cy.contains('ALO YOGA').click( {force: true})
    cy.get('.mx-6 > .flex').within(() => {
    cy.contains('Period').click()
  })
  cy.wait(5000)
  let namePeriod = period
    cy.get('.cdk-virtual-scroll-viewport').within(() => {
    if (period === 'Latest 4 weeks') {
      cy.contains(namePeriod).click( {force: true})
      
    } else if (period === 'Latest Month') {
      cy.contains(namePeriod).click( {force: true})
    } else if (period === 'Latest 52 weeks') {
      cy.contains(namePeriod).click( {force: true})
    } else if (period === 'Latest 12 weeks') {
      cy.contains(namePeriod).click( {force: true})
    } else {
      cy.log('No matching Period value was selected')
    }
  })
   //Select Metric notifications on the Data Source meu
    cy.get('.mx-6 > .flex').within(() => {
      cy.contains('Metric Notifications').click()
    })
    cy.wait(1000)

    function metricSales() {
      // Click on Sales
      cy.get('.rounded > .h-full > :nth-child(2)').within(() => {
        //Check the sales button
        cy.get('.flex.flex-1 > .relative > .w-10').click()
        cy.contains('Select a condition').click()
          cy.get('.bg-white > :nth-child(1) > .text-gray-500').click()
          cy.get('input[placeholder="% Change"]').type('10')
          cy.contains('Select Period').click()
          cy.contains('YoY').click()
      })
     }
     function metricTaxes() {
      // Click on Taxes
      cy.get('.rounded > .h-full > :nth-child(3)').within(() => {
        //Check the Taxes button
        cy.get('.flex.flex-1 > .relative > .w-10').click()
        cy.contains('Select a condition').click()
          cy.get('.bg-white > :nth-child(1) > .text-gray-500').click()
          cy.get('input[placeholder="% Change"]').type('10')
          cy.contains('Select Period').click()
          cy.contains('YoY').click()
      })
     }
     function metricUnits() {
      // Click on Units
      cy.get('.rounded > .h-full > :nth-child(4)').within(() => {
        //Check the Units button
        cy.get('.flex.flex-1 > .relative > .w-10').click()
        cy.contains('Select a condition').click()
          cy.get('.bg-white > :nth-child(1) > .text-gray-500').click()
          cy.get('input[placeholder="% Change"]').type('10')
          cy.contains('Select Period').click()
          cy.contains('YoY').click()
      })
     }

    if (metrics === 'Sales') {
        metricSales()
    } else if (metrics === 'Taxes'){
      metricTaxes()
    } else if (metrics === 'Units'){
      metricUnits()
    } else {
      cy.log('Metrics configuration wasnt selected')

    }
    //Validate selections made
    cy.get(':nth-child(1) > .flex-wrap > .flex > .text-primary-800').should('have.text', 'RAKUTEN QA APPAREL ACTIVEWEAR ERECEIPT')
    cy.get(':nth-child(2) > button.flex > .truncate').should('have.text', ' Merchant ')
    cy.get(':nth-child(2) > .flex-wrap').should('have.text', nameMerchant)
    cy.log(nameMerchant)
    cy.contains('Apply Selections').click()
    cy.get('#toast > .ml-3').should('have.text', ' Your report has been saved. ')
  }