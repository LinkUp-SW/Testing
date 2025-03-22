import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/register-page';

// Test data
const validCredentials = {
    email: 'testUser',
    password: 'correctPassword123',
    first_name: 'Test',
    last_name: 'User',
    country: 'Egypt',
    city: 'Cairo',
    job_title: 'Software Engineer',
    employment_type: 'Full Time',
    company: 'Test Company',
    school: 'Test School',
    start_year: '2010',
    end_year: '2015'
};

const invalidCredentials = {
    username: 'wrongUser',
    password: 'wrongPassword123'
};

test.describe('SignUp Successfully', () => {
    let registerPage: RegisterPage;

    test.beforeEach(async ({ page }) => {
        test.setTimeout(15000); // 15 seconds timeout for this test

        // Initialize the Register page and navigate to it before each test
        registerPage = new RegisterPage(page);
        await registerPage.gotoSignUpPage();
    });

    test('Register Successfully as Employee', async () => {
        await registerPage.SignUp(validCredentials.email, validCredentials.password);
        await registerPage.enterName(validCredentials.first_name, validCredentials.last_name);
        await registerPage.enterCountryAndCity(validCredentials.country, validCredentials.city);
        await registerPage.enterJobDetails(validCredentials.job_title, validCredentials.employment_type, validCredentials.company);
        await registerPage.handleOTP();
    });

    test('Register Successfully as Student Above 16', async () => {
        await registerPage.SignUp(validCredentials.email, validCredentials.password);
        await registerPage.enterName(validCredentials.first_name, validCredentials.last_name);
        await registerPage.enterCountryAndCity(validCredentials.country, validCredentials.city);
        await registerPage.enterStudentDetailsAbove16(validCredentials.school, validCredentials.start_year, validCredentials.end_year);
        await registerPage.handleOTP();
    });

    test('Try to Register as Student Below 16', async () => {
        await registerPage.SignUp(validCredentials.email, validCredentials.password);
        await registerPage.enterName(validCredentials.first_name, validCredentials.last_name);
        await registerPage.enterCountryAndCity(validCredentials.country, validCredentials.city);
        await registerPage.enterStudentDetailsBelow16(validCredentials.school, validCredentials.start_year, validCredentials.end_year, '1', 'January', '2015');
        await registerPage.handleOTP();
    });

});

test.describe('SignUp Unsuccessfully', () => {
    let registerPage: RegisterPage;

    test.beforeEach(async ({ page }) => {
        test.setTimeout(15000); // 15 seconds timeout for this test

        // Initialize the Register page and navigate to it before each test
        registerPage = new RegisterPage(page);
        await registerPage.gotoSignUpPage();
    });

    test.only('Invalid Email Inputs', async () => {
        const invalidEmails = [
            '@xyz.com',
            'user@.com',
            'user@xyz,com',     // Comma in domain
            'user@xyz..com',    // Consecutive dots
            'user name@xyz.com',// Space in local part
            '.username@xyz.com',// Leading dot
            'username.@xyz.com' // Trailing dot
        ];
    
        for (const email of invalidEmails) {
            await registerPage.SignUp(email, 'abc-ABC-123');
    
            await expect(registerPage.page.locator('.toaster.group')).toBeVisible();
            // wait for the toaster to disappear
            await registerPage.page.waitForSelector('.toaster.group', { state: 'detached' });
            const response = await fetch('http://localhost:3000/api/v1/user/test-delete-account', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email })
            });
            // ensure status code is 200
            expect(response.status).toBe(200);
        }
    });

});