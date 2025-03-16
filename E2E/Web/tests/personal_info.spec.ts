import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    test.setTimeout(15000); // 15 seconds timeout for this test
    await page.goto('https://www.linkedin.com/login');
    await page.getByRole('textbox', { name: 'Email or phone' }).fill('linkuptesting25@gmail.com');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('\'qD5f[(r=D^4');
    await page.getByRole('button', { name: 'Sign in', exact: true }).click();
    await page.pause();
    await page.goto('https://www.linkedin.com/in/john-smith-731278356/');
});

test('User updates their headline on user profile page', async ({ page }) => {
    const currentHeadline = await page.locator('div.text-body-medium.break-words[data-generated-suggestion-target]').innerText();
    console.log('Current Headline:', currentHeadline);
    await page.getByRole('button', { name: 'Edit intro' }).click();
    await page.getByRole('textbox', { name: 'Headline *' }).dblclick();
    await page.getByRole('textbox', { name: 'Headline *' }).press('ControlOrMeta+A');

    // Get the current date and time
    const now = new Date();
    const formattedDate = now.toLocaleString();
    const newHeadline = `My new headline - Last updated at ${formattedDate}`;

    await page.getByRole('textbox', { name: 'Headline *' }).fill(newHeadline);
    await page.getByRole('button', { name: 'Save' }).click();
    await page.getByRole('button', { name: 'Dismiss' }).click();
    // wait for 2 seconds
    await page.waitForTimeout(2000);
    const updatedHeadline = await page.locator('div.text-body-medium.break-words[data-generated-suggestion-target]').innerText();
    console.log('Updated Headline:', updatedHeadline);

    expect(updatedHeadline).toBe(newHeadline);
});

test('Upload valid photo and save', async ({ page }) => {
    await page.getByRole('button', { name: 'John Smith', exact: true }).click();
    await page.getByRole('button', { name: 'Add photo' }).click();
    await page.getByRole('textbox', { name: 'Upload photo' }).click();
    await page.getByRole('textbox', { name: 'Upload photo' }).setInputFiles('test-assets/profileImg.webp');
    await page.getByRole('button', { name: 'Save photo' }).click();
    await page.waitForTimeout(2000);
});

test('Upload invalid photo and save', async ({ page }) => {
    await page.getByRole('button', { name: 'John Smith', exact: true }).click();
    await page.getByRole('button', { name: 'Add photo' }).click();
    await page.getByRole('textbox', { name: 'Upload photo' }).click();
    await page.getByRole('textbox', { name: 'Upload photo' }).setInputFiles('test-assets/ProfileText.txt');
    await page.getByRole('region', { name: 'Toast message' }).getByRole('paragraph').click();
});

test('Upload valid cover photo from choices', async ({ page }) => {
    await page.getByRole('button', { name: 'Edit background' }).click();
    await page.getByRole('button', { name: 'Change photo' }).click();
    await page.getByRole('img', { name: 'A modern glass cabin by a' }).click();
    await page.getByRole('button', { name: 'Save' }).click();
    await page.waitForTimeout(20000);
});

test('Upload valid cover photo from device', async ({ page }) => {
    await page.getByRole('button', { name: 'Edit background' }).click();
    await page.getByRole('button', { name: 'Change photo' }).click();
    await page.getByText('Upload photo').click();
    await page.getByRole('textbox', { name: 'Upload photo' }).setInputFiles('test-assets/cover-photo.jpg');
    await page.getByRole('button', { name: 'Apply' }).click();
    await page.waitForTimeout(20000);
});