class LoginPage {
    // Selectors as methods to avoid early evaluation
    private get emailInput() {
        return $('android=new UiSelector().className("android.widget.EditText").instance(0)');
    }

    private get passwordInput() {
        return $('android=new UiSelector().className("android.widget.EditText").instance(1)');
    }

    private get continueButton() {
        return $('~Continue');
    }

    private get forgetPasswordButton() {
        return $('~Forget Password?');
    }

    private get joinNowButton() {
        return $('~Join Now');
    }

    async login(email: string, password: string): Promise<void> {
        // Email
        await this.emailInput.waitForDisplayed({ timeout: 15000 });
        await this.emailInput.click(); // Force focus
        await this.emailInput.setValue(email);
      
        // Password
        await this.passwordInput.waitForDisplayed({ timeout: 15000 });
        await this.passwordInput.setValue(password);
      
        // Continue
        await this.continueButton.waitForDisplayed({ timeout: 15000 });
        await this.continueButton.click();
      }
}

export default new LoginPage();