describe("Timer", () => {
  it("should start", () => {
    cy.visit("http://localhost:3000");
    // Wait for Next JS to hydrate the page
    cy.wait(1000);
    cy.contains("Start").trigger("click");
    cy.contains("Start").should("not.exist");
    cy.contains("Pause").should("exist");
    cy.get(".time").then((time) => {
      if (time === undefined) {
        throw new Error("time is undefined");
      }
      const timeText = time.text();
      cy.wait(1000);
      cy.get(".time").should("not.have.text", timeText);
    });
  }),

    it("should finish", () => {
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
          cy.tick(duration);
          cy.get(".time").should("have.text", "00:00");
        });
    });
});
