import { faker } from "@faker-js/faker";
import tokenData from '../token.json'

let organization = {
    name: faker.name.firstName(),
    board: faker.name.jobTitle(),
  };


class OrganizationMockAPI{

    post({name = organization.name, status = 201, token = tokenData.token }){
        return cy.request({
            method: "POST",
            url : "https://cypress-api.vivifyscrum-stage.com/api/v2/organizations",
            body: {
                name: name,
                avatar_crop_cords:"",
                file: "",
            },
            headers: {
                accept: "application/json",
                authorization: `Bearer ${token}`                                

            }
        }).then((response)=>{
            console.log(response)
            expect(response.status).to.eq(status)
            return response
        })
    }

}

export const organizationMockAPI = new OrganizationMockAPI()