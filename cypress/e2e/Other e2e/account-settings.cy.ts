describe('Check account setting', () => {
    beforeEach(() => {
      cy.log('login');
      cy.loginViaUi(
        Cypress.env('TEST_USER_EMAIL'),
        Cypress.env('TEST_USER_PASSWORD')
      );
    });
    it('Account is selected on default correctly', () => {
        cy.get('[data-cy=header-menu-initial-option]').should('be.visible').click();
        cy.get('[data-cy=header-menu-initial-option]').contains('Settings').click();
        cy.get('p.text-sm').contains('Account').should('not.be.disabled')
    })

    it('Open notification settings correctly', () => {
        cy.get('[data-cy=header-menu-initial-option]').click();
        cy.get('[data-cy=header-menu-initial-option]').contains('Settings').click({ force: true });
        cy.get('p.text-sm').contains('Account').should('not.be.disabled')
        cy.get('p.text-sm').contains('Notifications').click()
    })

    it('Open user-preferences settings correctly', () => {
        cy.get('[data-cy=header-menu-initial-option]').click();
        cy.get('[data-cy=header-menu-initial-option]').contains('Settings').click({ force: true });

        cy.get('p.text-sm').contains('Account').should('not.be.disabled')
        cy.get('p.text-sm').contains('User Preferences').click()
    })

    it('Sets User-preferences toggle correctly', () => {

        cy.get('[data-cy=header-menu-initial-option]').should('be.visible').click();
        cy.get('[data-cy=header-menu-initial-option]').contains('Settings').click({ force: true });

        cy.get('p.text-sm').contains('Account').should('not.be.disabled');
        cy.get('p.text-sm').contains('User Preferences').click();

        cy.get('span').contains('Open a new tab every time').click();

        cy.get('span.text-container').contains('Save').click();
        // cy.wait('@graphql').its('response.statusCode').should('eq', 200);
    })

    it('Sets Notification threshold toggle correctly', () => {

        cy.get('[data-cy=header-menu-initial-option]').should('be.visible').click();
        cy.get('[data-cy=header-menu-initial-option]').contains('Settings').click({ force: true });

        cy.get('p.text-sm').contains('Account').should('not.be.disabled');
        cy.get('p.text-sm').contains('Notifications').click();

        /** REMOVED FOR MVP-LITE */
        //cy.intercept('POST', '/graphql').as('graphql');
        // cy.get('p.text-sm').contains('Notify when a KPI has increased or decreased a defined threshold value.')
        // .parent()
        // .next()
        // .find('span')
        // .contains('Email')
        // .click();

        cy.get('p.text-sm').contains('Notify when a KPI has increased or decreased a defined threshold value.')
        .parent()
        .next()
        .find('span')
        .contains('Push')
        .click();

        /** REMOVED FOR MVP-LITE */
        // cy.get('p.text-sm').contains('Notifications when reports are shared with you.')
        // .parent()
        // .next()
        // .find('span')
        // .contains('Email')
        // .click();

        cy.get('p.text-sm').contains('Notifications when reports are shared with you.')
        .parent()
        .next()
        .find('span')
        .contains('Push')
        .click();

        //save button not activated in local environment
        //cy.get('p.text-sm.text-container').contains('Save').click();
    })

})