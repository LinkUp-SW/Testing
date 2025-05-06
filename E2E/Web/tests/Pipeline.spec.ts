import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';

// Test data
const validCredentials = {
    username: 'donald@trump.com',
    password: 'abc-ABC-12'
};


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
});



    
  

    

 
