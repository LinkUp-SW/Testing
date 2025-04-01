class LoginPage {
    async login(email: string, password: string) {
        // Locate the email field using class and content-desc
        const emailField = await $('android=new UiSelector().className("android.widget.EditText").textContains("Email or Phone Number")');
        await emailField.waitForDisplayed({ timeout: 10000 });
        
        // Locate the password field using class and hint
        const passwordField = await $('android=new UiSelector().className("android.widget.EditText").textContains("Password")');
        await passwordField.waitForDisplayed({ timeout: 10000 });
        
        // Locate the continue button using text
        const continueButton = await $('android=new UiSelector().text("Continue")');
        await continueButton.waitForDisplayed({ timeout: 10000 });
        
        // Set email
        await emailField.setValue(email);
        
        // Set password
        await passwordField.setValue(password);
        
        // Tap the continue button
        await continueButton.click();
    }
}

module.exports = new LoginPage();