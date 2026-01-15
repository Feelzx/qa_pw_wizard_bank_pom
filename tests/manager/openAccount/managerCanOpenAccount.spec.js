import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage'
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage'
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage'
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage'

test.beforeEach(async ({ page }) => {
 
  const addCustomerPage = new AddCustomerPage(page)

  //Opening page
  await addCustomerPage.open()

  //Generating customer's data
  const customer = {

  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  zipCode: faker.location.zipCode()
  }
  //Creating customer
  await addCustomerPage.createCustomer(customer)

  //Reloading page
  await page.reload()
})

test('Assert manager can add new customer', async ({ page }) => { const bankManagerMainPage = new BankManagerMainPage(page)


    const openAccountPage = new OpenAccountPage(page)
    const customersListPage= new CustomersListPage(page)

    //Opening page
    await customersListPage.open()

    //Creating a client variable
    const exampleClient = customersListPage.lastRowNameCell

    //Clicking Open account button
    await bankManagerMainPage.clickOpenAccountButton()

    //Picking previously added customer from dropdown
    const customerDropdown = openAccountPage.customerDropdown
    const lastOptionValue = await customerDropdown.locator('option:last-child').getAttribute('value')
    await customerDropdown.selectOption(lastOptionValue)

    //Picking currency
    await openAccountPage.pickDollarFromDropdown()

    //Clicking process button
    await openAccountPage.clickProcessButton()

    //Reloading the page
    await page.reload()

    //Clicking open
    await openAccountPage.clickOpenCustomersListButton()

    //Checking if client's bank account number row is not empty
    await expect(customersListPage.accountNumber).not.toHaveText('')

});
