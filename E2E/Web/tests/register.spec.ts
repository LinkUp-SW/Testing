import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/register-page';

// Test data
const validCredentials = {
    email: 'testuser30@abc.com',
    password: 'abc-ABC-12',
    first_name: 'Test',
    last_name: 'User',
    country: 'Egypt',
    city: 'Cairo',
    job_title: 'Software Engineer',
    employment_type: 'Full-Time',
    company: 'smart systems',
    school: 'Digital Creations',
    start_year: '2010',
    end_year: '2015'
};

test.describe('SignUp Successfully', () => {
    let registerPage: RegisterPage;
    let accountCreated = false;

    test.beforeEach(async ({ page }) => {
        test.setTimeout(15000); // 15 seconds timeout for this test

        // Initialize the Register page and navigate to it before each test
        registerPage = new RegisterPage(page);
        await registerPage.gotoSignUpPage();
    });

    test.afterEach(async ({ page }) => {
        if (!accountCreated) return;
        const response = await fetch('http://localhost:3000/api/v1/user/test-delete-account', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "email" : validCredentials.email })
        });
        expect(response.status).toBe(200);
        accountCreated = false;
    });

    test('Register Successfully as Employee', async () => {
        await registerPage.SignUp(validCredentials.email, validCredentials.password);
        await registerPage.enterName(validCredentials.first_name, validCredentials.last_name);
        await registerPage.enterCountryAndCity(validCredentials.country, validCredentials.city);
        await registerPage.enterJobDetails(validCredentials.job_title, validCredentials.employment_type, validCredentials.company);
        await registerPage.handleOTP();
        accountCreated = true;
    });

    test('Register Successfully as Student Above 16', async () => {
        await registerPage.SignUp(validCredentials.email, validCredentials.password);
        await registerPage.enterName(validCredentials.first_name, validCredentials.last_name);
        await registerPage.enterCountryAndCity(validCredentials.country, validCredentials.city);
        await registerPage.enterStudentDetailsAbove16(validCredentials.school, validCredentials.start_year, validCredentials.end_year);
        await registerPage.handleOTP();
        accountCreated = true;
    });

    test('Try to Register as Student Below 16', async () => {
        await registerPage.SignUp(validCredentials.email, validCredentials.password);
        await registerPage.enterName(validCredentials.first_name, validCredentials.last_name);
        await registerPage.enterCountryAndCity(validCredentials.country, validCredentials.city);
        await registerPage.enterStudentDetailsBelow16(validCredentials.school, validCredentials.start_year, validCredentials.end_year, '1', '1', '2015');
        expect(await registerPage.handleBelow16Error()).toBe(true);
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

    test('Invalid Email Format', async () => {
        const invalidEmails = [
            '@xyz.com',
            'user@.com',
            'user@xyz,com',     // Comma in domain
            'user@xyz..com',    // Consecutive dots
            'user name@xyz.com',// Space in local part
            '.username@xyz.com',// Leading dot
            'username.@xyz.com', // Trailing dot
            'username@xyz.c',   // TLD too short
            'username@xyz.c@com', // Extra '@' in domain
            'username@xyz.b-com', // Invalid TLD
            'tst@a--bc.com', // Consecutive dashes in subdomain
        ];

        let count = 1;
        for (const email of invalidEmails) {
            await registerPage.SignUp(email, validCredentials.password);
            expect(await registerPage.handleInvalidEmail()).toBe(true);
            await registerPage.refreshPage();   
            await registerPage.page.waitForTimeout(1000);
            console.log('Invalid email test ' + count + ' completed');
            count++;
        };
            
    });

    test('Invalid Email with Foreign Characters', async () => {
        await registerPage.SignUp("hello@abc.comش", validCredentials.password);
        await registerPage.page.waitForTimeout(1000);
        expect(await registerPage.handleInvalidEmail()).toBe(true);
    });

    test('Register with conflicting years', async () => {
                await registerPage.SignUp(validCredentials.email, validCredentials.password);
                await registerPage.enterName(validCredentials.first_name, validCredentials.last_name);
                await registerPage.enterCountryAndCity(validCredentials.country, validCredentials.city);
                await registerPage.enterStudentDetailsAbove16(validCredentials.school, '2015', '2012');
                await registerPage.page.waitForTimeout(2000);
                await registerPage.handleConflictingYears();
    });

    test('SignUp with already registered email', async () => {
        await registerPage.SignUp("yusufafify0@gmail.com", validCredentials.password);
        expect(await registerPage.handleExistingEmail()).toBe(true);
});

});
