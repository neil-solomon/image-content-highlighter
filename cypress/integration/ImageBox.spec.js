describe("ImageBox:", function () {
  // Step 1: setup the application state
  beforeEach(function () {
    cy.visit("/");
    cy.get("[data-test=uploadImageInput]").attachFile("testImage.png");
  });

  describe("Create image box:", () => {
    it("creates an ImageBox of proper size after mouse click and drag.", () => {
      // Step 2: Take an action

      cy.get("[data-test=imageOverlay]")
        .trigger("mousedown", { clientX: 600, clientY: 200 })
        .trigger("mousemove", { clientX: 700, clientY: 300 })
        .trigger("mouseup", { force: true });

      // Step 3: Make an assertion
      cy.get("[data-test=imageBox_0]")
        .should("have.css", "height", "100px")
        .should("have.css", "width", "100px");
      //   cy.get("[data-test=imageBoxListItem_0]").should("be.visible");
    });

    it("creates an ImageBox and an ImageBoxListItem, and both are activated", () => {
      // Step 2: Take an action

      cy.get("[data-test=imageOverlay]").click();

      // Step 3: Make an assertion
      cy.get("[data-test=imageBox_0]")
        .should("be.visible")
        .should("have.css", "border", "2px solid rgb(255, 87, 34)");
      cy.get("[data-test=imageBoxListItem_0]")
        .should("be.visible")
        .should("have.css", "height", "400px");
    });

    it("activates an ImageBox and opens the coresponding ImageBoxListItem when the ImageBox is clicked.", () => {
      // Step 2: Take an action

      cy.get("[data-test=imageOverlay]")
        .trigger("mousedown", { clientX: 500, clientY: 150 })
        .trigger("mousemove", { clientX: 550, clientY: 200 })
        .trigger("mouseup", { force: true });

      cy.get("[data-test=imageOverlay]")
        .trigger("mousedown", { clientX: 700, clientY: 200 })
        .trigger("mousemove", { clientX: 750, clientY: 250 })
        .trigger("mouseup", { force: true });

      cy.get("[data-test=imageBox_0]").click();

      // Step 3: Make an assertion
      cy.get("[data-test=imageBox_0]").should(
        "have.css",
        "border",
        "2px solid rgb(255, 87, 34)"
      );
      cy.get("[data-test=imageBoxListItem_0]").should(
        "have.css",
        "height",
        "400px"
      );
      cy.get("[data-test=imageBox_1]").should(
        "have.css",
        "border",
        "2px dotted rgb(255, 87, 34)"
      );
      cy.get("[data-test=imageBoxListItem_1]").should(
        "have.css",
        "height",
        "50px"
      );
    });
  });
});
