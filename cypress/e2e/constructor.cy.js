describe("test constructor", () => {

    const testModal = '[data-testid="modal"]';
    const testModalClose = '[data-testid=close]';
    const testMainIng = '[data-testid="ingredient-main"]';
    const testDropTarget = '[data-testid="dropTarget"]';
    const testOrderButton = '[data-testid="orderButton"]';

    beforeEach(() => {
        cy.intercept('GET', '/ingredients', { fixture: 'ingredients.json' }).as('ingredients');
        cy.intercept('POST', 'api/auth/login', { fixture: 'login.json' }).as('login');
        cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as('order');
        cy.visit('')
    });

    it('open and close ingredient modal', () => {
        cy.get(testMainIng).first().click();
        cy.get(testModal).contains('Детали ингредиента');
        cy.get(testModal).contains('Биокотлета из марсианской Магнолии');
        cy.get(testModalClose).click();
    });

    it('order way', () => {
        // drag and drop
        cy.get('[data-testid="ingredient-bun"]').first().trigger('dragstart');
        cy.get(testDropTarget).trigger('drop');

        cy.get(testMainIng).first().trigger('dragstart');
        cy.get(testDropTarget).trigger('drop');

        cy.get('[data-testid="ingredient-sauce"]').first().trigger('dragstart');
        cy.get(testDropTarget).trigger('drop')

        // удаление элемента
        cy.get('.constructor-element__action').eq(2).click();

        // попытка заказать
        cy.get(testOrderButton).click();

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
        cy.get(testOrderButton).click();
        cy.wait('@order').its('request.body').should("deep.equal", {
            ingredients: ["643d69a5c3f7b9001cfa093c", "643d69a5c3f7b9001cfa0941", "643d69a5c3f7b9001cfa093c"]
        });

        // заказ отправлен
        cy.get(testModal).contains('идентификатор заказа');
        cy.get(testModal).contains('133');

        // закрытие модального окна заказа
        cy.get(testModalClose).click();
    });

})