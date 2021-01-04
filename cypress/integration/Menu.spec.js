describe("Menu:", function () {
  // Step 1: setup the application state
  beforeEach(function () {
    cy.visit("/");
  });

  describe("Download files:", () => {
    it("displays entered filename in input", () => {
      // Step 2: Take an action
      cy.get("[data-test=filenameInput]").type("DUMMY_FILENAME");

      // Step 3: Make an assertion
      cy.get("[data-test=filenameInput]").should(
        "have.value",
        "DUMMY_FILENAME"
      );
    });

    it("downloads the files when the button is clicked and the file has the proper name", () => {
      // Step 2: Take an action
      const downloadId = Math.floor(Math.random() * 1000000000).toString();
      cy.get("[data-test=filenameInput]").type("DUMMY_FILENAME_" + downloadId);
      cy.get("[data-test=downloadFilesButton]").click();

      // Step 3: Make an assertion
      cy.readFile(
        "./cypress/excelDownloads/imageContentHighlighter-DUMMY_FILENAME_" +
          downloadId +
          ".zip"
      ).should("exist");
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

  describe("Upload image:", () => {
    it("uploads an image and loads it into the page", () => {
      // Step 2: Take an action
      cy.get("[data-test=uploadImageInput]").attachFile("testImage.png");

      // Step 3: Make an assertion
      cy.get("[data-test=uploadedImage]").should("be.visible");
    });
  });
});
