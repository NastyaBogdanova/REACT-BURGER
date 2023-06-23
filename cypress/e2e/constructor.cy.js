describe("test constructor", () => {
    it('should be available on localhost:3000', () => {
        cy.visit('http://localhost:3000');
    });

    it('open ingredient modal', () => {
        cy.get('[data-testid="ingredient"]').first().as('ingredient').click();
    });

    it('close ingredient modal', () => {
        cy.get('[data-testid=close]').click();
    });
})