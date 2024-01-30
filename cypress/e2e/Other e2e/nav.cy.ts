import { aliasMutation, aliasQuery } from '../support/graphql-test-utils';

describe('Navbar Component', () => {
  beforeEach(() => {
    cy.log('login');
    cy.loginViaUi(
      Cypress.env('TEST_USER_EMAIL'),
      Cypress.env('TEST_USER_PASSWORD')
    );
  });

  // it('Navigates to workspaces pages', () => {
  //
  //   const dropdownText = ['Your Workspaces'];
  //   const regex = new RegExp(`${dropdownText.join('|')}`, 'g');
  //
  //   cy.get('p.text-sm').contains(regex).click();
  //   cy.get('p.text-gray-500.text-sm').contains('View all workspaces').click();
  //   cy.url().should('include', '/workspaces');
  //
  //   cy.get('p.text-sm').contains('Your Workspaces').click();
  //   cy.get('p.text-gray-500.text-sm').contains('Create a workspace');
  // });

  it('Navigates to assets pages', () => {

    cy.get('app-link-renderer.m-auto').contains('My Saved Reports').click();
    cy.url().should('include', '/assets/saved');

    cy.get('app-link-renderer.m-auto').contains('Shared With Me').click();
    cy.url().should('include', '/assets/shared');
  });

  it('Opens report modals', () => {

    cy.get('p.text-sm').contains('Create New Report').click();
    cy.get('p.text-gray-500.text-sm').contains('Build a table').click();
    cy.get('h2.text-xl.font-medium').should('contain', 'Create a Report');
    cy.get('button.text-gray-600').click();

    cy.get('p.text-sm').contains('Create New Report').click();
    cy.get('p.text-gray-500.text-sm').contains('Create from template');
  });

  it('Correctly loads, displays and filters notifications', () => {

    cy.exec('yarn workspace backend run seed create:notifications', {
      log: true,
    }).then(() => {
      cy.get('[data-cy=notification-icon-btn]').should('be.visible').click();

      cy.get(
        '[data-cy=notifications-header]'
      ).should('be.visible').and('contain', 'Notifications');
  
      cy.get(
        '[data-cy=notifications-report-anchor]'
      ).contains('Shared Report');
  
      cy.get('[data-cy=notifications-report-description]').should('be.visible');
  
      cy.get(
        '[data-cy=notifications-kpi-header]'
      ).should('be.visible');
  
      cy.get('[data-cy="notifications-kpi-description"]').should('be.visible');
  
      cy.get('[data-cy=notifications-filter-btn]').should('be.visible').click();

      cy.contains('[data-cy="notification-filter-item"]', 'KPI Alerts')
        .should('be.visible')
        .click();
  
      // if notifications have been filtered for KPI Alerts, then Reports Notifications should not appear.
      cy.get('[data-cy=notifications-report-header]')
        .should('not.exist');
  
      // cy.get('p.font-normal.my-1.text-gray-900.text-xs')
      //   .contains('Notification (1) message')
      //   .should('not.exist');
  
      cy.get(
        '[data-cy=notifications-kpi-header]'
      ).should('be.visible');
  
      cy.get('[data-cy="notifications-kpi-description"]').should('be.visible');
    });
  });
  
    it('Navigates to settings', () => {
      cy.get(
        '[data-cy=header-menu-initial-option]'
      ).should('be.visible').click();

      cy.get('[data-cy=header-menu-initial-option]').contains('Settings').click();

      cy.url().should('include', '/settings/account');
    });
  
    it('Signs out', () => {
      cy.get(
        '[data-cy=header-menu-initial-option]'
      ).should('be.visible').click();
  
      cy.get('[data-cy=header-menu-initial-option]').contains('Sign out').click();

      cy.url().should('include', '/login');
    });
  });
