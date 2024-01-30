import { aliasMutation, aliasQuery } from '../support/graphql-test-utils';

describe('Checks share reports', () => {
  before(() => {
    cy.log('login test user 1');
    cy.loginViaUi(
      Cypress.env('TEST_USER_EMAIL'),
      Cypress.env('TEST_USER_PASSWORD')
    );
  });
  
  it('Sets share reports correctly', () => {
    // seed, and wait for seed to complete before doing anything. 
    cy.exec('yarn workspace backend run seed create:asset-reports', {
      log: true,
    }).then(() => {
      cy.visit('/assets/templates');
      cy.url().should('include', '/assets/templates');

      cy.intercept('POST', '/graphql', (req) => {
        aliasQuery(req, 'GetUsers');
        // aliasQuery(req, 'GetNotifications');
        // aliasQuery(req, 'userAssetsByUserId');
        aliasQuery(req, 'GetAssets');
        // aliasQuery(req, 'GetPreferences');
        aliasMutation(req, 'ShareAsset');
      });
      
      // cy.wait('@gqlGetNotificationsQuery');
      // cy.wait('@gqluserAssetsByUserIdQuery');
      cy.wait('@gqlGetAssetsQuery');
      cy.wait('@gqlGetUsersQuery');
      // cy.wait('@gqlGetPreferencesQuery');
  
      cy.get('[data-cy=page-title]').should('be.visible').and('contain', 'Report Templates');
  
      cy.get('[data-cy=search-bar]').type('Customer Feedback');
  
      cy.get('[data-cy=table-menu]').first().should('be.visible').click();
      cy.get('[data-cy=table-menu-share-option]').should('be.visible').click();
      cy.log('SEND SHARE REQUEST TO: ', Cypress.env('TEST_USER_2_EMAIL'));
      cy.get('[data-cy=share-report-modal-text-input]').should('be.visible').type(
        Cypress.env('TEST_USER_2_EMAIL')
      );
      cy.get('[data-cy=share-report-modal-text-input] input')
        .should('be.visible')
        .invoke('val')
        .should('include', '@')
      cy.get('[data-cy=share-report-modal-submit-button]').click();

      cy.wait('@gqlShareAssetMutation');
  
      cy.get('body').contains('Report(s) shared successfully.');
  
      cy.log('login test user 2');
      cy.loginViaUi(
        Cypress.env('TEST_USER_2_EMAIL'),
        Cypress.env('TEST_USER_2_PASSWORD')
      );
  
      cy.visit('/assets/shared');
      cy.get('[data-cy=share-with-me-share-button] > button').should(
        'be.disabled'
      );
      cy.get('[data-cy=share-with-me-remove-button] > button').should(
        'be.disabled'
      );
  
      cy.get('[role=row]');
  
      cy.get('[data-cy=shared-table-name]').should('contain', 'NAME');
      cy.get('[data-cy=shared-table-data-source]').should(
        'contain',
        'DATA SOURCE'
      );
      cy.get('[data-cy=shared-table-owner]').should('be.visible').and('contain', 'OWNER');
      cy.get('[data-cy=shared-table-date-created]').should('be.visible').and(
        'contain',
        'DATE CREATED'
      );
      cy.get('[data-cy=shared-table-last-viewed]').should('be.visible').and(
        'contain',
        'LAST VIEWED'
      );
      cy.get('[data-cy=shared-table-last-edited]').should('be.visible').and(
        'contain',
        'LAST EDITED'
      );
      cy.get('[data-cy=shared-table-pin]').should('be.visible').and('contain', 'PIN');
    });
  });
});