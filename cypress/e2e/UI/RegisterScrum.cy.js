/// <reference types="cypress" />

import data from "../../fixtures/data.json";
import { registerPage } from "../../pageObjects/registerPage";
import { faker } from "@faker-js/faker";

let user = {
  email: faker.internet.email(),
  password: faker.internet.password(),
  number: faker.datatype.number({
    min: 1,
    max: 10,
  }),
};

describe("Register a new account on Scrum", () => {
  beforeEach("Visit Cypress Vivify Scrum Page", () => {
    registerPage.registerBeforeEach();
  });

  it("Register with valid information", () => {
    registerPage.validRegister();
  });

  it("Register with already registered email", () => {
    registerPage.invalidRegister(
      Cypress.env("validEmail"),
      Cypress.env("validPassword"),
      user.number
    );
  });

  it("Register with invalid email", () => {
    registerPage.invalidRegister(
      data.invalidEmail,
      Cypress.env("validPassword"),
      user.number
    );
  });

  it("Register with invalid password", () => {
    registerPage.invalidRegister(
      Cypress.env("validEmail"),
      data.invalidPassword,
      user.number
    );
  });
});
