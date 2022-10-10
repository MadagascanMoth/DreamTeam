/// <reference types="cypress" />

import { loginPage } from "../../pageObjects/loginPage";
import { general } from "../../pageObjects/general";
import data from "../../fixtures/data.json";

describe("Login Test Cases Scrum", () => {
  beforeEach("Visit Cypress Vivify Scrum Page", () => {
    loginPage.loginBeforeEach();
  });

  it("Login with valid credentials", () => {
    loginPage.loginFunction(
      Cypress.env("validEmail"),
      Cypress.env("validPassword")
    );
  });

  it("Login with bad credentials", () => {
    loginPage.negLoginFunction(data.badEmail, data.badPassword);
  });

  it("Login with invalid email", () => {
    loginPage.negLoginFunction(data.invalidEmail, Cypress.env("validPassword"));
  });

  it("Login with invalid password", () => {
    loginPage.noLogin(Cypress.env("validEmail"), data.invalidPassword);
    loginPage.alertFunction();
  });

  it("Login with empty requered fields", () => {
    loginPage.clickOnSubmitButton();
    loginPage.emptyEmailPasswordFunction();
  });

  it("Login with empty email", () => {
    loginPage.noLogin("{backspace}", Cypress.env("validPassword"));
    loginPage.alertEmailFunction();
  });

  it("Login with empty password", () => {
    loginPage.noLogin(Cypress.env("validEmail"), "{backspace}");
    loginPage.alertPasswordFunction();
  });

  it("Login with unregistered user", () => {
    loginPage.noLogin(data.unregEmail, data.unregPass);
  });
});
