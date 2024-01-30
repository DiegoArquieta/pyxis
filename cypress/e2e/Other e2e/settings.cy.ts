import { aliasMutation } from "../support/graphql-test-utils";

describe('Loads all pages', () => {
  beforeEach(() => {
    cy.log('login');
    cy.loginViaUi(
      Cypress.env('TEST_USER_EMAIL'),
      Cypress.env('TEST_USER_PASSWORD')
    );
  });

  it('Sets KPI Alerts notification settings correctly', () => {
    cy.visit('/settings/notifications');
    cy.url().should('include', '/settings/notifications');

    cy.intercept('POST', '/graphql', (req) => {
      // aliasQuery(req, 'GetUsers');
      // aliasQuery(req, 'GetNotifications');
      // aliasQuery(req, 'userAssetsByUserId');
      // aliasQuery(req, 'GetAssets');
      // aliasQuery(req, 'GetPreferences');
      aliasMutation(req, 'upsertNotificationPreferences');
    });

    cy.get('[data-cy=settings-notifications-kpi]')
      .should('be.visible')
      .and('contain','Notify when a KPI has increased or decreased a defined threshold value.');

    /** REMOVED FOR MVP-LITE */
    // cy.get('[data-cy=settings-notifications-kpi] [data-cy=settings-notifications-email-toggle]').should('be.visible').click()

    cy.get('[data-cy=settings-notifications-save]').should('be.visible').click();

    cy.wait('@gqlupsertNotificationPreferencesMutation').its('response.statusCode').should('eq', 200);

    // cy.wait('@graphql').its('response.statusCode').should('eq', 200);
  });

  it('Sets user preferences correctly', () => {
    cy.visit('/settings/user-preferences');
    cy.url().should('include', '/settings/user-preferences');

    cy.intercept('POST', '/graphql', (req) => {
      // aliasQuery(req, 'GetUsers');
      // aliasQuery(req, 'GetNotifications');
      // aliasQuery(req, 'userAssetsByUserId');
      // aliasQuery(req, 'GetAssets');
      // aliasQuery(req, 'GetPreferences');
      aliasMutation(req, 'upsertTabOutPreference');
    });

    // cy.intercept('POST', '/graphql').as('graphql');

    cy.get("[data-cy=settings-userPreferences-toggleLabel]").should('be.visible').and('contain', 'Open a new tab every time').click();

    cy.get('[data-cy=settings-userPreferences-save]').should('be.visible').click();

    cy.wait('@gqlupsertTabOutPreferenceMutation').its('response.statusCode').should('eq', 200);

    // cy.wait('@graphql').its('response.statusCode').should('eq', 200);
  });
});