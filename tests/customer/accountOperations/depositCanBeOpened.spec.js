import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { CustomerLoginPage } from '../../../src/pages/customer/CustomerLoginPage';
import { CustomerAccountPage } from '../../../src/pages/customer/CustomerAccountPage';
import { TransactionsPage } from '../../../src/pages/customer/TransactionsPage';

test('Assert the deposit can be opened', async ({ page }) => {
  const customerLoginPage = new CustomerLoginPage(page);
  const accountPage = new CustomerAccountPage(page);
  const transactionsPage = new TransactionsPage(page);


  //Opening the page
  await customerLoginPage.open();

  //Selecting customer
  await customerLoginPage.selectCustomer('Harry Potter');

  //Clicking loggin button
  await customerLoginPage.clickLoginButton();

  //Clicking deposit button
  await accountPage.clickDepositButton();

  //Generating data
  const amount = faker.number.int(100).toString();

  //Depositing amount of money
  await accountPage.fillAmountInputField(amount);
  await accountPage.clickDepositFormButton();
  await accountPage.assertDepositSuccessfulMessageIsVisible();

  //Clicking transaction button
  await accountPage.clickTransactionsButton();

  //Checking if header is visible
  await transactionsPage.assertHeaderIsVisible();

  //Reloading the page
  await transactionsPage.reload();

  //Checking if the correct data is visible
  await transactionsPage.assertFirstRowAmountContainsText(amount);
  await transactionsPage.assertFirstRowTypeContainsText('Credit');
});
