describe("Timer functionality", () => {
  it("should start and finish the timer", () => {
    cy.visit("http://localhost:3000");
    // Wait for Next JS to hydrate the page
    cy.wait(1000);
    cy.get(".time")
      .invoke("attr", "data-time-ms")
      .then((time) => {
        if (time === undefined) {
          throw new Error("time is undefined");
        }
        const duration = parseInt(time);
        cy.clock();
        cy.contains("Start").trigger("click");
        cy.contains("Start").should("be.disabled");
        cy.tick(duration);
        cy.get(".time").should("have.text", "00:00");
        cy.contains("Start").should("be.enabled");
      });
  });
});
