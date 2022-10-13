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

  it("Login - NEG - with bad credentials", () => {
    loginMockAPI.post({email: data.badEmail,password: data.badPassword,message: data.badCredentials,status: 401}).then((response) => {
        expect(response.status).to.eq(401);
        expect(response.statusText).to.eq("Unauthorized");
      });
  });

  it("Login - NEG -with invalid email", () => {
    loginMockAPI.post({ email: data.invalidEmail, message: data.alertEmail, status: 401 }).then((response) => {
        expect(response.status).to.eq(401);
        expect(response.statusText).to.eq("Unauthorized");
      });
  });

  it("Login - NEG - with invalid password", () => {
    loginMockAPI.post({password: data.invalidEmail,message: data.alertPassword,status: 401}).then((response) => {
        expect(response.status).to.eq(401);
        expect(response.statusText).to.eq("Unauthorized");
      });
  });

  it("Login - NEG - with empty required fields", () => {
    loginMockAPI.post({email: "",password: "",message: data.email,message: data.password,status: 401}).then((response) => {
        expect(response.status).to.eq(401);
        expect(response.statusText).to.eq("Unauthorized");
      });
  });

  it("Login - NEG - with empty email", () => {
    loginMockAPI.post({ email: "", message: data.emptyEmail, status: 401 }).then((response) => {
        expect(response.status).to.eq(401);
        expect(response.statusText).to.eq("Unauthorized");
      });
  });

  it("Login  - NEG - with empty password", () => {
    loginMockAPI.post({ password: "", message: data.emptyPassword, status: 401 }).then((response) => {
        expect(response.status).to.eq(401);
        expect(response.statusText).to.eq("Unauthorized");
      });
  });

  it("Login - NEG - with uregistered user", () => {
    loginMockAPI.post({email: data.unregEmail,password: data.unregPass,message: data.unregEmail,message: data.unregPass,status: 401}).then((response) => {
        expect(response.status).to.eq(401);
        expect(response.statusText).to.eq("Unauthorized");
      });
  });
});

