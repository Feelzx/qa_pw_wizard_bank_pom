import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage'


test('Assert manager can choose currencies for account', async ({ page }) => {

  const openAccountPage = new OpenAccountPage(page)

  //Opening page
  await openAccountPage.open()

  //Picking dollar from dropdown
  await openAccountPage.pickDollarFromDropdown()

  //Checking choosen value
  await expect(openAccountPage.currencyDropdown).toHaveValue('Dollar')

  //Picking pound from dropdown
  await openAccountPage.pickPoundFromDropdown()

  //Checking choosen value
  await expect(openAccountPage.currencyDropdown).toHaveValue('Pound')

  //Picking rupee from dropdown
  await openAccountPage.pickRupeeFromDropdown()

  //Checking choosen value
  await expect(openAccountPage.currencyDropdown).toHaveValue('Rupee')
});
