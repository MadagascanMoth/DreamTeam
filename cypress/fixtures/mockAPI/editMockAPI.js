import { faker } from "@faker-js/faker";

let board = {
    name: faker.name.firstName(),
    description: faker.random.word(),
    editedName: faker.name.lastName(),
  };

class EditMockAPI {

    post({token =`${token}`, boardId,code = `${code}`, name = board.editedName, description = board.description,}){
        cy.request({
            method: "PUT",
            url: `https://cypress-api.vivifyscrum-stage.com/api/v2/boards/${boardId}`,
            body: {
              name: name,
              description: description,
              code: `${code}`,
              task_unit: "points",
            },
            headers: {
              authorization: `Bearer ${token}`,
            },
          }).then((response) => {
            return response;
          });
    }

}


export const editMockAPI = new EditMockAPI()