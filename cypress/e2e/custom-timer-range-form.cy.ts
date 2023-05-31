describe("Custom timer range form", () => {
  const outOfRangeNum = "26";
  const decimalNum = "6.5";
  const notNum = "Three";
  const validNum = "3";
  const minimumErrorMSG = "Minimum must be a whole number between 1 and 25";
  const maximumErrorMSG = "Maximum must be a whole number between 1 and 25";

  beforeEach(() => {
    cy.visit("http://localhost:3000");
    // Wait for Next JS to hydrate the page
    cy.wait(1000);

    cy.get(".custom-range-btn").click();
  }),

    it("should not accept numbers outside of range", () => {
      // Minimum should not be outside of range
      cy.get("#min-range-input").clear().type(outOfRangeNum);
      cy.contains("OK").click();
      cy.contains(minimumErrorMSG).should("exist");

      // Maximum should not be outside of range
      cy.get("#min-range-input").clear().type(validNum);
      cy.get("#max-range-input").clear().type(outOfRangeNum);
      cy.contains("OK").click();
      cy.contains(maximumErrorMSG).should("exist");
    }),

    it("should not accept non-whole numbers", () => {
      // Minimum should not be a non-whole number
      cy.get("#min-range-input").clear().type(decimalNum);
      cy.contains("OK").click();
      cy.contains(minimumErrorMSG).should("exist");

      // Maximum should not be a non-whole number
      cy.get("#min-range-input").clear().type(validNum);
      cy.get("#max-range-input").clear().type(decimalNum);
      cy.contains("OK").click();
      cy.contains(maximumErrorMSG).should("exist");
    }),

    it("should not accept non-numerical characters", () => {
      // Minimum should not contain non-numerical characters
      cy.get("#min-range-input").clear().type(notNum);
      cy.contains("OK").click();
      cy.contains(minimumErrorMSG).should("exist");

      // Maximum should not contain non-numerical characters
      cy.get("#min-range-input").clear().type(validNum);
      cy.get("#max-range-input").clear().type(notNum);
      cy.contains("OK").click();
      cy.contains(maximumErrorMSG).should("exist");
    }),

    it("should accept a whole number inside of range", () => {
      // Valid number shouldn't produce any errors
      cy.get("#min-range-input").clear().type(validNum);
      cy.get("#max-range-input").clear().type(validNum);
      cy.contains("OK").click();
      cy.contains(minimumErrorMSG).should("not.exist");
      cy.contains(maximumErrorMSG).should("not.exist");
    });
});
