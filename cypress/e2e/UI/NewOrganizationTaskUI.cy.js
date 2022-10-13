/// <reference types="cypress" />
import { newOrganization } from "../../pageObjects/newOrganization";
import { faker } from "@faker-js/faker";
import { newTask } from "../../pageObjects/newTask";
import { loginPage } from "../../pageObjects/loginPage";

let organization = {
  name: faker.name.firstName(),
  board: faker.name.jobTitle(),
};

let organizationId;
let taskId;
let boardId;
let code;
let taskId2;

let task = {
  title: faker.name.firstName(),
  description: faker.animal.cat(),
  comment: faker.lorem.sentence(),
};

let task2 = {
  title: faker.name.firstName(),
  description: faker.animal.cat(),
  comment: faker.lorem.sentence(),
};

describe("New Organization Task Test Cases", () => {
  beforeEach("Visit Vivify Scrum and Login", () => {
    loginPage.loginSession("Danijela");
  });

  it("Create new organization", () => {
    cy.visit("/");
    newOrganization.createOrganizationFunction(organization.name).then((response) => {
        organizationId = response.body.id;
      });
  });

  it("Create new organization board", () => {
    cy.visit(`/organizations/${organizationId}/boards`);
    newOrganization.createNewOrganizationBoard(organization.board, `${organizationId}`).then((response) => {
        boardId = response.body.id;
        code = response.body.code;
      });
  });

  it("Create New Task", () => {
    cy.visit(`/boards/${boardId}`);
    newTask.newTaskCard(task.title, task.description, task.comment).then((response)=> {
        taskId = response.body.code;
      });
  });

  it("Task-drop down function", () => {
    newTask.taskTypeFunction(boardId, taskId);
  });

  it("Create Second Task", () => {
    cy.visit(`/boards/${boardId}`);
    newTask.newTaskCard2(task2.title, task2.description, task2.comment).then((response)=> {
        taskId2 = response.body.code;
      });
  });
  it("Sprint collumn task changes", () => {
    newTask.changeTaskCollumn(boardId, taskId);
  });

  it("Drag and Drop", () => {
    newTask.dragDrop(boardId, taskId2);
  });

  it("Delete organization",()=>{
    newOrganization.deleteOrganization(organizationId) 

  })
});
