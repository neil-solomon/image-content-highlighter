describe("Menu:", function () {
  // Step 1: setup the application state
  beforeEach(function () {
    cy.visit("/");
  });

  describe("Download files:", () => {
    it("displays entered filename", () => {
      // Step 2: Take an action
      cy.get("[data-test=filenameInput]").type("DUMMY_FILENAME");

      // Step 3: Make an assertion
      cy.get("[data-test=filenameInput]").should(
        "have.value",
        "DUMMY_FILENAME"
      );
    });
  });

  describe("Select highlight color:", () => {
    it("displays the selected highligh color in the div", () => {
      // Step 2: Take an action
      cy.get("[data-test=highlightColorSelect]").select("rgb(255,255,0)");

      // Step 3: Make an assertion
      cy.get("[data-test=highlightColorDiv]").should(
        "have.css",
        "background-color",
        "rgb(255, 255, 0)"
      );
    });
  });
});
