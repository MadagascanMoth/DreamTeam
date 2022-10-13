/// <reference types="cypress" />
import { faker } from "@faker-js/faker";
import { newOrganization } from "../../pageObjects/newOrganization";
import { newTask } from "../../pageObjects/newTask";
import { loginPage } from "../../pageObjects/loginPage";
import {organizationMockAPI} from "../../fixtures/mockAPI/organizationMockAPI"
import {token} from "../../fixtures/token.json"
import {createMockAPI} from "../../fixtures/mockAPI/createMockAPI"
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
let taskId;
let boardId;
let code;
let taskId2;


describe("Organization, Board and Task Test Cases", ()=>{
    beforeEach("Login, create organization and board",()=>{
        loginPage.loginBe("Danijela")
        organizationMockAPI.post(`${token}`).then((response)=>{
            createMockAPI.post({token,organizationId:response.body.id}).then((response)=>{                
                cy.visit(`/boards/${response.body.id}`)
                boardId = response.body.id
                code = response.body.code
            })
        });
    });

    it("Create New Task and change through collumns", () => {
        newTask.newTaskCardFunction(task.title, task.description, task.comment).then((response) => {
            taskId = response.body.code;
        });
        newTask.taskTypeFunction2(boardId);
        newTask.newTaskCard2(task2.title, task2.description, task2.comment).then((response)=> {
            taskId2 = response.body.code;
        });
        newTask.changeTaskCollumn2(boardId)
        newTask.dragDrop(boardId, taskId2);
        newOrganization.deleteOrg()
    });
});




