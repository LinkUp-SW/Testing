import { Page } from '@playwright/test';

export class LoginPage {
    // Page instance
    public readonly page: Page;
    
    // URL
    private readonly loginUrl = 'http://localhost:5173/login';
    
    // Page elements
    private readonly username_textbox;
    private readonly password_textbox;
    private readonly login_button;
    private readonly errorMessage;
    private readonly forgetPasswordLink;
    private readonly googleSignInButton;
    private readonly register;

    constructor(page: Page) {
        this.page = page;
        this.username_textbox = page.getByLabel('Username');
        this.password_textbox = page.getByLabel('Password');
        this.login_button = page.getByRole('button', { name: 'Login' });
        this.errorMessage = page.locator('.error-message');
        this.forgetPasswordLink = page.getByRole('link', { name: 'Forgot password?' });
        this.googleSignInButton = page.getByRole('button', { name: 'Sign in with Google' });
        this.register = page.getByRole('link', { name: 'Register' });
    }

    gotoLoginPage = async () => await this.page.goto(this.loginUrl);

    async login(username: string, password: string) {
        await this.username_textbox.fill(username);
        await this.password_textbox.fill(password);
        await this.login_button.click();
    }

    isLoggedIn = async (): Promise<boolean> => 
        !!(await this.page.locator('.logged-in-indicator').isVisible());

    getErrorMessage = async (): Promise<string | null> => 
        (await this.errorMessage?.isVisible()) ? await this.errorMessage.innerText() : null;
}

