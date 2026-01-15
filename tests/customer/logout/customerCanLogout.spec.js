import { test } from '@playwright/test';
import { BankHomePage } from '../../../src/pages/BankHomePage';
import { CustomerLoginPage } from '../../../src/pages/customer/CustomerLoginPage';
import { CustomerAccountPage } from '../../../src/pages/customer/CustomerAccountPage';

test('Assert correct customer Logout', async ({ page }) => {
  const bankHomePage = new BankHomePage(page);
  const customerLoginPage = new CustomerLoginPage(page);
  const accountPage = new CustomerAccountPage(page);

  //Opening page
  await bankHomePage.open();

  //Clicking customer login button
  await bankHomePage.clickCustomerLoginButton();

  //Picking client
  await customerLoginPage.selectCustomer('Neville Longbottom');

  //Clicking login button
  await customerLoginPage.clickLoginButton();

  //Logging out
  await accountPage.clickLogoutButton();

  //Waiting for URL
  await customerLoginPage.waitForOpened();

  //Checking if dropdown has correct value 
  await customerLoginPage.assertSelectCustomerDropdownIsVisible();
  await customerLoginPage.assertSelectCustomerDropdownContainsValue('');
});
