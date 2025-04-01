const page = require('../pageobjects/login.page');

describe('Login Screen Test', () => {
    before(async () => {
        // Wait for the app to load
        await browser.pause(2000);
        
        // Check if the app is ready by waiting for the email input field
        const emailField = await $('android=new UiSelector().className("android.widget.EditText").textContains("Email or Phone Number")');
        await emailField.waitForDisplayed({ timeout: 10000 });
    });

    it('should login using email and password', async () => {
        await page.login("test@gmail.com", "abc-ABC-12");
    });
});