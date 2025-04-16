import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { JobsPage } from '../pages/jobs-page';

const validCredentials = {
  username: 'samam0362@gmail.com',
  password: 'Pass_123'
};

test('should show only jobs with selected location', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const jobsPage = new JobsPage(page);

  await loginPage.gotoLoginPage();
  await loginPage.login(validCredentials.username, validCredentials.password);

  await jobsPage.goToJobsPage();
  await jobsPage.selectLocation('Egypt');

  const result = await jobsPage.allJobsMatchLocation('Egypt');
  expect(result).toBeTruthy();
});

test('should filter jobs by experience level and verify each detail', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const jobsPage = new JobsPage(page);
  
    await loginPage.gotoLoginPage();
    await loginPage.login('samam0362@gmail.com', 'Pass_123');
  
    await jobsPage.goToJobsPage();
    await jobsPage.selectExperienceLevel('Internship');
  
    const result = await jobsPage.verifyAllJobsMatchExperienceLevel('Internship');
    expect(result).toBeTruthy();
  });
  
  test('should show only jobs from selected company', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const jobsPage = new JobsPage(page);
  
    await loginPage.gotoLoginPage();
    await loginPage.login(validCredentials.username, validCredentials.password);
  
    await jobsPage.goToJobsPage();
    await jobsPage.searchByCompany('Future Academy');
  
    const result = await jobsPage.allJobsMatchCompany('Future Academy');
    expect(result).toBeTruthy();
  });

  test('should show only jobs with selected work mode', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const jobsPage = new JobsPage(page);
  
    await loginPage.gotoLoginPage();
    await loginPage.login(validCredentials.username, validCredentials.password);
  
    await jobsPage.goToJobsPage();
    await jobsPage.selectWorkMode('On-site');
  
    const result = await jobsPage.allJobsMatchWorkMode('On-site');
    expect(result).toBeTruthy();
  });
  
  test('should filter jobs by salary and verify each detail', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const jobsPage = new JobsPage(page);
  
    await loginPage.gotoLoginPage();
    await loginPage.login('samam0362@gmail.com', 'Pass_123');
  
    await jobsPage.goToJobsPage();
    await jobsPage.selectSalaryRange('+');
  
    const result = await jobsPage.verifyAllJobsMatchMinimumSalary(10000);
    expect(result).toBeTruthy();
  });

  test('should save a job and verify it appears in My Jobs', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const jobsPage = new JobsPage(page);
  
    await loginPage.gotoLoginPage();
    await loginPage.login('samam0362@gmail.com', 'Pass_123');
  
    await jobsPage.goToJobsPage();
    const savedJobTitle = await jobsPage.saveFirstJobAndGetTitle();
  
    await jobsPage.goToMyJobs();
  
    
    await page.waitForLoadState('networkidle');
    const jobTextExists = await page.getByText(savedJobTitle, { exact: false }).isVisible();
    expect(jobTextExists).toBeTruthy();
  });
  
  
  
  