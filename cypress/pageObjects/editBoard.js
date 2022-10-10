class EditBoard {
  boardName(boardId) {
    cy.get(`a[href="/boards/${boardId}"]`)
      .eq(0)
      .scrollIntoView()
      .should("be.visible")
      .click();
    cy.get(
      '[class="vs-c-list__btn router-link-exact-active router-link-active active"]'
    )
      .scrollIntoView()
      .should("be.visible")
      .click();
  }
  configureBoard(boardId) {
    cy.get(`[href="/boards/${boardId}/settings"]`).click();
  }

  get boardTitle() {
    return cy.get('[name="name"]');
  }

  get description() {
    return cy.get('[name="description"]');
  }

  get updateButton() {
    return cy.get(
      '[class="vs-c-btn vs-c-btn--primary vs-c-btn--spaced vs-u-font-weight-bold vs-c-btn-auth--top-gap"]'
    );
  }

  get deleteButton() {
    return cy.get(
      "button[class='vs-c-btn vs-c-btn--warning vs-c-btn--spaced']"
    );
  }

  get confirmYesButton() {
    return cy.get("button[name='save-btn']");
  }

  get deletedBoardButton() {
    return cy.get(".vs-c-modal--features-button > .vs-c-btn");
  }

  editBoard(boardId, editedName, description) {
    cy.wait(4000);
    this.boardName(boardId);
    this.configureBoard(boardId);
    this.boardTitle.should("be.visible").clear().type(editedName);
    this.description.should("be.visible").clear().type(description);
    this.updateButton.should("be.visible").click();
  }

  deleteBoard(boardId) {
    this.boardName(boardId);
    this.configureBoard(boardId);
    this.deleteButton.click();
    this.confirmYesButton.click();
    this.deletedBoardButton.should("be.visible").click();
  }

  editBoardBE(token, boardName, boardDescription, boardId, code) {
    cy.request({
      method: "PUT",
      url: `https://cypress-api.vivifyscrum-stage.com/api/v2/boards/${boardId}`,
      body: {
        name: boardName,
        description: boardDescription,
        code: `${code}`,
        task_unit: "points",
      },
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      return response;
    });
  }

  deleteBE(token, boardId) {
    return cy
      .request({
        method: "DELETE",
        url: `https://cypress-api.vivifyscrum-stage.com/api/v2/boards/${boardId}`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        expect(response.status).to.eq(200);
      });
  }

  editBoardFunction(boardId, editedName, description) {
    cy.visit("/");
    cy.url().should("contain", "/my-organizations");
    cy.intercept(
      "PUT",
      `https://cypress-api.vivifyscrum-stage.com/api/v2/boards/${boardId}`
    ).as("editBoard");
    editBoard.editBoard(boardId, editedName, description);
    cy.wait("@editBoard").then((intercept) => {
      expect(intercept.response.statusCode).to.eq(200);
      expect(intercept.response.statusMessage).to.eq("OK");
      expect(intercept.response.body.name).to.eq(editedName);
      expect(intercept.response.body.description).to.eq(description);
    });
  }

  deleteBoardFunction(boardId) {
    cy.visit("/");
    cy.url().should("contain", "/my-organizations");
    cy.intercept(
      "DELETE",
      `https://cypress-api.vivifyscrum-stage.com/api/v2/boards/${boardId}`
    ).as("deleteBoard");
    editBoard.deleteBoard(boardId);
    cy.wait("@deleteBoard").then((intercept) => {
      expect(intercept.response.statusCode).to.eq(200);
    });
  }
}

export const editBoard = new EditBoard();
