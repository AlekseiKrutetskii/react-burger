describe('create burger order', function() {
   beforeEach(function () {
       cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
       cy.intercept('POST', 'api/auth/login', { fixture: 'login.json' }).as('Login');
       cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as('Order');
       cy.viewport(1500, 1000);
       cy.visit('http://localhost:3000');
   });

   it ('drag', function () {
       cy.get('[data-testid=constructor]').contains('Инг 1').should('not.exist');
       cy.get('[data-testid=ingredients]>div').eq(0).trigger('dragstart');
       cy.get('[data-testid=constructor]').trigger('drop');
       cy.get('[data-testid=constructor]').contains('Инг 1').should('exist');
       cy.get('[data-testid=profile]').click();

       cy.get('form input[type=text]').type('test@test.ru');
       cy.get('form input[type=password]').type('12345678');
       cy.get('[data-testid=singin]').click();

       cy.wait('@Login').its('request.body').should('deep.equal', {
           "email": "test@test.ru",
           "password": "12345678"
       });

       cy.get('[data-testid=mainpage]').click();
       cy.get('[data-testid=authprofile]').click();


       cy.wait('@Order').its('request.body').should('deep.equal', {
           ingredients: ['1']
       });

       cy.get('[data-testid=number]').contains('123456').should('exist');
   });
});