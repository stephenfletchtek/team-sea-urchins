describe("our game", () => {
  it("contains the background image", () => {
    cy.visit("http://localhost:3030");
    cy.url().should("contain", "http://localhost:3030");

    // check if canvas has loaded
    cy.get('canvas')
    .should('be.visible')
    .and('have.prop', 'width')
    .should('be.greaterThan', 1199)
    
    cy.get('canvas')
    .should('be.visible')
    .and('have.prop', 'height')
    .should('be.greaterThan', 719)
  });
});

