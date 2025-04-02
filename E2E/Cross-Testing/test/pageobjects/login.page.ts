import { ChainablePromiseElement } from 'webdriverio';

class LoginPage {
    get emailInput(): ChainablePromiseElement {
        return $('android=new UiSelector().className("android.widget.EditText").instance(0)');
    }

    get passwordInput(): ChainablePromiseElement {
        return $('android=new UiSelector().className("android.widget.EditText").instance(1)');
    }

    get continueButton(): ChainablePromiseElement {
        return $('~Continue');
    }

    get forgetPasswordButton(): ChainablePromiseElement {
        return $('~Forget Password?');
    }

    get joinNowButton(): ChainablePromiseElement {
        return $('~Join Now');
    }


    async login(email: string, password: string): Promise<void> {
        await this.emailInput.setValue(email);
        await this.passwordInput.setValue(password);
        await this.continueButton.click();
    }
}

export default new LoginPage();
