/// <reference types="Cypress" />

describe('page navigation', () => {
    it('should navigate between bages', () => {
        cy.visit('http://localhost:5173/');
        cy.get('[data-cy="header-about-link"]').click();
        cy.location('pathname').should('eq', '/about'); // / for home page /about for about page
        cy.go('back');
        cy.location('pathname').should('eq', '/'); // / => Home page
        cy.get('[data-cy="header-about-link"]').click();
        cy.get('[data-cy="header-home-link"]').click();
        cy.location('pathname').should('eq', '/');
    });
});