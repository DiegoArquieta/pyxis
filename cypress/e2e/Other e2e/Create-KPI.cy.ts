//to be created when create KPI option is available
describe('Checks pinned reports', () => {
    beforeEach(() => {
      cy.log('login');
      cy.loginViaUi(
        Cypress.env('TEST_USER_EMAIL'),
        Cypress.env('TEST_USER_PASSWORD')
      );
    });


      it('Empty State KPI',()=>{
      cy.get('body').should('exist').then((body) => { 
      if(body.find('[class=cdk-drop-list]').length==0) {
        cy.contains('Create a KPI').should('exist')
      }
      });
    })
})