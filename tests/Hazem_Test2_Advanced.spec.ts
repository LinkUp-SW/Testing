import {test, expect} from '@playwright/test';

// 1. Test if form loads correctly 
test('Ensure all input fields exist', async ({ page }) => {
    await page.goto('https://formy-project.herokuapp.com/form');

    // text input fields
    await expect(page.locator('#first-name')).toBeVisible();
    await expect(page.locator('#last-name')).toBeVisible();
    await expect(page.locator('#job-title')).toBeVisible();

    // radio buttons
    await expect(page.locator('#radio-button-1')).toBeVisible();
    await expect(page.locator('#radio-button-2')).toBeVisible();
    await expect(page.locator('#radio-button-3')).toBeVisible();

    // checkboxes
    await expect(page.locator('#checkbox-1')).toBeVisible();
    await expect(page.locator('#checkbox-2')).toBeVisible();
    await expect(page.locator('#checkbox-3')).toBeVisible();

    // dropdowns
    await expect(page.locator('#select-menu')).toBeVisible();

    // date picker
    await expect(page.locator('#datepicker')).toBeVisible();

    // submit button
    await expect(page.getByRole('button', {name : 'Submit'})).toBeVisible();
});
// 2. Test filling and submitting the form successfully (Normal flow)
test('Normal Flow', async ({ page }) => {
    await page.goto('https://formy-project.herokuapp.com/form');

    await page.getByRole('textbox', { name: 'First name' }).click();
    await page.getByRole('textbox', { name: 'First name' }).fill('A');
    await page.getByRole('textbox', { name: 'First name' }).press('CapsLock');
    await page.getByRole('textbox', { name: 'First name' }).fill('Ab');
    await page.getByRole('textbox', { name: 'First name' }).press('Tab');
    await page.getByRole('textbox', { name: 'Last name' }).press('CapsLock');
    await page.getByRole('textbox', { name: 'Last name' }).fill('C');
    await page.getByRole('textbox', { name: 'Last name' }).press('CapsLock');
    await page.getByRole('textbox', { name: 'Last name' }).fill('Cd');
    await page.getByRole('textbox', { name: 'Job title' }).click();
    await page.getByRole('textbox', { name: 'Job title' }).fill('engineer');
    await page.locator('#radio-button-1').check();
    await page.locator('#checkbox-2').check();
    await page.getByLabel('Years of experience:').selectOption('2');
    await page.getByRole('textbox', { name: 'mm/dd/yyyy' }).click();
    await page.getByRole('cell', { name: '19' }).click();
    await page.getByRole('button', { name: 'Submit' }).click();
});
// 3. Test radio button selection
test('Radio Button Selection', async ({ page }) => {
    await page.goto('https://formy-project.herokuapp.com/form');

    await page.locator('#radio-button-1').check();
    await expect(page.locator('#radio-button-1')).toBeChecked();
    await page.locator('#radio-button-2').check();
    await expect(page.locator('#radio-button-2')).toBeChecked();
    await expect(page.locator('#radio-button-1')).not.toBeChecked();
});