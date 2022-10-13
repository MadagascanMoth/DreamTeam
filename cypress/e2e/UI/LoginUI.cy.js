/// <reference types="cypress" />
import { loginPage } from "../../pageObjects/loginPage";
import data from "../../fixtures/data.json";

describe("Login Test Cases Scrum", () => {
  beforeEach("Visit Cypress Vivify Scrum Page", () => {
    loginPage.loginBeforeEach();
  });

  it("Login with valid credentials", () => {
    loginPage.loginFunction(Cypress.env("validEmail"),Cypress.env("validPassword"));
  });

  it("Login - NEG - with bad credentials", () => {
    loginPage.negLoginFunction(data.badEmail, data.badPassword);
  });

  it("Login - NEG -  with invalid email", () => {
    loginPage.negLoginFunction(data.invalidEmail, Cypress.env("validPassword"));
  });

  it("Login - NEG -  with invalid password", () => {
    loginPage.noLogin(Cypress.env("validEmail"), data.invalidPassword);
    loginPage.alertFunction();
  });

  it("Login - NEG -  with empty requered fields", () => {
    loginPage.clickOnSubmitButton();
    loginPage.emptyEmailPasswordFunction();
  });

  it("Login - NEG -  with empty email", () => {
    loginPage.noLogin("{backspace}", Cypress.env("validPassword"));
    loginPage.alertEmailFunction();
  });

  it("Login - NEG -  with empty password", () => {
    loginPage.noLogin(Cypress.env("validEmail"), "{backspace}");
    loginPage.alertPasswordFunction();
  });

  it("Login - NEG -  with unregistered user", () => {
    loginPage.noLogin(data.unregEmail, data.unregPass);
  });
});
