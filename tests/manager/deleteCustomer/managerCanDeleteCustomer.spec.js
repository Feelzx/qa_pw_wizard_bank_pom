import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage} from '../../../src/pages/manager/CustomersListPage';


test.beforeEach(async ({ page }) => {
 
  const addCustomerPage = new AddCustomerPage(page)

  //Opening page
  addCustomerPage.open()

  //Genering customer's data
  const customer = {

  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  zipCode: faker.location.zipCode()
  }
  //Creating customer
  await addCustomerPage.createCustomer(customer)
})

test('Assert manager can delete customer', async ({ page }) => {
  
  const customersListPage = new CustomersListPage(page)

  //Opening page
  await customersListPage.open()

  //Creating a client variable
  const exampleClient = customersListPage.lastRowNameCell
  const clientName = await exampleClient.textContent()

  //Checking visibility of the client
  await expect(exampleClient).toBeVisible()

  //Deleting a client
  await customersListPage.clickDeleteCustomerButton()

  //Checking if the client is deleted properly
  await expect(page.getByText(clientName)).toHaveCount(0)

  //Realoding the page
  await page.reload()

  //Checking if the client is deleted properly
  await expect(page.getByText(clientName)).toHaveCount(0)
})
