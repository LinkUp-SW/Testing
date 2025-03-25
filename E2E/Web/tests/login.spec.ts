import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';

// Test data
const validCredentials = {
    username: 'samam0362@gmail.com',
    password: 'Sm_101103n2'
};

const invalidCredentials = {
    username: 'samam0362@gmail.com',
    password: 'Sm_10110'
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

const xssAttackCredentials ={
    username: '<script>alert("XSS")</script>',
    password: 'Sm_101103n'
};

const forgotPasswordWrongEmail = 'SM@gmail.com';

const forgotPasswordEmail = 'samam0362@gmail.com';

test.describe('Login Functionality', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        test.setTimeout(30000); 

        // Initialize the login page and navigate to it before each test
        loginPage = new LoginPage(page);
        await loginPage.gotoLoginPage();
    });

    test('should login successfully with valid credentials', async () => {
        await loginPage.login(validCredentials.username, validCredentials.password);
    
        expect(await loginPage.isLoggedIn()).toBeTruthy();
    });

    test('should fail login with invalid credentials and check 401 response', async () => {
        await loginPage.login(invalidCredentials.username, invalidCredentials.password);
        expect(await loginPage.isUnauthorized()).toBeTruthy();
    });

    test('should show error when email and password are empty', async ({ page }) => {
        
        const messagesPromise = loginPage.captureConsoleMessages(); 
    
        await loginPage.login(emptyCredentials.username, emptyCredentials.password);
    
        const messages = await messagesPromise; 
    
        expect(messages).toContain('Please enter a valid email address or phone number.');
    });
    
    test('should show error when email format is incorrect', async ({ page }) => {
        
        
        const messagesPromise = loginPage.captureConsoleMessages();
    
        await loginPage.login(invalidEmailCredentials.username, invalidEmailCredentials.password );
    
        const messages = await messagesPromise;
    
        expect(messages).toContain('Please enter a valid email address or phone number.');
    });
    
    test('should show error when password is empty', async ({ page }) => {
        
        
        const messagesPromise = loginPage.captureConsoleMessages();
    
        await loginPage.login(emptyPasswordCredentials.username, emptyPasswordCredentials.password );
    
        const messages = await messagesPromise;
    
        expect(messages).toContain('Please enter your password');
    });

    test('should show error when using XSS', async ({ page }) => {
        
        
        const messagesPromise = loginPage.captureConsoleMessages();
    
        await loginPage.login(xssAttackCredentials.username, xssAttackCredentials.password );
    
        const messages = await messagesPromise;
    
        expect(messages).toContain('Please enter a valid email address or phone number.');
    });

    test('should fail password reset and check 404 response', async () => {
        await loginPage.forgotPassword(forgotPasswordWrongEmail);
        
        expect(await loginPage.isUnRegistered()).toBeTruthy();
    });

    test('should show error when forgotpassword email is empty', async ({ page }) => {
        
        
            const messagesPromise = loginPage.captureConsoleMessages();
        
            await loginPage.forgotPassword('');
        
            const messages = await messagesPromise;
        
            expect(messages).toContain('Please Enter your email');
    });

    test('should show reset-password URL when Registered Email', async ({ page }) => {
        const messages: string[] = [];
    
        
        page.on('console', (msg) => {
            messages.push(msg.text());
        });
    
        await loginPage.forgotPassword(forgotPasswordEmail);
    
        // Wait for possible console logs
        await page.waitForTimeout(6000);
    
        
        expect(messages.some(msg => msg.includes("http://localhost:5173/reset-password/"))).toBeTruthy();
    });
    
});