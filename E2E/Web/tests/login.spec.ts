import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';

// Test data
const validCredentials = {
    username: 'samam0362@gmail.com',
    password: 'Pass_123'
};

const invalidCredentials = {
    username: 'roaa@gmail.com',
    password: '12345678'
};

const invalidEmailCredentials = {
    username: 'samam0362gmail.com',
    password: 'Sm_101103n'
};

const emptyCredentials = {
    username: '',
    password: ''
};

const emptyPasswordCredentials = {
    username: 'samam0362@gmail.com',
    password: ''
};

const xssAttackCredentials = {
    username: '<script>alert("XSS")</script>',
    password: 'Sm_101103n'
};

const unregisteredEmail = 'roaa@gmail.com';
const forgotPasswordEmail = 'samam0362@gmail.com';

test.describe('Login Functionality', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        test.setTimeout(30000); 
        loginPage = new LoginPage(page);
        await loginPage.gotoLoginPage();
    });

    test('should login successfully with valid credentials', async () => {
        await loginPage.login(validCredentials.username, validCredentials.password);
        expect(await loginPage.isLoggedIn()).toBeTruthy();
    });

    test('should show error with invalid credentials', async () => {
        await loginPage.login(invalidCredentials.username, invalidCredentials.password);
        await loginPage.page.waitForSelector('text=Invalid credentials', { state: 'visible', timeout: 5000 });
        
        expect(await loginPage.hasInvalidCredentialsError()).toBeTruthy();
        expect(await loginPage.getInvalidCredentialsErrorText()).toContain('Invalid credentials');
    });

    test('should show error when email and password are empty', async () => {
        await loginPage.login(emptyCredentials.username, emptyCredentials.password);
        expect(await loginPage.hasEmailError()).toBeTruthy();
        expect(await loginPage.getEmailErrorText()).toContain('Please enter a valid email address or phone number');
    });
    
    test('should show error when email format is incorrect', async () => {
        await loginPage.login(invalidEmailCredentials.username, invalidEmailCredentials.password);
        expect(await loginPage.hasEmailError()).toBeTruthy();
        expect(await loginPage.getEmailErrorText()).toContain('Please enter a valid email address or phone number');
    });
    
    test('should show error when password is empty', async () => {
        await loginPage.login(emptyPasswordCredentials.username, emptyPasswordCredentials.password);
        expect(await loginPage.hasPasswordError()).toBeTruthy();
        expect(await loginPage.getPasswordErrorText()).toContain('Please enter your password');
    });

    test('should show error when using XSS', async () => {
        await loginPage.login(xssAttackCredentials.username, xssAttackCredentials.password);
        expect(await loginPage.hasEmailError()).toBeTruthy();
        expect(await loginPage.getEmailErrorText()).toContain('Please enter a valid email address or phone number');
    });

    test('should show error for unregistered email in password reset', async () => {
        await loginPage.forgotPassword(unregisteredEmail);
        await loginPage.page.waitForSelector('text=Email not registered', { state: 'visible', timeout: 5000 });
        expect(await loginPage.hasUnregisteredEmailError()).toBeTruthy();
        expect(await loginPage.getUnregisteredEmailErrorText()).toContain('Email not registered');
    });

    test('should show error when forgotpassword email is empty', async () => {
        await loginPage.forgotPassword('');
        expect(await loginPage.hasForgotPasswordError()).toBeTruthy();
        expect(await loginPage.getForgotPasswordErrorText()).toContain('Please Enter your email');
    });

    test.skip('should show reset-password URL when Registered Email', async ({ page }) => {
        const messages: string[] = [];
    
        
        page.on('console', (msg) => {
            messages.push(msg.text());
        });
    
        await loginPage.forgotPassword(forgotPasswordEmail);
    
        
        await page.waitForTimeout(6000);
    
        
        expect(messages.some(msg => msg.includes("http://localhost:5173/reset-password/"))).toBeTruthy();
    });

    test.skip('should reset password and login with new credentials', async ({ page, context }) => {
        const messages: string[] = [];
    
        page.on('console', (msg) => {
            messages.push(msg.text());
        });
    
        await loginPage.forgotPassword(forgotPasswordEmail);
    
        await page.waitForTimeout(6000);
    
        const resetLink = messages.find(msg => msg.includes("http://localhost:5173/reset-password/"));
        expect(resetLink).toBeTruthy();
    
        const resetPage = await context.newPage();
        await resetPage.goto(resetLink!);

        await resetPage.locator('#new-password').fill('Sm_101103n');
        await resetPage.locator('#confirm-password').fill('Sm_101103n');
        await resetPage.getByRole('button', { name: 'Continue' }).click();
    
        
        await resetPage.waitForURL('**/login', { timeout: 10000 });
    
        await page.goto('http://localhost:5173/login');
        
        await loginPage.login(forgotPasswordEmail, 'Sm_101103n');
        expect(await loginPage.isLoggedIn()).toBeTruthy();
    });
});