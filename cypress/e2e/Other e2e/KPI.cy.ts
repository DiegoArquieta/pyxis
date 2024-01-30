describe('Checks pinned reports', () => {
  beforeEach(() => {
    cy.log('login');
    cy.loginViaUi(
      Cypress.env('TEST_USER_EMAIL'),
      Cypress.env('TEST_USER_PASSWORD')
    );
  });

//Reordering of KPIs is not working as the code for drag and drop is not working  
/*
  it('Reorder KPI',()=>{
    cy.visit('/dashboard');
    cy.wait(5_000);
    cy.contains('Reorder KPIs').click();
    cy.wait(5_000);
    const dataTransfer = new DataTransfer();

    //cy.get('[id=cdk-drop-list-2]').find('[class=cursor-grab]').click()

    cy.get('[data-cy=KPI-cards]').find('[id=cdk-drop-list-2]').trigger('dragstart',{
      dataTransfer
    });
    cy.get('[data-cy=KPI-cards]').find('[id=cdk-drop-list-1]').trigger('drop',{
      dataTransfer
    });    
    cy.contains('Save Changes').click();
  })
*/

  it('Show/collapse all KPI',()=>{
    cy.get('body').then((body) => { 
      if(body.find('[class=cdk-drop-list]').length>4) {
        cy.get('[data-cy=KPI-cards]').contains('Show All').should('exist');
        cy.get('[data-cy=KPI-cards]').contains('Show All').click();
        cy.get('[data-cy=KPI-cards]').contains('Collapse').should('exist');
        cy.get('[data-cy=KPI-cards]').contains('Collapse').click();
      }
      });
  })

  it('Cancel Delete KPI correctly',()=>{
    cy.get('body').then((body) => { 
      if(body.find('[class=cdk-drop-list]').length>1) {
        const initial = body.find('[class=cdk-drop-list]').length
        cy.get('[id=cdk-drop-list-1]').find('[alt=kpi-menu]').click();
        cy.contains('Delete KPI').click();
        cy.get('span').contains("No, cancel").click()
        cy.visit('/dashboard');
        cy.get('body').then((body) => {
          const final = body.find('[class=cdk-drop-list]').length
          cy.then(function () {
            expect(initial, 'compare scores').to.be.equal(final)
          })
        });
      }
    });
  })

  it('Close Delete KPI window',()=>{
    cy.get('body').then((body) => { 
      if(body.find('[class=cdk-drop-list]').length>1) {
        const initial = body.find('[class=cdk-drop-list]').length
        cy.get('[id=cdk-drop-list-1]').find('[alt=kpi-menu]').click();
        cy.contains('Delete KPI').click();
        cy.get('h2.text-xl').contains('Delete KPI').parent().find('img').click()
        cy.visit('/dashboard');
        cy.get('body').then((body) => {
          const final = body.find('[class=cdk-drop-list]').length
          cy.then(function () {
            expect(initial, 'compare scores').to.be.equal(final)
          })
        });
      }  
    });
  })

  it('Delete KPI correctly',()=>{
    cy.get('body').then((body) => { 
      if(body.find('[class=cdk-drop-list]').length>1) {
        const initial = body.find('[class=cdk-drop-list]').length
        cy.get('[id=cdk-drop-list-1]').find('[alt=kpi-menu]').click();
        cy.contains('Delete KPI').click();
        cy.get('span').contains("Yes, I'm sure").click()
        cy.visit('/dashboard');
        cy.get('body').then((body) => {
          const final = body.find('[class=cdk-drop-list]').length
          cy.then(function () {
            expect(initial-1, 'compare scores').to.be.equal(final)
          })
        });
      }
    });   
  })
})