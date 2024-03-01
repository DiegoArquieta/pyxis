export function login(username, password){
  cy.get('.text-gray-600 > img').click()
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

export function logout(){
   
  cy.wait(3000)
  cy.get('[data-cy="header-menu-initial-option"]').click();
  //cy.contains('p.text-gray-500.text-sm', 'Sign out').click();
  cy.get('.relative > .bg-white > :nth-child(1) > :nth-child(3)').click()
  // cy.get('div[_ngcontent-ctn-c10]').within(() => {
  //   cy.contains('Sign out').click()
  // })
  cy.get('.okta-form-title.o-form-head').should('have.text', 'Welcome to Pyxis')
  cy.get('.okta-form-label').should('have.text','Email\u00a0')

}
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
    cy.get('div.m-auto > img').should('be.visible')
    cy.get('.flex.flex-nowrap.justify-between.px-5.py-3.items-center')
    //cy.get('[ng-reflect-router-link="/assets/saved"]').should('be.visible').and('have.text', 'My Saved Reports')
    cy.get('.justify-left > :nth-child(3)').should('be.visible').and('have.text', 'My Saved Reports')
    cy.get('.justify-left > :nth-child(4)').should('be.visible').and('have.text', 'Shared With Me')
    //cy.get('[ng-reflect-router-link="/assets/shared"]').should('be.visible').and('have.text', 'Shared With Me')
    cy.get('[data-cy="notification-icon-btn"] > .flex > img').should('be.visible')
    cy.get('.help-icon-btn > .flex > img').should('be.visible')
    cy.get('.ml-auto > lib-dropdown > .flex-col > .px-3 > div.flex > .text-sm').should('be.visible')
    cy.get('lib-dropdown.m-auto > .flex-col > .px-3').should('be.visible').and('have.text', ' Create New Report ')

    // Parameter-based logic
  if (menuOption === 'Saved') {
    //cy.get('[ng-reflect-router-link="/assets/saved"]')
    cy.get('.justify-left > :nth-child(3)').should('be.visible').and('have.text', 'My Saved Reports').click();
    cy.get('.justify-between > .text-3xl').should('be.visible').and('have.text', ' My Saved Reports ')
  } else if (menuOption === 'Shared') {
    //cy.get('[ng-reflect-router-link="/assets/shared"]')
    cy.get('.justify-left > :nth-child(4)').should('be.visible').and('have.text', 'Shared With Me').click();
    // Add code for handling "Shared" case
  } else {
     // Handle other cases or provide a default behavior
    // You can also log a message for an unsupported parameter
    cy.log(`Unsupported action: ${menuOption}`);
    // Fail the test using Cypress assertion
    cy.wrap(false).should('be.false', 'Validate your parameter, it probably has a typo!');
  }
  }
export function createReportbutton (reportOption, templateName) {
    let reportButton = cy.get('lib-dropdown.m-auto > .flex-col > .px-3').should('be.visible').and('have.text', ' Create New Report ')
    reportButton.click()

    

    // Parameter-based logic
  if (reportOption === 'Build a table') {
    cy.get(':nth-child(1) > .text-gray-500').should('be.visible').and('have.text', 'Build a table').click();
  } else if (reportOption === 'Create from template') {
    cy.get(':nth-child(2) > .text-gray-500').should('be.visible').and('have.text', ' Create from template ').click();
    // Add code for handling "Create from template" case
    cy.wait(20000)
    if (templateName === ' Top Product Overview ') {
      cy.contains(templateName).should('be.visible').click();
  } 
  } else {
    // Handle other cases or provide a default behavior
    // You can also throw an error for an unsupported parameter
    throw new Error(`Unsupported action: ${reportOption}`);
  }




  }
//, geography, customer, product, period, metrics
export function addKPI (merchant, period, metrics) {
      // Validation for required parameters
  if ( merchant === '' || period === '') {
    throw new Error('Required information is missing');
    
  }
    cy.contains('Add KPI').click()
    cy.contains('Test Orion Apparel Activewear Online').click()
    cy.contains('Create KPI').click()
    cy.wait(15000)
    let nameMerchant = merchant
    cy.get('.cdk-virtual-scroll-viewport').within(() => {
    if (merchant === 'Alo Yoga') {
      cy.contains(nameMerchant).click( {force: true})
    } else if (merchant === 'Lululemon') {
      cy.contains(nameMerchant).click( {force: true})
    } else if (merchant === 'Nike') {
      cy.contains(nameMerchant).click( {force: true})
    } else if (merchant === 'Under Armour') {
      cy.contains(nameMerchant).click( {force: true})
    }
  })
    //cy.contains('ALO YOGA').click( {force: true})
    cy.get('.mx-6 > .flex-row').within(() => {
    cy.contains('Period').click()
  })
  cy.wait(5000)
  let namePeriod = period
    cy.get('.cdk-virtual-scroll-viewport').within(() => {
    if (period === 'Latest 4 Weeks') {
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
   cy.get('.mx-6 > .flex-row').within(() => {
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
    //  function metricTaxes() {
    //   // Click on Taxes
    //   cy.get('.rounded > .h-full > :nth-child(3)').within(() => {
    //     //Check the Taxes button
    //     cy.get('.flex.flex-1 > .relative > .w-10').click()
    //     cy.contains('Select a condition').click()
    //       cy.get('.bg-white > :nth-child(1) > .text-gray-500').click()
    //       cy.get('input[placeholder="% Change"]').type('10')
    //       cy.contains('Select Period').click()
    //       cy.contains('YoY').click()
    //   })
    //  }
     function metricUnits() {
      // Click on Units
      cy.get('.rounded > .h-full > :nth-child(3)').within(() => {
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
    // } else if (metrics === 'Taxes'){
    //   metricTaxes()
    // 
  } else if (metrics === 'Units'){
      metricUnits()
    } else {
      cy.log('Metrics configuration wasnt selected')

    }
    //Validate selections made
    cy.get(':nth-child(1) > .flex-wrap > .flex > .text-primary-800').should('have.text', 'Test Orion Apparel Activewear Online')
    cy.get(':nth-child(2) > button.flex > .truncate').should('have.text', ' Merchant ')
    // The expected text you want to validate
const expectedText = nameMerchant;

// Get the text from the element and trim extra spaces
cy.get(':nth-child(2) > .flex-wrap').invoke('text').then((actualText) => {
  const trimmedActualText = actualText.trim();

  // Use should assertion to check if the trimmed actual text contains the expected text
  expect(trimmedActualText).to.include(expectedText);
});
    //cy.get(':nth-child(2) > .flex-wrap').should('have.text', nameMerchant)
    cy.log(nameMerchant)
    cy.contains('Apply Selections').click()
    cy.get('#toast > .ml-3').should('have.text', ' Your report has been saved. ')
  }

export function removeKPI () {

    cy.get('#cdk-drop-list-1').within(() => {
      cy.get('.kpi-menu-icon.bg-transparent').click();
      cy.contains('Delete KPI').click()
      cy.wait(2000)
      


    })
    cy.contains("Yes, I'm sure").click()
  }

export function accountSettings (optionSettings) {
    let username = Cypress.env('user_name')
    cy.get('[data-cy="header-menu-initial-option"]').click();
    cy.get(':nth-child(2) > .text-gray-500').should('have.text','Settings').and('be.visible').click()
    cy.wait(2000)
    cy.get('[data-cy="page-title"]').should('have.text',' Settings ').and('be.visible')
    cy.get('[data-cy="settings-account-userProfile"]').should('have.text',' User Profile ').and('be.visible')
    cy.get('.mb-4 > lib-text-input > .flex-col > .font-normal').should('have.text','First Name')
    cy.get(':nth-child(2) > lib-text-input > .flex-col > .font-normal').should('have.text','Last Name')
    cy.get('.gap-8 > :nth-child(4)').should('have.text',' Email Address ')
    //const textElementSelector = cy.get('.gap-8 > .text-gray-400');

// The expected text you want to validate
const expectedText = username;

// Get the text from the element and trim extra spaces
cy.get('.gap-8 > .text-gray-400').invoke('text').then((actualText) => {
  const trimmedActualText = actualText.trim();

  // Use should assertion to check if the trimmed actual text contains the expected text
  expect(trimmedActualText).to.include(expectedText);
});
    
    cy.get('.w-96').within(() => {
      cy.get('[href="/settings/account"] > .font-normal').should('have.text',' Account ').and('be.visible')
      cy.get('[href="/settings/notifications"] > .font-normal').should('have.text',' Notifications ').and('be.visible')
      cy.get('[href="/settings/user-preferences"] > .font-normal').should('have.text',' User Preferences ').and('be.visible')
    })
    if (optionSettings === 'Notifications') {
    cy.get('.w-96').within(() => {
      cy.get('[href="/settings/notifications"] > .font-normal').should('have.text',' Notifications ').click()
      

    })
    cy.get('[data-cy="settings-notifications-form"]').within(() => {
      //cy.get(':nth-child(1)').should('have.text',' KPI Alerts Notify when a KPI has met the defined threshold condition. Notify when a KPI has met the defined threshold condition. PushPushPush Notifications when reports are shared with you. Notifications when reports are shared with you. PushPushPush')
      //cy.get('.py-4 > .text-sm').should('have.text',' Notify when a KPI has met the defined threshold condition. Notifications when reports are shared with you. ')
      cy.get('[data-cy="settings-notifications-kpi"] > .flex > .flex-grow > [data-cy="settings-notifications-push-toggle"] > .relative > .w-10')

    })
    
  }



    }

export function addReport (merchant, period, metrics) {
      // Validation for required parameters
  if ( merchant === '' || period === '') {
    throw new Error('Required information is missing');
    
  }
    //cy.contains('Add KPI').click()
    cy.contains('Test Orion Apparel Activewear Online').click()
    cy.contains('Continue').click()
    cy.wait(10000)
    let nameMerchant = merchant
    cy.get('.cdk-virtual-scroll-viewport').within(() => {
    if (merchant === 'Alo Yoga') {
      cy.contains(nameMerchant).click( {force: true})
    } else if (merchant === 'Lululemon') {
      cy.contains(nameMerchant).click( {force: true})
    } else if (merchant === 'Nike') {
      cy.contains(nameMerchant).click( {force: true})
    } else if (merchant === 'Under Armour') {
      cy.contains(nameMerchant).click( {force: true})
    }
  })
    //cy.contains('ALO YOGA').click( {force: true})
    cy.get('.mx-6 > .flex-row').within(() => {
    cy.contains('Period').click()
  })
  cy.wait(5000)
  let namePeriod = period
    cy.get('.cdk-virtual-scroll-viewport').within(() => {
    if (period === 'Latest 4 Weeks') {
      cy.contains(namePeriod).click( {force: true})
      
    } else if (period === 'Latest Month') {
      cy.contains(namePeriod).click( {force: true})
    } else if (period === 'Latest 52 weeks') {
      cy.contains(namePeriod).click( {force: true})
    } else if (period === 'Latest 12 Weeks') {
      cy.contains(namePeriod).click( {force: true})
    } else {
      cy.log('No matching Period value was selected')
    }
  })
 

    
   
    //Validate selections made
    cy.get(':nth-child(1) > .flex-wrap > .flex > .text-primary-800').should('have.text', 'Test Orion Apparel Activewear Online')
    cy.get(':nth-child(2) > button.flex > .truncate').should('have.text', ' Merchant ')
    // The expected text you want to validate
const expectedText = nameMerchant;

// Get the text from the element and trim extra spaces
cy.get(':nth-child(2) > .flex-wrap').invoke('text').then((actualText) => {
  const trimmedActualText = actualText.trim();

  // Use should assertion to check if the trimmed actual text contains the expected text
  expect(trimmedActualText).to.include(expectedText);
});
    //cy.get(':nth-child(2) > .flex-wrap').should('have.text', nameMerchant)
    cy.log(nameMerchant)
    cy.contains('Apply Selections').click()
    cy.get('.flex > .text-3xl').should('have.text', ' Top Product Overview ')
  }
  