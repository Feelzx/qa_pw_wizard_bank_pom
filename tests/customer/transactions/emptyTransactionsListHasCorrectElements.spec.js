import { test } from '@playwright/test';
import { CustomerLoginPage } from '../../../src/pages/customer/CustomerLoginPage';
import { CustomerAccountPage } from '../../../src/pages/customer/CustomerAccountPage';
import { TransactionsPage } from '../../../src/pages/customer/TransactionsPage';

test('Assert the empty transactions list has correct values', async ({
  page,
}) => {

  
  const customerLoginPage = new CustomerLoginPage(page);
  const accountPage = new CustomerAccountPage(page);
  const transactionsPage = new TransactionsPage(page);

  //Opening page
  await customerLoginPage.open();

  //Selecting customer
  await customerLoginPage.selectCustomer('Albus Dumbledore');

  //Clicking login button
  await customerLoginPage.clickLoginButton();

  //Clicking transaction button
  await accountPage.clickTransactionsButton();

  //Checking if the data is correct
  await transactionsPage.assertHeaderFirstCellContainsText('Date-Time');
  await transactionsPage.assertHeaderSecondCellContainsText('Amount');
  await transactionsPage.assertHeaderThirdCellContainsText('Transaction Type');

  //Checking if first row hidden
  await transactionsPage.assertFirstRowIsHidden();
});
