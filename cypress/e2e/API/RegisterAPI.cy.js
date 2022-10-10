/// <reference types="cypress" />

import { registerMockAPI } from "../../fixtures/mockAPI/registerMockAPI";
import data from "../../fixtures/data.json";

describe("Register through Backened", () => {
  it("Register with valid information", () => {
    registerMockAPI.post({});
  });

  it("Register with already registered email", () => {
    registerMockAPI.post({ email: Cypress.env("validEmail"), status: 422 });
  });

  it("Register with invalid email", () => {
    registerMockAPI.post({ email: data.invalidEmail, status: 404 });
  });

  it("Register with invalid password", () => {
    registerMockAPI.post({ password: data.invalidPassword, status: 401 });
  });

  it("Register without group users", () => {
    registerMockAPI.post({ numUser: 0, status: 404 });
  });

  it("Register without accepted terms", () => {
    registerMockAPI.post({ terms: false, status: 404 });
  });
});
