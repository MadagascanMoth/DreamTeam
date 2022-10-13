/// <reference types="cypress" />
import { registerMockAPI } from "../../fixtures/mockAPI/registerMockAPI";
import data from "../../fixtures/data.json";

describe("Register through Backened", () => {
  it("Register with valid information", () => {
    registerMockAPI.post({});
  });

  it("Register - NEG - with already registered email", () => {
    registerMockAPI.post({ email: Cypress.env("validEmail"), status: 422 });
  });

  it("Register - NEG - with invalid email", () => {
    registerMockAPI.post({ email: data.invalidEmail, status: 422 });
  });

  it("Register - NEG - with invalid password", () => {
    registerMockAPI.post({ password: data.invalidPassword, status: 422 });
  });

  it("Register - NEG - without group users", () => {
    registerMockAPI.post({ numUser: 0, status: 422 });
  });

  it("Register - NEG - without accepted terms", () => {
    registerMockAPI.post({ terms: false, status: 422 });
  });
});
