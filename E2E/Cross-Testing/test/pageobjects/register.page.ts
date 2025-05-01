class registerPage {
    private get joinButton() {
        return $('~Join LinkUp');
    }
    
    private get emailInput() {
        return $('android=new UiSelector().className("android.widget.EditText").instance(0)');
    }

    private get passwordInput() {
        return $('android=new UiSelector().className("android.widget.EditText").instance(1)');
    }

    private get signUpButton() {
        return $('~Sign Up');
    }

    private get firstNameInput() {
        return $('android=new UiSelector().className("android.widget.EditText").instance(0)');
    }

    private get lastNameInput() {
        return $('android=new UiSelector().className("android.widget.EditText").instance(1)');
    }

    private get nextButton() {
        return $('~Next');
    }

    private get phoneNumerInput() {
        return $('android=new UiSelector().className("android.widget.EditText")');
    }   

    private get submitButton() {
        return $('~Submit');
    }

    async clickJoinButton(): Promise<void> {
        await this.joinButton.waitForDisplayed({ timeout: 15000 });
        await this.joinButton.click();
    }

    async signUp(email: string, password: string, firstName : string, lastName : string, phoneNumber : string): Promise<void> {
        // Email
        await this.emailInput.waitForDisplayed({ timeout: 15000 });
        await this.emailInput.click(); // Force focus
        await this.emailInput.setValue(email);
      
        // Password
        await this.passwordInput.waitForDisplayed({ timeout: 15000 });
        await this.passwordInput.click(); // Force focus
        await this.passwordInput.setValue(password);
      
        // Continue
        await this.signUpButton.waitForDisplayed({ timeout: 15000 });
        await this.signUpButton.click();

        // First Name
        await this.firstNameInput.waitForDisplayed({ timeout: 15000 });
        await this.firstNameInput.click(); // Force focus
        await this.firstNameInput.setValue(firstName);
        // Last Name
        await this.lastNameInput.waitForDisplayed({ timeout: 15000 });
        await this.lastNameInput.click(); // Force focus
        await this.lastNameInput.setValue(lastName);
        // Next
        await this.nextButton.waitForDisplayed({ timeout: 15000 });
        await this.nextButton.click();
        // Phone Number
        await this.phoneNumerInput.waitForDisplayed({ timeout: 15000 });
        await this.phoneNumerInput.click(); // Force focus
        await this.phoneNumerInput.setValue(phoneNumber);
        // Submit
        await this.submitButton.waitForDisplayed({ timeout: 15000 });
        await this.submitButton.click();
      }
}

export default new registerPage();