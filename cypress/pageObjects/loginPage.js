import { general } from "../pageObjects/general";
import data from "../fixtures/data.json";

class LoginPage {
  get emailInput() {
    return cy.get("input[name='email']");
  }

  get passwordInput() {
    return cy.get("input[type='password']");
  }

  get submitButton() {
    return cy.get("button[type='submit']");
  }

  clickOnSubmitButton() {
    this.submitButton.should("be.visible").click();
  }

  login(email, password) {
    this.emailInput.should("be.visible").type(email);
    this.passwordInput.should("be.visible").type(password);
    this.submitButton.should("be.visible").click();
  }

  loginBe() {
    return cy
      .request({
        method: "POST",
        url: "https://cypress-api.vivifyscrum-stage.com/api/v2/login",
        body: {
          email: "registracija123@gmail.com",
          password: "registracija123",
          "g-recaptcha-response": "",
        },
      })
      .then((response) => {
        window.localStorage.setItem("token", response.body.token);
        return response.body.token;
      });
  }

  loginFunction(email, password) {
    cy.visit("/");
    cy.url().should("contain", "/login");
    cy.intercept(
      "POST",
      "https://cypress-api.vivifyscrum-stage.com/api/v2/login"
    ).as("validLogin");
    general.loginHeader.should("have.text", data.loginPageHeader);
    loginPage.login(email, password);
    cy.url().should("contain", "/my-organizations");
    cy.wait("@validLogin").then((intercept) => {
      expect(intercept.response.statusCode).to.eq(200);
      expect(intercept.response.statusMessage).to.eq("OK");
      // token = intercept.response.body.token;
      return intercept.response;
    });
  }

  negLoginFunction(email, password) {
    cy.visit("/");
    cy.url().should("contain", "/login");
    cy.intercept(
      "POST",
      "https://cypress-api.vivifyscrum-stage.com/api/v2/login"
    ).as("invalidLogin");
    general.loginHeader.should("have.text", data.loginPageHeader);
    loginPage.login(email, password);
    cy.url().should("not.contain", "/my-organizations");
    cy.wait("@invalidLogin").then((intercept) => {
      expect(intercept.response.statusCode).to.eq(401);
      expect(intercept.response.statusMessage).to.eq("Unauthorized");
      // token = intercept.response.body.token;
      return intercept.response;
    });
  }

  noLogin(email, password) {
    cy.visit("/");
    cy.url().should("contain", "/login");
    general.loginHeader.should("have.text", data.loginPageHeader);
    loginPage.login(email, password);
    cy.url()
      .should("not.contain", "/my-organizations")
      .then((response) => {
        return response;
      });
  }

  alertFunction() {
    general.alertPassword
      .should("have.text", data.alertPassword)
      .and("have.css", "color", "rgb(187, 57, 22)")
      .and("have.css", "font-family", "OpenSans, sans-serif");
  }

  emptyEmailPasswordFunction() {
    general.emptyEmail
      .should("have.text", data.alertEmail)
      .and("have.css", "color", "rgb(187, 57, 22)")
      .and("have.css", "font-family", "OpenSans, sans-serif");
    general.emptyPassword
      .should("have.css", "color", "rgb(187, 57, 22)")
      .and("have.css", "font-family", "OpenSans, sans-serif");
  }

  alertEmailFunction() {
    general.alertEmail.should("have.text", data.alertEmail);
    general.alertEmail
      .should("have.text", data.alertEmail)
      .and("have.css", "color", "rgb(187, 57, 22)")
      .and("have.css", "font-family", "OpenSans, sans-serif");
  }

  alertPasswordFunction() {
    general.emptyPassword.should("have.text", data.emptyPassword);
    general.emptyPassword
      .should("have.css", "color", "rgb(187, 57, 22)")
      .and("have.css", "font-family", "OpenSans, sans-serif");
  }

  loginBeforeEach() {
    cy.visit("/");
    cy.url().should("contain", "cypress.vivifyscrum-stage.com");
    general.loginHeader.should("have.text", data.loginPageHeader);
    cy.url().should("contain", "/login");
  }
}

export const loginPage = new LoginPage();
