describe("ProjectMenu:", function () {
  // Step 1: setup the application state
  beforeEach(function () {
    cy.visit("/");
  });

  describe("Upload image:", () => {
    it("uploads an image and loads it into the page", () => {
      // Step 2: Take an action
      cy.get("[data-test=uploadImageButton]").click();
      cy.get("[data-test=uploadImageInput]").attachFile("testImage.png");

      // Step 3: Make an assertion
      cy.get("[data-test=uploadedImage]").should("be.visible");
    });
  });

  describe("Download files:", () => {
    // it("displays entered filename in input", () => {
    //   // Step 2: Take an action
    //   cy.get("[data-test=filenameInput]").type("DUMMY_FILENAME");

    //   // Step 3: Make an assertion
    //   cy.get("[data-test=filenameInput]").should(
    //     "have.value",
    //     "DUMMY_FILENAME"
    //   );
    // });

    it("downloads the file when the button is clicked. Also the file has the proper name", () => {
      // Step 2: Take an action
      cy.get("[data-test=downloadFilesButton]").click();
      cy.wait(1000); // wait for download to finish

      // Step 3: Make an assertion
      cy.get("[data-test=projectName]")
        .invoke("text")
        .then((text) => {
          cy.readFile(
            "./cypress/excelDownloads/imageMapper-" + text + ".zip"
          ).should("exist");
        });
    });
  });

  describe("Project Menu scroll:", () => {
    it("scrolls when a ImageBox is activated", () => {
      // Step 2: Take an action
      cy.get("[data-test=uploadImageButton]").click();
      cy.get("[data-test=uploadImageInput]").attachFile("testImage.png");

      cy.get("[data-test=imageOverlay]")
        .trigger("mousedown", { clientX: 500, clientY: 150 })
        .trigger("mousemove", { clientX: 550, clientY: 200 })
        .trigger("mouseup", { force: true });

      cy.get("[data-test=imageOverlay]")
        .trigger("mousedown", { clientX: 600, clientY: 200 })
        .trigger("mousemove", { clientX: 650, clientY: 250 })
        .trigger("mouseup", { force: true });

      cy.get("[data-test=imageOverlay]")
        .trigger("mousedown", { clientX: 700, clientY: 150 })
        .trigger("mousemove", { clientX: 750, clientY: 200 })
        .trigger("mouseup", { force: true });

      cy.get("[data-test=imageOverlay]")
        .trigger("mousedown", { clientX: 800, clientY: 200 })
        .trigger("mousemove", { clientX: 850, clientY: 250 })
        .trigger("mouseup", { force: true });

      cy.get("[data-test=imageBox_1").click();

      // Step 3: Make an assertion
      cy.get("[data-test=projectMenuContainer")
        .invoke("scrollTop")
        .should("eq", 70);
    });

    it("scrolls when a ImageBoxListItem is activated", () => {
      // Step 2: Take an action
      cy.get("[data-test=uploadImageButton]").click();
      cy.get("[data-test=uploadImageInput]").attachFile("testImage.png");

      cy.get("[data-test=imageOverlay]")
        .trigger("mousedown", { clientX: 500, clientY: 150 })
        .trigger("mousemove", { clientX: 550, clientY: 200 })
        .trigger("mouseup", { force: true });

      cy.get("[data-test=imageOverlay]")
        .trigger("mousedown", { clientX: 600, clientY: 200 })
        .trigger("mousemove", { clientX: 650, clientY: 250 })
        .trigger("mouseup", { force: true });

      cy.get("[data-test=imageOverlay]")
        .trigger("mousedown", { clientX: 700, clientY: 150 })
        .trigger("mousemove", { clientX: 750, clientY: 200 })
        .trigger("mouseup", { force: true });

      cy.get("[data-test=imageOverlay]")
        .trigger("mousedown", { clientX: 800, clientY: 200 })
        .trigger("mousemove", { clientX: 850, clientY: 250 })
        .trigger("mouseup", { force: true });

      cy.get("[data-test=imageBoxListItem_1").click();

      // Step 3: Make an assertion
      cy.get("[data-test=projectMenuContainer")
        .invoke("scrollTop")
        .should("eq", 70);
    });
  });
});
