import { general } from "../pageObjects/general";
import { faker } from "@faker-js/faker";
import data from "../fixtures/data.json";

let user = {
  email: faker.internet.email(),
  password: faker.internet.password(),
  number: faker.datatype.number({
    min: 1,
    max: 10,
  }),
};

class RegisterPage {
  get signUpButton() {
    return cy.get("a[data-cy='login-sign-up-link']");
  }

  clickOnSignUp() {
    this.signUpButton.should("be.visible").click();
  }

  get starterButton() {
    return cy.get(
      ".vsp-c-pricing-plan-list--annual > :nth-child(1) > .vsp-c-btn"
    );
  }

  clickOnStarterButton() {
    this.starterButton.should("be.visible").click({ force: true });
  }

  get accountEmail() {
    return cy.get("input[name='email']");
  }

  get accountPassword() {
    return cy.get("input[name='password']").first();
  }

  get numberUsers() {
    return cy.get("input[name='number_of_users']");
  }

  get submitButton() {
    return cy.get("button[type='submit']");
  }

  register(email, password, number) {
    this.accountEmail.should("be.visible").type(email);
    this.accountPassword.should("be.visible").type(password);
    this.numberUsers.should("be.visible").type(number);
    this.submitButton.should("be.visible").click();
  }

  registerBeforeEach() {
    cy.visit("/");
    cy.url().should("contain", "cypress.vivifyscrum-stage.com");
    general.loginHeader.should("have.text", data.loginPageHeader);
    registerPage.clickOnSignUp();
    registerPage.clickOnStarterButton();
    general.registerHeader.should("have.text", data.registerPageHeader);
  }

  validRegister(
    email = user.email,
    password = user.password,
    number = user.number
  ) {
    cy.intercept(
      "POST",
      "https://cypress-api.vivifyscrum-stage.com/api/v2/register"
    ).as("validRegister");
    registerPage.register(email, password, number);
    cy.wait("@validRegister").then((intercept) => {
      expect(intercept.response.statusCode).to.eq(200);
      expect(intercept.response.statusMessage).to.eq("OK");
    });
    cy.url().should("contain", "/my-organizations");
  }

  invalidRegister(email, password, number) {
    cy.intercept(
      "POST",
      "https://cypress-api.vivifyscrum-stage.com/api/v2/register"
    ).as("validRegister");
    registerPage.register(email, password, number);
  
    cy.url().should("contain", "/sign-up");
  }
}

export const registerPage = new RegisterPage();
