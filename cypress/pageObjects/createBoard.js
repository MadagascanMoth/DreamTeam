import { loginPage } from "../pageObjects/loginPage";
import data from "../fixtures/data.json";
import { general } from "../pageObjects/general";
import { faker } from "@faker-js/faker";
class CreateBoard {
  get add() {
    return cy.get(".vs-c-my-organization__board-new").last();
  }

  clickOnAddButton() {
    this.add.should("be.visible").click();
  }

  get boardTitle() {
    return cy.get("input[name='name']");
  }

  get nextButton() {
    return cy.get("[name='next_btn']");
  }

  get kanbanButton() {
    return cy.get("[name='type_kanban']");
  }

  get next2Button() {
    return cy.get("[name='next_btn']");
  }

  get next3Button() {
    return cy.get("[name='next_btn']");
  }

  get finishButton() {
    return cy.get("[name='next_btn']");
  }

  get newOrgSign() {
    return cy.get('[class="vs-c-site-logo vs-u-cursor--pointer"]');
  }

  createBoard(name) {
    this.add.click();
    this.boardTitle.should("be.visible").type(name);
    this.nextButton.should("be.visible").click();
    this.kanbanButton.should("be.visible").click();
    this.next2Button.should("be.visible").click();
    this.next3Button.should("be.visible").click();
    this.next3Button.should("be.visible").click();
    this.finishButton.click();
  }

  createBoardBE(token, boardName) {
    return cy
      .request({
        method: "POST",
        url: "https://cypress-api.vivifyscrum-stage.com/api/v2/boards",
        headers: {
          authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
        body: {
          name: boardName,
          type: "kanban_board",
          configuration_board_id: "",
          team_members_board_id: "",
          organization_id: 21538,
          avatar_crop_cords: {},
          file: "",
        },
      })
      .then((response) => {
        return response;
      });
  }

  loginBeforeEach(name) {
    cy.session(name, () => {
      cy.visit("/");
      cy.url().should("contain", "/login");
      cy.intercept(
        "POST",
        "https://cypress-api.vivifyscrum-stage.com/api/v2/login"
      ).as("validLogin");
      general.loginHeader.should("have.text", data.loginPageHeader);
      loginPage.login(Cypress.env("validEmail"), Cypress.env("validPassword"));
      cy.url().should("contain", "/my-organizations");
      cy.wait("@validLogin").then((intercept) => {
        expect(intercept.response.statusCode).to.eq(200);
        expect(intercept.response.statusMessage).to.eq("OK");
      });
    });
  }

  createBoardFunction(name) {
    cy.visit("/");
    cy.url().should("contain", "/my-organizations");
    cy.intercept(
      "POST",
      "https://cypress-api.vivifyscrum-stage.com/api/v2/boards"
    ).as("createBoard");
    createBoard.createBoard(name);
    return cy.wait("@createBoard").then((intercept) => {
      expect(intercept.response.statusCode).to.eq(201);
      expect(intercept.response.statusMessage).to.eq("Created");
      expect(intercept.response.body.name).to.eq(name);
      return intercept.response;
    });
  }

  createBoardOrganization(name) {
    this.newOrgSign.click({ force: true });
    this.add.click({ force: true });
    this.boardTitle.should("be.visible").type(name);
    this.nextButton.should("be.visible").click();
    this.kanbanButton.should("be.visible").click();
    this.next2Button.should("be.visible").click();
    this.next3Button.should("be.visible").click();
    this.next3Button.should("be.visible").click();
    this.finishButton.click();
  }
}

export const createBoard = new CreateBoard();
