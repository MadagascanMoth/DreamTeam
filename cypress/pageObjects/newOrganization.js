import { loginPage } from "../pageObjects/loginPage";
import data from "../fixtures/data.json";
import { general } from "../pageObjects/general";
import { createBoard } from "../pageObjects/createBoard";
class NewOrganization {
  get newOrgSign() {
    return cy.get('[class="vs-c-site-logo vs-u-cursor--pointer"]');
  }
  get newOrganizationButton() {
    return cy.get("[class='vs-c-my-organization__avatar']");
  }

  get newOrganizationNameInput() {
    return cy.get("input[name='name']");
  }

  get nextButton() {
    return cy.get("button[name='next_btn']");
  }

  get createButton() {
    return cy.get("button[name='next_btn']");
  }

  get finishButton() {
    return cy.get(".vs-c-modal--features-button > .vs-c-btn");
  }

  createNewOrganization(name) {
    this.newOrgSign.click();
    this.newOrganizationButton.click();
    this.newOrganizationNameInput.type(name);
    this.nextButton.click();
    this.createButton.click();
    this.finishButton.click();
  }

  beforeNewOrganization(email, password) {
    cy.visit("/");
    cy.url().should("contain", "/login");
    cy.intercept(
      "POST",
      "https://cypress-api.vivifyscrum-stage.com/api/v2/login"
    ).as("validLogin");
    general.loginHeader.should("have.text", data.loginPageHeader);
    loginPage.loginFunction(email, password);
    return cy.wait("@validLogin").then((intercept) => {
      expect(intercept.response.statusCode).to.eq(200);
      expect(intercept.response.statusMessage).to.eq("OK");
      return intercept.response;
    });
  }

  createNewOrganizationBoard(name) {
    cy.intercept(
      "POST",
      "https://cypress-api.vivifyscrum-stage.com/api/v2/boards"
    ).as("createBoard");
    createBoard.createBoardOrganization(name);
    return cy.wait("@createBoard").then((intercept) => {
      expect(intercept.response.statusCode).to.eq(201);
      expect(intercept.response.statusMessage).to.eq("Created");
      expect(intercept.response.body.name).to.eq(name);
      return intercept.response;
    });
  }

  createOrganizationFunction(name) {
    cy.intercept(
      "POST",
      "https://cypress-api.vivifyscrum-stage.com/api/v2/organizations"
    ).as("createdOrganization");
    newOrganization.createNewOrganization(name);
    return cy.wait("@createdOrganization").then((intercept) => {
      expect(intercept.response.statusCode).to.eq(201);
      expect(intercept.response.statusMessage).to.eq("Created");
      return intercept.response;
    });
  }



  deleteOrganization(organizationId){
    cy.visit(`organizations/${organizationId}/boards`)
    cy.get("[class='vs-c-site-logo']").last().click({force:true})
    cy.get("[class='vs-c-btn vs-c-btn--warning vs-c-btn--spaced']").click({force:true})
    cy.get("[type='password']").type(Cypress.env("validPassword"))
    cy.get("[name='save-btn']").click({force:true})
    cy.get(".vs-c-modal--features-button > .vs-c-btn").click();
  }

  deleteOrg(){
    cy.get ("[class='vs-c-list__btn router-link-exact-active router-link-active active']").click();   
    cy.get('[data-cy="board-configuration"] > [effect="dark"] > :nth-child(2) > .vs-c-site-logo').click({force:true});
    cy.get("[class='vs-c-btn vs-c-btn--warning vs-c-btn--spaced']").click({force:true});
    cy.get(".vs-u-text--right > .el-button--success").click();
    cy.get(".vs-c-modal--features-button > .vs-c-btn").click();
    cy.visit("/my-organizations");
    cy.get("[class='vs-c-list__btn vs-c-list__organisation']").last().click()
    cy.get("[class='vs-c-site-logo']").last().click({force:true})
    cy.get("[class='vs-c-btn vs-c-btn--warning vs-c-btn--spaced']").click({force:true})
    cy.get("[type='password']").type(Cypress.env("validPassword"))
    cy.get("[name='save-btn']").click({force:true})


  }
}

export const newOrganization = new NewOrganization();
