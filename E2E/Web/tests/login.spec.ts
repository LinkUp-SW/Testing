import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';

// Test data
const validCredentials = {
    username: 'testUser',
    password: 'correctPassword123'
};

const invalidCredentials = {
    username: 'wrongUser',
    password: 'wrongPassword123'
};

test.describe('Login Functionality', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        test.setTimeout(15000); // 15 seconds timeout for this test

        // Initialize the login page and navigate to it before each test
        loginPage = new LoginPage(page);
        await loginPage.gotoLoginPage();
    });

    test('should login successfully with valid credentials', async () => {
        await loginPage.login(validCredentials.username, validCredentials.password);
        expect(await loginPage.isLoggedIn()).toBeTruthy();
    });

    test('should fail login with invalid credentials', async () => {
        await loginPage.login(invalidCredentials.username, invalidCredentials.password);
        expect(await loginPage.isLoggedIn()).toBeFalsy();

        // Verify error message is displayed
        const errorMsg = await loginPage.getErrorMessage();
        expect(errorMsg).not.toBeNull();
        expect(errorMsg).toContain('Invalid username or password');
    });
});