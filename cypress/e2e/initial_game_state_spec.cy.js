describe("our game", () => {
  it("contains the canvas", () => {
    cy.visit("http://localhost:3030");
    cy.url().should("contain", "http://localhost:3030");

    // check if canvas has loaded
    cy.get('canvas')
    .should('be.visible')
    .and('have.prop', 'width')
    .should('be.equal', 1920)
    
    cy.get('canvas')
    .should('be.visible')
    .and('have.prop', 'height')
    .should('be.equal', 1080)
  });
});

