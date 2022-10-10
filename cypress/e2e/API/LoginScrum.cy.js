/// <reference types="cypress" />

import { token } from "../../fixtures/token.json";
import data from "../../fixtures/data.json";
import { loginMockAPI } from "../../fixtures/mockAPI/loginMockAPI";

describe("Login through Backend", () => {
  it("Login spec with mockAPI", () => {
    loginMockAPI.post({}).then((response) => {
      //token = response.body.token
      cy.writeFile("cypress/fixtures/token.json", { token: token });
    });
  });

  it("Login with bad credentials", () => {
    loginMockAPI
      .post({
        email: data.badEmail,
        password: data.badPassword,
        message: data.badCredentials,
        status: 401,
      })
      .then((response) => {
        expect(response.status).to.eq(401);
        expect(response.statusText).to.eq("Unauthorized");
      });
  });

  it("Login with invalid email", () => {
    loginMockAPI
      .post({ email: data.invalidEmail, message: data.alertEmail, status: 401 })
      .then((response) => {
        expect(response.status).to.eq(401);
        expect(response.statusText).to.eq("Unauthorized");
      });
  });

  it("Login with invalid password", () => {
    loginMockAPI
      .post({
        password: data.invalidEmail,
        message: data.alertPassword,
        status: 401,
      })
      .then((response) => {
        expect(response.status).to.eq(401);
        expect(response.statusText).to.eq("Unauthorized");
      });
  });

  it("Login with empty required fields", () => {
    loginMockAPI
      .post({
        email: "",
        password: "",
        message: data.email,
        message: data.password,
        status: 401,
      })
      .then((response) => {
        expect(response.status).to.eq(401);
        expect(response.statusText).to.eq("Unauthorized");
      });
  });

  it("Login with empty email", () => {
    loginMockAPI
      .post({ email: "", message: data.emptyEmail, status: 401 })
      .then((response) => {
        expect(response.status).to.eq(401);
        expect(response.statusText).to.eq("Unauthorized");
      });
  });

  it("Login with empty password", () => {
    loginMockAPI
      .post({ password: "", message: data.emptyPassword, status: 401 })
      .then((response) => {
        expect(response.status).to.eq(401);
        expect(response.statusText).to.eq("Unauthorized");
      });
  });

  it("Login with uregistered user", () => {
    loginMockAPI
      .post({
        email: data.unregEmail,
        password: data.unregPass,
        message: data.unregEmail,
        message: data.unregPass,
        status: 401,
      })
      .then((response) => {
        expect(response.status).to.eq(401);
        expect(response.statusText).to.eq("Unauthorized");
      });
  });
});

// it("Login with valid credentials through Backened", () => {
//   cy.loginBE("test1235@gmail.com", "test1235");
//   cy.visit("/");
// });

// it("Login through session", () => {
//   cy.session("Danijela", () => {
//     cy.request({
//       method: "POST",
//       url: "https://cypress-api.vivifyscrum-stage.com/api/v2/login",
//       body: {
//         email: "registracija@gmail.com",
//         password: "registracija55",
//         "g-recaptcha-response": "",
//       },
//     }).then((response) => {
//       window.localStorage.setItem("token", response.body.token);
//       window.localStorage.setItem("user_id", response.body.user.id);
//       window.localStorage.setItem("user", JSON.stringify(response.body.user));
//     });
//   });
// });
