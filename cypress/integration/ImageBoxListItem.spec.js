describe("ImageBoxListItem:", function () {
  // Step 1: setup the application state
  beforeEach(function () {
    cy.visit("/");
    cy.visit("/");
    cy.get("[data-test=MainContainer_account]").click();
    cy.get("[data-test=login_test]").click();
    cy.get("[data-test=MainContainer_startProject]").click();
    cy.get("[data-test=ModalMenu_newProject_projectName]").type(
      "TEST_PROJECT_NAME"
    );
    cy.get("[data-test=ModalMenu_okButton]").click();
    cy.get("[data-test=uploadImageInput]").attachFile("testImage.png");
  });

  describe("ImageBoxListItem actions", () => {
    it("opens an ImageBoxListItem and activates the coresponding ImageBox when the ImageBoxListItem title is clicked.", () => {
      // Step 2: Take an action

      cy.get("[data-test=imageOverlay]")
        .trigger("mousedown", { clientX: 500, clientY: 150 })
        .trigger("mousemove", { clientX: 550, clientY: 200 })
        .trigger("mouseup", { force: true });

      cy.get("[data-test=imageOverlay]")
        .trigger("mousedown", { clientX: 700, clientY: 200 })
        .trigger("mousemove", { clientX: 750, clientY: 250 })
        .trigger("mouseup", { force: true });

      cy.get("[data-test=imageBoxListItem-title_0]").click();

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

    it("deletes an ImageBoxListItem and deletes the coresponding ImageBox when the ImageBoxListItem delete icon is clicked.", () => {
      // Step 2: Take an action

      cy.get("[data-test=imageOverlay]").click();

      cy.get("[data-test=imageBoxListItem-delete_0]").click();

      // Step 3: Make an assertion
      cy.get("[data-test=imageBox_0]").should("not.exist");
      cy.get("[data-test=imageBoxListItem_0]").should("not.exist");
    });

    it("saves the displayText, urlText, and  when the ImageBoxListItem is not active.", () => {
      // Step 2: Take an action

      cy.get("[data-test=imageOverlay]")
        .trigger("mousedown", { clientX: 500, clientY: 150 })
        .trigger("mousemove", { clientX: 550, clientY: 200 })
        .trigger("mouseup", { force: true });

      cy.get("[data-test=imageOverlay]")
        .trigger("mousedown", { clientX: 700, clientY: 200 })
        .trigger("mousemove", { clientX: 750, clientY: 250 })
        .trigger("mouseup", { force: true });

      // input dummy data
      cy.get("[data-test=imageBoxListItem-displayText_1]").type(
        "DUMMY_DISPLAY-TEXT"
      );
      cy.get("[data-test=imageBoxListItem-clickUrl_1]").type("DUMMY_CLICK-URL");
      cy.get("[data-test=openInNewWindowCheckbox_1]").click();

      // deactive then reactivate ImageBoxListItem
      cy.get("[data-test=imageBoxListItem-title_0]").click();
      cy.get("[data-test=imageBoxListItem-title_1]").click();

      // Step 3: Make an assertion
      cy.get("[data-test=imageBoxListItem-displayText_1]").should(
        "have.value",
        "DUMMY_DISPLAY-TEXT"
      );
      cy.get("[data-test=imageBoxListItem-clickUrl_1]").should(
        "have.value",
        "DUMMY_CLICK-URL"
      );
      cy.get("[data-test=imageBoxListItem-clickTarget_1]").should(
        "have.value",
        "on"
      );
    });
  });
});
