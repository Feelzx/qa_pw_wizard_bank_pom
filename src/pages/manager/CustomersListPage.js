import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page
    this.rows = page.locator('tr.ng-scope')
    this.lastRowNameCell = this.rows.last().locator('td.ng-binding').first()
    this.lastRowLastNameCell = this.rows.last().locator('td.ng-binding').nth(1)
    this.lastRowZipCodeCell = this.rows.last().locator('td.ng-binding').nth(2)
    this.lastRowAccountNumberCell = this.rows.last().locator('td:nth-child(4)')
    this.deleteCustomerButton = this.rows.last().locator('td:last-child button')
    this.accountNumber = this.rows.last().locator('td:nth-last-child(2)');
    this.SearchCustomerBar = page.getByPlaceholder("Search customer")


  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

async assertFirstNameInLastRow(text) {
  await expect(this.lastRowNameCell).toHaveText(text);
}

async assertLastNameInLastRow(text) {
  await expect(this.lastRowLastNameCell).toHaveText(text)
}

async assertZipCodeInLastRow(text) {
  await expect(this.lastRowZipCodeCell).toHaveText(text)
}

async assertAccountNumberInLastRow(text) {
  await expect(this.lastRowAccountNumberCell).toHaveText(text)
}

async clickDeleteCustomerButton() {
  await this.deleteCustomerButton.click()
}

getCustomerRowByFirstName(firstName) {
  return this.page.locator('tbody tr', { hasText: firstName });
}

getCustomerRowByLastName(lastName) {
  return this.page.locator('tbody tr', { hasText: lastName})
}

getCustomerRowByZipCode(zipCode) {
  return this.page.locator('tbody tr', { hasText: zipCode})
}

}

