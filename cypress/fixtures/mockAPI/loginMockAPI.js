class LoginMockAPI {
  post({
    email = "registracija123@gmail.com",
    password = "registracija123",
    url = "https://cypress-api.vivifyscrum-stage.com/api/v2/login",
    message,
    status = 200,
  }) {
    return cy
      .request({
        failOnStatusCode: false,
        method: "POST",
        url: url,
        body: {
          email: email,
          password: password,
          "g-recaptcha-response": "",
          message: message,
        },
      })
      .then((response) => {
        return response;
      });
  }
}

export const loginMockAPI = new LoginMockAPI();
