/// <reference types="cypress" />
import { createBoard } from "../../pageObjects/createBoard";
import { faker } from "@faker-js/faker";
import { editBoard } from "../../pageObjects/editBoard";

let board = {
  name: faker.name.firstName(),
  description: faker.random.word(),
  editedName: faker.name.lastName(),
};
let boardId;
let code;

describe("Create, Edit and Delete Board", () => {
  beforeEach("Visit Vivify Scrum Page and Login", () => {
    createBoard.loginBeforeEach("Danijela");
  });

  it("Create Board", () => {
    createBoard.createBoardFunction(board.name).then((response) => {
      boardId = response.body.id;
      code = response.body.code;
    });
  });

  it("Edit Board", () => {
    editBoard.editBoardFunction(`${boardId}`,board.editedName,board.description);
  });

  it("Delete Board", () => {
    editBoard.deleteBoardFunction(`${boardId}`);
  });
});
