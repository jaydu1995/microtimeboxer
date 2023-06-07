describe("Settings form", () => {
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

    cy.get(".settings-btn").click();
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
    }),
    it("should reset minimum and maximum when reset button is clicked", () => {
      cy.get("#min-range-input").clear().type("7");
      cy.get("#max-range-input").clear().type("7");
      cy.contains("Reset").click();
      cy.get("#min-range-input").should("have.value", "1");
      cy.get("#max-range-input").should("have.value", "6");
    }),
    it("should not save settings if remember isn't checked", () => {
      cy.get("#min-range-input").clear().type("7");
      cy.get("#max-range-input").clear().type("7");
      cy.contains("OK").click();
      cy.reload();
      cy.get(".time").should("not.have.text", "07:00");
    }),
    it("should save settings if remember is checked", () => {
      cy.get("#min-range-input").clear().type("7");
      cy.get("#max-range-input").clear().type("7");
      cy.get("#remember").click();
      cy.contains("OK").click();
      cy.reload();
      cy.get(".time").should("have.text", "07:00");
    });
});
