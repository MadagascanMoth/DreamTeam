
class TaskMockAPI{
    post({token,boardId = `${boardId}`}){
        cy.request({
            method: "POST",
            url : "https://cypress-api.vivifyscrum-stage.com/api/v2/tasks",
            body:{
                  item: {
                    name: "nov task",
                    board_id: `${boardId}`,
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
                    board_id: `${boardId}`,
                    isOnSprint: true,
                },
             headers: {
                  authorization: `Bearer ${token}`,
                }
              }).then((response) => {
                return response;
            });
              
    }

}

export const taskMockAPI = new TaskMockAPI()