import { Page } from '@playwright/test';



export class LoginPage {
    // Page instance
    public readonly page: Page;
    
    // URL
    private readonly loginUrl = 'http://localhost:5173/login';
    
    // Page elements
    private readonly email_textbox;
    private readonly password_textbox;
    private readonly login_button;
    private readonly forgotPasswordLink;
    private readonly forgotPasswordEmailInput;
    private readonly forgotPasswordContinueButton;
    
    

    constructor(page: Page) {
        this.page = page;
        this.email_textbox = page.locator('#email-phone-identifier'); 
        this.password_textbox = page.locator('input[type="password"]'); 
        this.login_button = page.getByRole('button', { name: 'Sign in' }); 
        this.forgotPasswordLink = page.getByRole('link', { name: 'Forgot password?' });
        this.forgotPasswordEmailInput = page.getByRole('textbox', { name: 'Enter your email' });
        this.forgotPasswordContinueButton = page.getByRole('button', { name: 'continue' });
        
        
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
        // wait till page is loaded
        await this.page.waitForLoadState('networkidle');
    }

    async forgotPassword(email: string) {
        await this.forgotPasswordLink.waitFor();
        await this.forgotPasswordLink.click();
        
        await this.forgotPasswordEmailInput.waitFor();
        await this.forgotPasswordEmailInput.click();
        await this.forgotPasswordEmailInput.fill(email);
        
        await this.forgotPasswordContinueButton.waitFor();
        await this.forgotPasswordContinueButton.click();
    }

    async isLoggedIn(): Promise<boolean> {
        try {
            await this.page.waitForURL('**/feed', { timeout: 15000 });
            return true;
        } catch {
            return false;
        }
    }

    async isUnauthorized(): Promise<boolean> {
        let isUnauthorized = false;

        this.page.on('response', async (response) => {
            if (response.url().includes('/login') && response.status() === 401) {
                isUnauthorized = true;
            }
        });
        await this.page.waitForTimeout(3000);

        return isUnauthorized;
    }

    
    async captureConsoleMessages(timeout = 2000): Promise<string[]> {
        const messages: string[] = [];

        const listener = (msg: any) => {
            messages.push(msg.text());
        };

        this.page.on('console', listener);

        await new Promise((resolve) => setTimeout(resolve, timeout)); 

        this.page.off('console', listener);

        return messages;
    }
    
    async isUnRegistered(): Promise<boolean> {
        let isUnauthorized = false;

        this.page.on('response', async (response) => {
            if (response.url().includes('/forget-password') && response.status() === 404) {
                isUnauthorized = true;
            }
        });
        await this.page.waitForTimeout(3000);

        return isUnauthorized;
    }
    
}
