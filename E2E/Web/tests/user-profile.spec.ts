import { test, expect } from '@playwright/test';
import { UserProfile } from '../pages/user-profile-page';
import { LoginPage } from '../pages/login-page';

// Test data
const validCredentials = {
    email: 'mathys@tel.com',
    password: 'abc-ABC-12',
    valid_profile_pic: 'D:\\Mohamed\\BDE\\Software Engineering\\LinkUp Repo\\Testing\\E2E\\Web\\Assets\\Tel.jpg',
    oversized_profile_pic: 'D:\\Mohamed\\BDE\\Software Engineering\\LinkUp Repo\\Testing\\E2E\\Web\\Assets\\bigImage.jpg',
    valid_cover_photo: 'D:\\Mohamed\\BDE\\Software Engineering\\LinkUp Repo\\Testing\\E2E\\Web\\Assets\\cover.webp',
    experience_title: 'Left Winger',
    employment_type: 'Full-time',
    company: 'Orange',
    start_month: 'March',
    start_year: '2022',
    end_month: 'December',
    end_year: '2023',
    location: 'Portugal',
    location_type: 'onsite',
    description: 'During my time at Benfica, I truly came into my own as a forward, showcasing my ability to score goals and make a difference in crucial moments. I was proud to help the team in both domestic competitions and on the European stage, where we faced some of the best clubs in the world. My performances earned me recognition as one of the top young talents in football, and I was honored to secure a move to one of the biggest clubs in the world as a result.',
    school: 'Mansoura University',
    degree: 'Bachelor of Science',
    field_of_study: 'Computer Science',
    education_start_month: 'September',
    education_start_year: '2018',
    education_end_month: 'June',
    education_end_year: '2022',
    education_grade: 'A',
    activities: 'Football, Basketball',
    resume_path: 'D:\\Mohamed\\BDE\\Software Engineering\\LinkUp Repo\\Testing\\E2E\\Web\\Assets\\resume.pdf',
    invalid_resume_path: 'D:\\Mohamed\\BDE\\Software Engineering\\LinkUp Repo\\Testing\\E2E\\Web\\Assets\\resume.txt',
    large_pdf_path: 'D:\\Mohamed\\BDE\\Software Engineering\\LinkUp Repo\\Testing\\E2E\\Web\\Assets\\large pdf.pdf',
};

test.describe('Profile Picture Testcases', () => {
    let userProfilePage: UserProfile;

    test.beforeEach(async ({ page }) => {
        test.setTimeout(15000); // 15 seconds timeout for this test

        let loginPage = new LoginPage(page);
        await loginPage.gotoLoginPage();
        await loginPage.login(validCredentials.email, validCredentials.password);
        userProfilePage = new UserProfile(page);
        userProfilePage.gotoProfilePage();
    });

    test('Delete profile picture', async () => {
        const responsePromise = userProfilePage.page.waitForResponse(
            response => 
              response.url().includes('/user/profile/profile-picture') && 
              response.request().method() === 'DELETE'
        );
        await userProfilePage.deleteProfilePicture(); 
        const response = await responsePromise;
        expect(response.status()).toBe(200);
      });

    test('Upload a valid profile picture', async () => {
        // Start waiting for response before triggering the upload
        const responsePromise = userProfilePage.page.waitForResponse(
          response => 
            response.url().includes('/user/profile/profile-picture') && 
            response.request().method() === 'PUT'
        );
      
        await userProfilePage.uploadProfilePicture(validCredentials.valid_profile_pic);
        
        const response = await responsePromise;
        expect(response.status()).toBe(200);
      });

      test('Upload an oversized profile picture', async () => {
        test.setTimeout(30000); // 30 seconds timeout for this test
        const responsePromise = userProfilePage.page.waitForResponse(
          response => 
            response.url().includes('/user/profile/profile-picture') && 
            response.request().method() === 'PUT'
        );
      
        await userProfilePage.uploadProfilePicture(validCredentials.oversized_profile_pic); 
        const response = await responsePromise;
        expect(response.status()).toBe(400);
      });
});

test.describe('Cover Photo Testcases', () => {
    let userProfilePage: UserProfile;

    test.beforeEach(async ({ page }) => {
        test.setTimeout(15000); // 15 seconds timeout for this test

        let loginPage = new LoginPage(page);
        await loginPage.gotoLoginPage();
        await loginPage.login(validCredentials.email, validCredentials.password);
        userProfilePage = new UserProfile(page);
        userProfilePage.gotoProfilePage();
    });

    test('Delete cover photo', async () => {
        const responsePromise = userProfilePage.page.waitForResponse(
            response => 
              response.url().includes('/user/profile/cover-photo') && 
              response.request().method() === 'DELETE'
        );
        await userProfilePage.deleteCoverPhoto(); 
        const response = await responsePromise;
        expect(response.status()).toBe(200);
      });

    test('Upload a valid cover photo', async () => {
        const responsePromise = userProfilePage.page.waitForResponse(
          response => 
            response.url().includes('/user/profile/cover-photo') && 
            response.request().method() === 'PUT'
        );
      
        await userProfilePage.uploadCoverPhoto(validCredentials.valid_cover_photo);
        
        const response = await responsePromise;
        expect(response.status()).toBe(200);
      });
});

test.describe('Experience Testcases', () => {
    let userProfilePage: UserProfile;

    test.beforeEach(async ({ page }) => {
        test.setTimeout(15000); // 15 seconds timeout for this test

        let loginPage = new LoginPage(page);
        await loginPage.gotoLoginPage();
        await loginPage.login(validCredentials.email, validCredentials.password);
        userProfilePage = new UserProfile(page);
        userProfilePage.gotoProfilePage();
    });

    test('Add experience', async () => {
        const responsePromise = userProfilePage.page.waitForResponse(
            response => 
              response.url().includes('/user/add-work-experience') && 
              response.request().method() === 'POST'
        );
        await userProfilePage.addExperience(validCredentials.experience_title, validCredentials.employment_type, 
            validCredentials.company, validCredentials.start_month, validCredentials.start_year, validCredentials.end_month, 
            validCredentials.end_year, validCredentials.location, validCredentials.location_type, validCredentials.description);
        
        const response = await responsePromise;
        expect(response.status()).toBe(200);
      });

    test('Delete experience', async () => {
    const responsePromise = userProfilePage.page.waitForResponse(
        response => 
            response.url().includes('/user/delete-work-experience') && 
            response.request().method() === 'DELETE'
    );
    await userProfilePage.deleteExperience(); 
    
    const response = await responsePromise;
    expect(response.status()).toBe(200);
    });
});

test.describe('Education Testcases', () => {
    let userProfilePage: UserProfile;

    test.beforeEach(async ({ page }) => {
        test.setTimeout(15000); // 15 seconds timeout for this test

        let loginPage = new LoginPage(page);
        await loginPage.gotoLoginPage();
        await loginPage.login(validCredentials.email, validCredentials.password);
        userProfilePage = new UserProfile(page);
        userProfilePage.gotoProfilePage();
    });

    test('Add education', async () => {
        const responsePromise = userProfilePage.page.waitForResponse(
            response => 
                response.url().includes('/user/add-education') && 
                response.request().method() === 'POST'
        );
        await userProfilePage.addEducation(validCredentials.school, validCredentials.degree, validCredentials.field_of_study,
            validCredentials.education_start_month, validCredentials.education_start_year, validCredentials.education_end_month, 
            validCredentials.education_end_year, validCredentials.education_grade, validCredentials.activities);
        
        const response = await responsePromise;
        expect(response.status()).toBe(200);
      });

    test('Delete education', async () => {
        const responsePromise = userProfilePage.page.waitForResponse(
        response => 
            response.url().includes('/user/delete-education') && 
            response.request().method() === 'DELETE'
    );
    await userProfilePage.deleteEducation(); 
    
    const response = await responsePromise;
    expect(response.status()).toBe(200);
    });
});

test.describe("Skills Testcases", () => {
    let userProfilePage: UserProfile;

    test.beforeEach(async ({ page }) => {
        test.setTimeout(15000); // 15 seconds timeout for this test

        let loginPage = new LoginPage(page);
        await loginPage.gotoLoginPage();
        await loginPage.login(validCredentials.email, validCredentials.password);
        userProfilePage = new UserProfile(page);
        userProfilePage.gotoProfilePage();
    });

    test('Add skills', async () => {
        const responsePromise = userProfilePage.page.waitForResponse(
            response => 
                response.url().includes('/user/add-skill') && 
                response.request().method() === 'POST'
        );
        await userProfilePage.addSkill('JavaScript, Python, React, Node.js');
        
        const response = await responsePromise;
        expect(response.status()).toBe(200);
      });

    test('Delete skills', async () => {
        const responsePromise = userProfilePage.page.waitForResponse(
            response => 
                response.url().includes('/user/delete-skill') && 
                response.request().method() === 'DELETE'
        );
        await userProfilePage.deleteSkill(); 
        
        const response = await responsePromise;
        expect(response.status()).toBe(200);
    });
});

test.describe("Upload Resume Testcases", () => {
    let userProfilePage: UserProfile;

    test.beforeEach(async ({ page }) => {
        test.setTimeout(15000); // 15 seconds timeout for this test

        let loginPage = new LoginPage(page);
        await loginPage.gotoLoginPage();
        await loginPage.login(validCredentials.email, validCredentials.password);
        userProfilePage = new UserProfile(page);
        userProfilePage.gotoProfilePage();
    });

    test('Upload a valid resume', async () => {
        const responsePromise = userProfilePage.page.waitForResponse(
            response => 
                response.url().includes('/user/profile/resume') && 
                response.request().method() === 'POST'
        );
        await userProfilePage.uploadResume(validCredentials.resume_path, true);
        
        const response = await responsePromise;
        expect(response.status()).toBe(200);
      });

      test('Upload resume with invalid format', async () => {
        await userProfilePage.uploadResume(validCredentials.invalid_resume_path, false);
        await expect(userProfilePage.page.locator('#resume-alert-description')).toBeVisible();
        await expect(userProfilePage.page.locator('#resume-alert-description')).toHaveText('Only PDF files are accepted');
      });

      test('Upload resume with invalid size', async () => {
        await userProfilePage.uploadResume(validCredentials.large_pdf_path, false);
        await expect(userProfilePage.page.locator('#resume-alert-description')).toBeVisible();
        await expect(userProfilePage.page.locator('#resume-alert-description')).toHaveText('File size exceeds 2MB limit');
      });
});
