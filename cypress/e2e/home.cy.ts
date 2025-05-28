describe('Home Page', () => {
  it('loads the movie grid', () => {
    cy.visit('/');
    cy.get('[data-testid="home-page"]').should('exist');
    cy.contains('Pop Movies');
  });
});