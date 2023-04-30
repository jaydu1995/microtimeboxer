describe("Timer functionality", () => {
  it("should start and finish the timer", () => {
    cy.visit("http://localhost:3000");
    // Wait for Next JS to hydrate the page
    cy.wait(1000);
    cy.contains("Stop").should("be.disabled");
    cy.contains("Start").trigger("click");
    cy.contains("Start").should("be.disabled");
    cy.contains("Stop").should("be.enabled");
    cy.get(".time").then((time) => {
      if (time === undefined) {
        throw new Error("time is undefined");
      }
      const timeText = time.text();
      cy.wait(1000);
      cy.get(".time").should("not.have.text", timeText);
    });
  });
});
