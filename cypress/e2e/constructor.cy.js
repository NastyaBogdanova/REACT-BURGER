import { setCookie, deleteCookie } from '../../src/utils/cookie';

describe("test constructor", () => {

    beforeEach(() => {
        cy.intercept('GET', '/ingredients', { fixture: 'ingredients.json' }).as('ingredients');
        cy.intercept('POST', '/auth/login', { fixture: 'login.json' }).as('login');
        cy.visit('http://localhost:3000')
    });

    it('open and close ingredient modal', () => {
        cy.get('[data-testid="ingredient-main"]').first().click();
        cy.get('[data-testid="modal"]').contains('Детали ингредиента')
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
        cy.get('[data-testid="password"]').type('password');
        cy.get('[data-testid="authButton"]').click();

        cy.wait("@login").its('request.body').should("deep.equal", {
            email: "test-data@yandex.ru",
            password: "password",
        })

        // заказ
        //cy.get('[data-testid="orderButton"]').click();

        // заказ отправлен
        //cy.get('[data-testid="modal"]').wait(5000).contains('идентификатор заказа');
    });

})