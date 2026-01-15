import { test } from '@playwright/test';
import { CustomerLoginPage } from '../../../src/pages/customer/CustomerLoginPage';
import { CustomerAccountPage } from '../../../src/pages/customer/CustomerAccountPage';

test('Assert customer has correct bank data', async ({ page }) => {
 
  const loginPage = new CustomerLoginPage(page);
  const accountPage = new CustomerAccountPage(page);

  //Opening page
  await loginPage.open();

  //Picking client
  await loginPage.selectCustomer('Hermoine Granger');

  //Clicking login button
  await loginPage.clickLoginButton();

  //Checking if correct data is visible
  await accountPage.assertAccountIdInDropDownHasValue('number:1001');
  await accountPage.assertAccountLineContainsText('Account Number : 1001');
  await accountPage.assertAccountLineContainsText('Balance : 5096');
  await accountPage.assertAccountLineContainsText('Currency : Dollar');
});
