describe('Checks pinned reports', () => {
  beforeEach(() => {
    cy.log('login');
    cy.loginViaUi(
      Cypress.env('TEST_USER_EMAIL'),
      Cypress.env('TEST_USER_PASSWORD')
    );
  });

  it('Sets pinned report correctly', () => {
    // clean dashboard pinned table

    // AG Grid elements
    const checkboxSelector = '[aria-label="Press Space to toggle all rows selection (unchecked)"]';
    cy.get('body').should('exist').then((body) => {
      if (body.find(checkboxSelector).length > 0) {
        // cy.get(checkboxSelector).first().click();
        cy.get('[data-cy="pinned-reports"] input.ag-checkbox-input').first().click();
        cy.get('[data-cy=dashboard-unpin-button]').should('be.visible').click();
        // cy.get(checkboxSelector).should('not.exist');
        cy.get('[data-cy="pinned-reports"] input.ag-checkbox-input').should('not.exist');
        cy.get('[data-cy=dashboard-unpin-button]').should('not.be.visible');
      }
    });

    cy.exec('yarn workspace backend run seed create:asset-reports', {
      log: true,
    }).then(() => {
      cy.visit('/assets/templates');
      cy.url().should('include', '/assets/templates');
  
      cy.get('[data-cy=page-title]').should('be.visible').and('contain', 'Report Templates');
  
      cy.get('[data-cy=table-menu]').first().should('be.visible').click();
      // cy.get('[data-cy=table-menu-pin-option]').should('be.visible').contains('Pin').click();
      // cy.get('[data-cy=table-menu-pin-option]').should('be.visible').contains('Unpin');

      cy.get('[data-cy=table-menu-pin-option]').should('be.visible').then($element => {
        if ($element.text().includes('Pin')) {
            // If the element contains 'Pin', then click and expect 'Unpin'
            cy.get('[data-cy=table-menu-pin-option]').click();
            cy.get('[data-cy=table-menu-pin-option]').should('be.visible').and('contain', 'Unpin');
            cy.visit('/dashboard');
            cy.url().should('include', '/dashboard');
            // cy.get('[data-cy=dashboard-unpin-button] > button').should('exist').and('be.disabled');
            // cy.get('[data-cy=dashboard-share-button] > button').should('exist').and('be.disabled');
        
            // pinned table header check
            cy.get('[data-cy=pinned-table-name]').should('contain', 'NAME');
            cy.get('[data-cy=pinned-table-last-viewed]').should(
              'contain',
              'LAST VIEWED'
            );
            cy.get('[data-cy=pinned-table-last-modified]').should(
              'contain',
              'LAST MODIFIED'
            );
            cy.get('[data-cy=pinned-table-owner]').should('contain', 'OWNER');
        
            let pinnedRows = 0;
            cy.get('[data-cy=table-menu]').should('be.visible')
              .each(() => pinnedRows++)
              .then(() => {
                if (pinnedRows <= 0) {
                  throw new Error('No pinned reports were found');
                }
        
                const ALLOWED_PINNED_REPORT_LIMIT = 25;
                if (pinnedRows > ALLOWED_PINNED_REPORT_LIMIT) {
                  const errorMessage = `The amount of pinned reports is more than the allowed limit of ${ALLOWED_PINNED_REPORT_LIMIT}`;
                  throw new Error(errorMessage);
                }
              });
        } else if ($element.text().includes('Unpin')) {
            // If the element contains 'Unpin', then click and expect 'Pin'
            cy.get('[data-cy=table-menu-pin-option]').should('be.visible').click();
            cy.get('[data-cy=table-menu-pin-option]').should('contain', 'Pin');
        }
      });
    });
  });
});
