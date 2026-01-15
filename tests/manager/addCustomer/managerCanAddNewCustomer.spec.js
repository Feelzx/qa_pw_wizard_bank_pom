import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage} from '../../../src/pages/manager/CustomersListPage';
test('Assert manager can add new customer', async ({ page }) => {

 const addCustomerPage = new AddCustomerPage(page)
 const customersListPage = new CustomersListPage(page)

 //Opening the website (these are my comments not AIs btw)
 await addCustomerPage.open()

 //Genering customer's data
 const customer = {
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  zipCode: faker.location.zipCode()
 }

 //Creating customer
 await addCustomerPage.createCustomer(customer)

 //Refreshing the page
 await page.reload()

 //Clicking all customers button
 await addCustomerPage.clickAllCustomersButton()

 //Checking if customer's name is visible
 await customersListPage.assertFirstNameInLastRow(customer.firstName)

 //Checking if customer's last name is visible
 await customersListPage.assertLastNameInLastRow(customer.lastName)

 //Checking if customer's zip code is visible
 await customersListPage.assertZipCodeInLastRow(customer.zipCode)

 //Checking if customer's account number is empty
 await customersListPage.assertAccountNumberInLastRow("")

 }


);