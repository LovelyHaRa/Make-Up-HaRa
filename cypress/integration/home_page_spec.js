/// <reference types="cypress" />

describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('/');
  });

  it('should be redirect to', () => {
    cy.visit('/');

    cy.contains('MAKE UP HARA').click();
    cy.url().should('include', '/');

    cy.contains('WIKI').click();
    cy.url().should('include', '/w');

    cy.contains('Blog').click();
    cy.url().should('include', '/blog');

    cy.contains('로그인').click();
    cy.url().should('include', '/login');
  });

  it('should be search document', () => {
    cy.visit('/');

    cy.get('.search-input input').type('test').should('have.value', 'test');

    cy.get('.search-input a').click();
    cy.url().should('include', '/search?query=test');
  });

  it('should be render dropdown menu', () => {
    cy.visit('/');

    cy.get('.etc-menu-button').click();
    cy.get('.dropdown.dropdown-menu').should('be.visible');

    cy.get('.none-user-menu').click();
    cy.get('.dropdown.dropdown-menu.dropdown-user-info').should('be.visible');
  });
});
