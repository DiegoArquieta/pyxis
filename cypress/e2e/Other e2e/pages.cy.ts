describe('Loads all pages', () => {
  beforeEach(() => {
    cy.log('login');
    cy.loginViaUi(
      Cypress.env('TEST_USER_EMAIL'),
      Cypress.env('TEST_USER_PASSWORD')
    );
  });

  it('loads the home page', () => {
    cy.get('[data-cy=dashboard-welcome]').should('be.visible');
  });

  it('loads the account settings page', () => {
    cy.visit('/settings/account');

    cy.get('[data-cy=settings-account-userProfile]').should('be.visible');
  });

  it('loads the notification settings page', () => {
    cy.visit('/settings/notifications');

    cy.url().should('include', '/settings/notifications');

    cy.get('[data-cy=settings-notifications-form]').should('exist');
  });

  it('loads the assets page', () => {
    cy.visit('/assets')

    cy.url().should('include', '/assets');

    cy.get('[data-cy=page-title]').should('contain', 'Assets');
  });

  // it('loads the workspaces page', () => {
  //   cy.visit('/workspaces');
  //
  //   cy.get('[data-cy=page-title]').should('contain', 'Workspaces');
  // });
});