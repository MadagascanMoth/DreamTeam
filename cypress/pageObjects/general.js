class General {
  get loginHeader() {
    return cy.get("[class='vs-c-auth-modal-body__heading']");
  }

  get registerHeader() {
    return cy.get("[class='vs-c-auth-modal-body__heading']");
  }

  get alertEmail() {
    return cy.get(
      ":nth-child(1) > .vs-c-form-item__error-wrapper > .el-form-item__error"
    );
  }

  get alertPassword() {
    return cy
      .get(
        ":nth-child(2) > .vs-c-form-item__error-wrapper > .el-form-item__error"
      )
      .first();
  }

  get alertCredentials() {
    return cy.get(
      ":nth-child(2) > .vs-c-form-item__error-wrapper > .el-form-item__error"
    );
  }

  get emptyEmail() {
    return cy
      .get("[class='el-form-item__error el-form-item-error--top']")
      .first();
  }

  get emptyPassword() {
    return cy
      .get("[class='el-form-item__error el-form-item-error--top']")
      .last();
  }

  get registeredEmail() {
    return cy.get(
      ":nth-child(1) > .vs-c-form-item__error-wrapper > .el-form-item__error"
    );
  }
}

export const general = new General();
