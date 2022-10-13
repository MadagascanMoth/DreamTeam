class NewTask {
  get newTaskButton() {
    return cy
      .get(
        "[class='vs-add-new-task vs-c-btn vs-c-btn--themify-secondary vs-c-btn--round vs-c-btn--sm vs-c-task-card__not-selectable']"
      )
      .last();
  }

  get taskCard() {
    return cy.get("[name='item_name']");
  }

  get saveButton() {
    return cy.get("[name='new_item_save']");
  }

  get taskCardOpen() {
    return cy.get("[class='vs-c-task-card__body']").last();
  }

  get descriptionField() {
    cy.get("[class='el-icon-edit']").click();
  }

  get descriptionFieldEdit() {
    return cy.get("[name='description']");
  }

  get fileUpload() {
    return cy.get('[type="file"]').attachFile("flower.jpg");
  }

  get newComment() {
    return cy.get("[name='new_comment']");
  }

  get saveComment() {
    return cy.get("[name='item_description_save']");
  }

  get label() {
    return cy.get("[name='add-label-button']");
  }

  get labelSelect() {
    return cy.get('[class="vs-c-label item-label"]').first();
  }

  get checkButton() {
    return cy.get("[class='el-icon-check']").first();
  }

  get closeTask() {
    return cy.get("[name='close-item-modal-btn']");
  }

  get taskType() {
    return cy.get("[class='el-icon-caret-bottom el-icon--right']").first();
  }

  get allTypes() {
    return cy.get(" ul li > [class='vs-c-task-modal-type-dropdown__icon']");
  }

  newTaskCard(title, description, comment) {
    cy.intercept(
      "POST",
      "https://cypress-api.vivifyscrum-stage.com/api/v2/tasks"
    ).as("task");
    this.newTaskButton.click({ force: true });
    this.taskCard.type(title);
    this.saveButton.should("be.visible").click();
    cy.wait(4000);
    this.taskCardOpen.click();
    this.descriptionField;
    this.descriptionFieldEdit.type(description);
    this.saveComment.click();
    this.fileUpload;
    cy.wait(4000);
    this.newComment.type(comment);
    this.label.click();
    this.labelSelect.click();
    this.closeTask.click();
    return cy.wait("@task").then((intercept) => {
      return intercept.response;
    });
  }

  taskId(token) {
    return cy
      .request({
        method: "POST",
        url: "https://cypress-api.vivifyscrum-stage.com/api/v2/tasks",
        body: {
          item: {
            name: "nov task",
            board_id: 11761,
            sprint_id: 19514,
            sprint_backlog_column_id: null,
            priority_id: 2,
            parent_id: null,
            labels: [],
            doers: [],
            reviewers: [],
            type_id: 1,
            points_id: null,
            taskvalue_id: 1,
            checklists: [],
            blocking_task_id: null,
          },
          prev: { id: 15382, order: 1001.23 },
          next: null,
          board_id: 11761,
          isOnSprint: true,
        },
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        return response;
      });
  }

  taskTypeFunction(boardId, taskId) {
    cy.visit(`/boards/${boardId}/${taskId}`);
    cy.get("[class='el-icon-caret-bottom el-icon--right']").first().click();
    cy.get("[class='vs-c-task-list']").last().click({force:true})
    cy.get('[name="itemTypes"]').find("li").first().contains("span", "Story");
    cy.get('[name="itemTypes"]').should("contain.text", "Bug");
    var dropdown = ["Story", "Improvement", "Bug", "Task", "Note", "Idea"];
    cy.get('[name="itemTypes"] [name]*').each(($el, index, list) => {
      expect(list).to.have.length(6);
      cy.wrap($el).should("contain.text", dropdown[index]);
    });
  }

  changeTaskCollumn(boardId, taskId) {
    cy.visit(`/boards/${boardId}/${taskId}`);
    cy.get("[class='vs-c-col']").eq(0).should("contain", `${taskId}`);
    cy.get("[name='sprint-info-dropdown']").click();
    cy.get('[class="vs-c-task-modal-type-dropdown__icon vs-c-icon--lg"]')
      .eq(2)
      .click();
    cy.get("[name='sprint-info-dropdown']").should("have.text", "Done  ");
    cy.get("[name='close-item-modal-btn']").click();
    cy.get("[class='vs-c-col']").eq(2).should("contain", `${taskId}`);
  }

  changeTaskCollumnOrganization(boardId,taskId){
    cy.visit(`/boards/${boardId}/${taskId}`);
    cy.get("[class='vs-c-col']").eq(0).should("contain", `${taskId}`);
    cy.get("[name='sprint-info-dropdown']").click();
    cy.get('[class="vs-c-task-modal-type-dropdown__icon vs-c-icon--lg"]')
      .eq(2)
      .click();
    cy.get("[name='sprint-info-dropdown']").should("have.text", "Done  ");
    cy.get("[name='close-item-modal-btn']").click();
    cy.get("[class='vs-c-col']").eq(2).should("contain", `${taskId}`);

  }

  dragDrop(boardId) {
    cy.visit(`/boards/${boardId}`);
    const dataTransfer = new DataTransfer();
    cy.get('[class="vs-c-task-card__body"]').last().trigger("dragstart", {
      dataTransfer,
    });
    cy.get("[class='vs-c-col__head']").eq(1).trigger("drop", {
      dataTransfer,
    });
  }

  newTaskCard2(title, description, comment) {
    cy.intercept(
      "POST",
      "https://cypress-api.vivifyscrum-stage.com/api/v2/tasks"
    ).as("task");
    this.newTaskButton.click({ force: true });
    this.taskCard.type(title);
    this.saveButton.click({force:true});
    cy.wait(4000);
    this.taskCardOpen.click({force:true});
    this.descriptionField;
    this.descriptionFieldEdit.type(description);
    this.saveComment.click();
    this.fileUpload;
    cy.wait(4000);
    this.newComment.type(comment);
    this.label.click();
    this.labelSelect.click();
    this.closeTask.click();
    return cy.wait("@task").then((intercept) => {
      return intercept.response;
    });
  }

  newTaskCardFunction(title, description, comment) {
    cy.intercept(
      "POST",
      "https://cypress-api.vivifyscrum-stage.com/api/v2/tasks"
    ).as("task");
    this.newTaskButton.click({ force: true });
    this.taskCard.type(title);
    this.saveButton.should("be.visible").click();
    cy.wait(4000);
    this.taskCardOpen.click();
    this.descriptionField;
    this.descriptionFieldEdit.type(description);
    this.saveComment.click();
    this.fileUpload;
    cy.wait(4000);
    this.newComment.type(comment);
    this.label.click();
    this.labelSelect.click();
    this.closeTask.click();
    return cy.wait("@task").then((intercept) => {
      return intercept.response;
    });
  }

  taskTypeFunction2(boardId){
    cy.visit(`/boards/${boardId}`)
    cy.get('[class="vs-c-task-card__body"]').last().click()
    cy.get('[class="vs-c-task-type__icon"]').click()
    cy.get('[name="itemTypes"]').find("li").first().contains("span", "Story");
    cy.get('[name="itemTypes"]').should("contain.text", "Bug");
    var dropdown = ["Story", "Improvement", "Bug", "Task", "Note", "Idea"];
    cy.get('[name="itemTypes"] [name]*').each(($el, index, list) => {
        expect(list).to.have.length(6);
        cy.wrap($el).should("contain.text", dropdown[index]);
    });
  }


  changeTaskCollumn2(boardId) {
    cy.visit(`/boards/${boardId}`);
    cy.get("[class='vs-c-task-card__body']").eq(0);
    cy.get("[class='vs-c-task-card__body']").last().click()
    cy.get("[name='sprint-info-dropdown']").click();
    cy.get('[class="vs-c-task-modal-type-dropdown__icon vs-c-icon--lg"]').eq(2).click();
    cy.get("[name='sprint-info-dropdown']").should("have.text", "Done  ");
    cy.get("[name='close-item-modal-btn']").click();
    cy.get("[class='vs-c-task-card__body']").eq(2)
  }


}

export const newTask = new NewTask();
