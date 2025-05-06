import { Page } from '@playwright/test';

export class LoginPage {
    public readonly page: Page;
    
    private readonly loginUrl = 'https://linkup-app.tech/login';
    
    private readonly email_textbox;
    private readonly password_textbox;
    private readonly login_button;
    private readonly forgotPasswordLink;
    private readonly forgotPasswordEmailInput;
    private readonly forgotPasswordContinueButton;
    
    
    private readonly emailErrorMessage;
    private readonly passwordErrorMessage;
    private readonly forgotPasswordErrorMessage;
    private readonly invalidCredentialsMessage;
    private readonly unregisteredEmailMessage;

    constructor(page: Page) {
        this.page = page;
        this.email_textbox = page.getByRole('textbox', { name: 'Enter your email or phone' });
        this.password_textbox = page.getByRole('textbox', { name: 'Enter your password' });
        this.login_button = page.getByRole('button', { name: 'Sign in' });
        this.forgotPasswordLink = page.getByRole('link', { name: 'Forgot password?' });
        this.forgotPasswordEmailInput = page.getByRole('textbox', { name: 'Enter your email' });
        this.forgotPasswordContinueButton = page.getByRole('button', { name: 'continue' });
        this.emailErrorMessage = page.getByText('Please enter a valid email address or phone number', { exact: false });
        this.passwordErrorMessage = page.getByText('Please enter your password', { exact: false });
        this.forgotPasswordErrorMessage = page.getByText('Please Enter your email', { exact: false });
        this.invalidCredentialsMessage = page.getByText('Invalid credentials', { exact: true });
        this.unregisteredEmailMessage = page.getByText('Email not registered', { exact: true });
    }

    gotoLoginPage = async () => {
        await this.page.goto(this.loginUrl);
        await this.page.waitForLoadState('domcontentloaded'); 
    };

    async login(username: string, password: string) {
        await this.email_textbox.waitFor(); 
        await this.email_textbox.fill(username);
        await this.password_textbox.waitFor();
        await this.password_textbox.fill(password);
        await this.login_button.waitFor();
        await this.login_button.click();
        
        await this.page.waitForTimeout(1000);
    }

    async forgotPassword(email: string) {
        await this.forgotPasswordLink.waitFor();
        await this.forgotPasswordLink.click();
        
        await this.forgotPasswordEmailInput.waitFor();
        await this.forgotPasswordEmailInput.click();
        await this.forgotPasswordEmailInput.fill(email);
        
        await this.forgotPasswordContinueButton.waitFor();
        await this.forgotPasswordContinueButton.click();
        
        await this.page.waitForTimeout(1000);
    }

    async isLoggedIn(): Promise<boolean> {
        try {
            await this.page.waitForURL('**/feed', { timeout: 15000 });
            return true;
        } catch {
            return false;
        }
    }

    async hasInvalidCredentialsError(): Promise<boolean> {
        return await this.invalidCredentialsMessage.isVisible();
    }

    async getInvalidCredentialsErrorText(): Promise<string> {
        return await this.invalidCredentialsMessage.textContent() || '';
    }
    
    async hasUnregisteredEmailError(): Promise<boolean> {
        return await this.unregisteredEmailMessage.isVisible();
    }

    async getUnregisteredEmailErrorText(): Promise<string> {
        return await this.unregisteredEmailMessage.textContent() || '';
    }
    
   
    async hasEmailError(): Promise<boolean> {
        return await this.emailErrorMessage.isVisible();
    }

    async hasPasswordError(): Promise<boolean> {
        return await this.passwordErrorMessage.isVisible();
    }

    async hasForgotPasswordError(): Promise<boolean> {
        return await this.forgotPasswordErrorMessage.isVisible();
    }

    async getEmailErrorText(): Promise<string> {
        return await this.emailErrorMessage.textContent() || '';
    }
    
    async getPasswordErrorText(): Promise<string> {
        return await this.passwordErrorMessage.textContent() || '';
    }

    async getForgotPasswordErrorText(): Promise<string> {
        return await this.forgotPasswordErrorMessage.textContent() || '';
    }
}