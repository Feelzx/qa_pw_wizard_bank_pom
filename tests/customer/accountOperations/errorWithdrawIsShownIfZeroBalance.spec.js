import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { CustomerLoginPage } from '../../../src/pages/customer/CustomerLoginPage';
import { CustomerAccountPage } from '../../../src/pages/customer/CustomerAccountPage';

test('Assert the customer cannot withdraw money with empty balance', async ({
  page,
}) => {
  
  const customerLoginPage = new CustomerLoginPage(page);
  const accountPage = new CustomerAccountPage(page);

  //Opening page
  await customerLoginPage.open();

  //Picking the client
  await customerLoginPage.selectCustomer('Ron Weasly');

  //Clicking login button
  await customerLoginPage.clickLoginButton();

  //Checking if balans equals zero
  await accountPage.assertAccountLineContainsText('Balance : 0');

  //Clicking "Withdrawl"
  await accountPage.clickWithdrawlButton();

  //Generating data
  const amount = faker.number.int(100).toString();

  //Filling amount and checking if error occurs
  await accountPage.fillAmountInputField(amount);
  await accountPage.clickWithdrawlFormButton();
  await accountPage.assertWithdrawNoBalanceErrorMessageIsVisible();
});
