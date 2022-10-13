/// <reference types="cypress" />
import { token } from "../../fixtures/token.json";
import { createMockAPI } from "../../fixtures/mockAPI/createMockAPI";
import { loginMockAPI } from "../../fixtures/mockAPI/loginMockAPI";
import { editMockAPI } from "../../fixtures/mockAPI/editMockAPI";
import { deleteMockAPI } from "../../fixtures/mockAPI/deleteMockAPI";

let boardId;
let code;

describe("Create, Edit and Delete Test Cases Scrum", () => {
  before("Login", () => {
    loginMockAPI.post({}).then((response) => {
      cy.writeFile("cypress/fixtures/token.json", {token: response.body.token});
    });
  });

  it("Create Board", () => {
    createMockAPI.post({ token }).then((response) => {
      boardId = response.body.id;
      code = response.body.code;
    });
  });

  it("Edit Board", () => {
    editMockAPI.post({ token, boardId, code });
  });

  it("Delete Board", () => {
    deleteMockAPI.post({ token, boardId });
  });
});
