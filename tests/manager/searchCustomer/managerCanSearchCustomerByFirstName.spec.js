import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage'
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage'

let firstName;
let lastName;
let zipCode;

test.beforeEach(async ({ page }) => {

  const addCustomerPage = new AddCustomerPage(page)

  //Opening page
  await addCustomerPage.open()

  //Generating customer's data

  firstName = faker.person.firstName(),
  lastName = faker.person.lastName(),
  zipCode = faker.location.zipCode()

  const customer = { firstName, lastName, zipCode}
  
  //Creating customer
  await addCustomerPage.createCustomer(customer)

  //Reloading page
  await page.reload()
})

test('Assert manager can search customer by First Name', async ({ page }) => {

  const customersListPage = new CustomersListPage(page)

  //Opening page
  await customersListPage.open()

  //Typing first name
  await customersListPage.SearchCustomerBar.fill(firstName)

  //Checking if the row is visible
  const row = customersListPage.getCustomerRowByFirstName(firstName)
  await expect(row).toBeVisible()

  //Checking if it is the only visible row
  await expect(customersListPage.rows).toHaveCount(1)

  
});
