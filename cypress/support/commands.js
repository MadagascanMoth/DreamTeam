// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("loginBE", (email, password) => {
  cy.request({
    method: "POST",
    url: "https://cypress-api.vivifyscrum-stage.com/api/v2/login",
    body: {
      email,
      password,
      "g-recaptcha-response": "",
    },
  })
    .its("body")
    .then((response) => {
      //cy.log(JSON.stringify(response))
      window.localStorage.setItem("token", response.token);
    });
});

Cypress.Commands.add("logoutBE", (token) => {
  cy.request({
    method: "POST",
    url: "https://cypress-api.vivifyscrum-stage.com/api/v2/logout",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
});

Cypress.Commands.add("Danijela", () => {
  cy.session("Danijela", () => {
    cy.request({
      method: "POST",
      url: "https://cypress-api.vivifyscrum-stage.com/api/v2/login",
      body: {
        email: "registracija123@gmail.com",
        password: "registracija123",
        "g-recaptcha-response": "",
      },
    })
      .its("body")
      .then((response) => {
        //console.log(response.token)
        window.localStorage.setItem("token", response.token);
        window.localStorage.setItem("user_id", response.body.user.id);
      });
  });
});
