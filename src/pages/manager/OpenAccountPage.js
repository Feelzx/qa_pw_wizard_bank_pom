import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.currencyDropdown = page.locator('#currency')
    this.customerDropdown = page.locator('#userSelect')
    this.processButton = page.getByRole("button", { name: "Process"})
    this.addCustomerButton = page.getByRole("button", { name: "Add Customer"})
    this.openAccountButton = page.getByRole("button", { name: "Open Account"})
    this.customersListButton = page.getByRole("button", { name: "Customers"})
    this.popUp = page
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/openAccount',
    );
  }

  async pickDollarFromDropdown() {
    await this.currencyDropdown.selectOption({ label: 'Dollar'})
  }

  async pickPoundFromDropdown() {
    await this.currencyDropdown.selectOption({ label: 'Pound'})
  }

  async pickRupeeFromDropdown() {
    await this.currencyDropdown.selectOption({ label: 'Rupee'})
  }

  async pickClientFromDropdown() {
    await this.customerDropdown.selectOption()
  }

  async clickProcessButton() {
    await this.processButton.click()
  }

    async clickAddCustomerButton() {
    await this.addCustomerButton.click()
  }

  async clickOpenAccountButton() {
    await this.openAccountButton.click()
  }

  async clickOpenCustomersListButton() {
    await this.customersListButton.click()
}

  async clickPopUp() {
    this.page.once('dialog', dialog => dialog.accept())
  }

}
