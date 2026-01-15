import { test } from '@playwright/test';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage'
import { BankHomePage } from '../../../src/pages/BankHomePage'

test('Assert manager can Login', async ({ page }) => {

  const bankHomePage = new BankHomePage(page)
  const bankManagerMainPage = new BankManagerMainPage(page)

  //Opening the website
  await bankHomePage.open()

  //Chosing the manager account
  await bankHomePage.clickBankManagerLoginButton()

  //Checking if Add customer button is visible
  await bankManagerMainPage.assertAddCustomerButtonIsVibible()

  //Checking if open account button is visible
  await bankManagerMainPage.assertOpenAccountButtonIsVisible()

  //Checking if customers button is visible
  await bankManagerMainPage.assertCustomersButtonIsVisible()
});
