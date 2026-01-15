import { expect } from '@playwright/test';

export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.firstNameField = page.getByPlaceholder("First Name")
    this.lastNameField = page.getByPlaceholder("Last Name")
    this.zipCodeField = page.getByPlaceholder("Post Code")
    this.addCustomerButton = page.getByRole("button", { name: "Add Customer"}).nth(1)
    this.allCustomersButton = page.getByRole("button", {name: "Customers"})
  

  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/addCust',
    );
  }


  async createCustomer({ firstName, lastName, zipCode}) {
    await this.firstNameField.fill(firstName)
    await this.lastNameField.fill(lastName)
    await this.zipCodeField.fill(zipCode)
    await this.addCustomerButton.click()
  }

  async clickAllCustomersButton() {
    await this.allCustomersButton.click()
  }

 





}
