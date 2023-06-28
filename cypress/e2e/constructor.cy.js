describe("test constructor", () => {

    beforeEach(() => {
        cy.intercept('GET', '/ingredients', { fixture: 'ingredients.json' }).as('ingredients');
        cy.intercept('POST', 'api/auth/login', { fixture: 'login.json' }).as('login');
        cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as('order');
        cy.visit('http://localhost:3000')
    });

    it('open and close ingredient modal', () => {
        cy.get('[data-testid="ingredient-main"]').first().click();
        cy.get('[data-testid="modal"]').contains('Детали ингредиента');
        cy.get('[data-testid="modal"]').contains('Биокотлета из марсианской Магнолии');
        cy.get('[data-testid=close]').click();
    });

    it('order way', () => {
        // drag and drop
        cy.get('[data-testid="ingredient-bun"]').first().trigger('dragstart');
        cy.get('[data-testid="dropTarget"]').trigger('drop');

        cy.get('[data-testid="ingredient-main"]').first().trigger('dragstart');
        cy.get('[data-testid="dropTarget"]').trigger('drop');

        cy.get('[data-testid="ingredient-sauce"]').first().trigger('dragstart');
        cy.get('[data-testid="dropTarget"]').trigger('drop')

        // удаление элемента
        cy.get('.constructor-element__action').eq(2).click();

        // попытка заказать
        cy.get('[data-testid="orderButton"]').click();

        // авторизация
        cy.contains('Вход');
        cy.get('[data-testid="email"]').type('test-data@yandex.ru')
        cy.get('[data-testid="password"]').type('password{enter}');

        cy.wait("@login").its('request.body').should("deep.equal", {
            email: "test-data@yandex.ru",
            password: "password",
        })

        // произлшёл redirect
        cy.contains('Соберите бургер');

        // попытка сделать заказ после авторизации
        cy.get('[data-testid="orderButton"]').click();
        cy.wait('@order').its('request.body').should("deep.equal", {
            ingredients: ["643d69a5c3f7b9001cfa093c", "643d69a5c3f7b9001cfa0941", "643d69a5c3f7b9001cfa093c"]
        });

        // заказ отправлен
        cy.get('[data-testid="modal"]').contains('идентификатор заказа');
        cy.get('[data-testid="modal"]').contains('133');

        // закрытие модального окна заказа
        cy.get('[data-testid=close]').click();
    });

})