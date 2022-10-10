import { faker } from "@faker-js/faker";

let user = {
  email: faker.internet.email(),
  password: faker.internet.password(),
  number: faker.datatype.number({
    min: 1,
    max: 10,
  }),
};

class RegisterMockAPI {
  post({
    email = user.email,
    password = user.password,
    numUser = user.number,
    status = 200,
    terms = true,
    plan = 1,
  }) {
    return cy
      .request({
        failOnStatusCode: false,
        method: "POST",
        url: "https://cypress-api.vivifyscrum-stage.com/api/v2/register",
        headers: {
          accept: "application/json",
        },
        body: {
          email: email,
          password: password,
          repeatpassword: password,
          agreed_to_terms: terms,
          "g-recaptcha-response": "",
          finished_registration: true,
          plan_id: plan,
          plan_type: "yearly",
          number_of_users: numUser,
          referal: null,
        },
      })
      .then((response) => {
        expect(response.status).to.eq(status);
        return response;
      });
  }
}

export const registerMockAPI = new RegisterMockAPI();
