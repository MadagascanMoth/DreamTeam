import { faker } from "@faker-js/faker";
import tokenData from "../token.json"

let board = {
  name: faker.name.firstName(),
  description: faker.random.word(),
  editedName: faker.name.lastName(),
};

class CreateMockAPI {
  post({ boardName = board.name, status = 201, token = tokenData.token, organizationId = 22243 }) {
    return cy
      .request({
        method: "POST",
        url: "https://cypress-api.vivifyscrum-stage.com/api/v2/boards",
        headers: {
          authorization: `Bearer ${token}`,
          accept: "application/json",
        },
        body: {
          name: boardName,
          type: "kanban_board",
          configuration_board_id: "",
          team_members_board_id: "",
          organization_id: organizationId,
          avatar_crop_cords: {},
          file: "",
        },
      })
      .then((response) => {
        expect(response.status).to.eq(status);
        return response;
      });
  }
}
export const createMockAPI = new CreateMockAPI();
