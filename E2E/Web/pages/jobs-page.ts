import { Page, Locator } from '@playwright/test';

export class JobsPage {
  readonly page: Page;
  readonly showAllJobsButton: Locator;
  readonly locationFilterButton: Locator;
  readonly experienceLevelFilterButton: Locator;
  readonly companyFilterButton: Locator;
  readonly companySearchInput: Locator;
  readonly jobCards: Locator;
  readonly workModeFilterButton: Locator;
  readonly salaryFilterButton: Locator;
  readonly saveJobButton: Locator;


  constructor(page: Page) {
    this.page = page;
    this.showAllJobsButton = page.getByRole('button', { name: 'Show all' });
    this.locationFilterButton = page.getByRole('button', { name: 'Location' });
    this.experienceLevelFilterButton = page.getByRole('button', { name: 'Experience level' });
    this.companyFilterButton = page.getByRole('button', { name: 'Company' });
    this.companySearchInput = page.getByRole('textbox', { name: 'Search Company...' });
    this.salaryFilterButton = page.getByRole('button', { name: 'Salary range' });
    this.workModeFilterButton = page.getByRole('button', { name: 'Remote' });
    this.saveJobButton = page.getByRole('button', { name: 'Save' });
    this.jobCards = page.locator('[data-testid^="job-item-"]');
    

    
  }

  async goToJobsPage() {
    await this.page.getByRole('link', { name: 'Jobs' }).click();
    await this.showAllJobsButton.waitFor();
    await this.showAllJobsButton.click();
  }

  async selectLocation(locationName: string) {
    await this.locationFilterButton.click();
    await this.page.getByRole('button', { name: locationName }).click();
    await this.page.waitForTimeout(1000);
  }

  async selectExperienceLevel(levelName: string) {
    await this.experienceLevelFilterButton.click();
    await this.page.getByRole('checkbox', { name: levelName }).check();
    await this.page.waitForTimeout(1000);
  }

  

  async searchByCompany(companyName: string) {
    await this.companyFilterButton.click();
    await this.companySearchInput.fill(companyName);
    await this.page.waitForTimeout(1000); // Allow results to update
  }
  
  async selectWorkMode(mode: string) {
    await this.workModeFilterButton.click();
    await this.page.getByRole('checkbox', { name: mode }).check();
    await this.page.waitForTimeout(1000); // Wait for results to update
  }
  
  async allJobsMatchWorkMode(expectedMode: string): Promise<boolean> {
    const jobCount = await this.jobCards.count();
    for (let i = 0; i < jobCount; i++) {
      const text = await this.jobCards.nth(i).innerText();
      if (!text.includes(expectedMode)) {
        console.error(`❌ Job ${i + 1} does not match expected work mode: ${expectedMode}`);
        return false;
      }
    }
    return true;
  }

  async selectSalaryRange(rangeLabel: string) {
    await this.salaryFilterButton.click();
    await this.page.getByRole('checkbox', { name: rangeLabel }).check();
    await this.page.waitForTimeout(1000);
  }
  
  

  async allJobsMatchLocation(locationName: string): Promise<boolean> {
    const jobCount = await this.jobCards.count();
    for (let i = 0; i < jobCount; i++) {
      const text = await this.jobCards.nth(i).innerText();
      if (!text.includes(locationName)) return false;
    }
    return true;
  }

  async allJobsMatchCompany(companyName: string): Promise<boolean> {
    const jobCount = await this.jobCards.count();
    for (let i = 0; i < jobCount; i++) {
        const card = this.jobCards.nth(i);
        const company = card.locator('p', { hasText: companyName });
        if (!await company.isVisible()) {
        console.error(`Job ${i + 1} is missing expected company: ${companyName}`);
        return false;
        }
    }
    return true;
    }

  async verifyAllJobsMatchExperienceLevel(expectedLevel: string): Promise<boolean> {
    const jobCount = await this.jobCards.count();
    for (let i = 0; i < jobCount; i++) {
      const card = this.jobCards.nth(i);
      await card.click();
      await this.page.waitForLoadState('networkidle');
      const badge = this.page.locator(`div:has(span:text("${expectedLevel}"))`);
      if (!await badge.first().isVisible()) {
        console.error(`Job ${i + 1} does not match expected experience level.`);
        return false;
      }
    }
    return true;
  }

  async verifyAllJobsMatchMinimumSalary(minSalary: number): Promise<boolean> {
    const jobCount = await this.jobCards.count();
  
    for (let i = 0; i < jobCount; i++) {
      const card = this.jobCards.nth(i);
      await card.scrollIntoViewIfNeeded();
      await card.click();
  
      
      await this.page.waitForLoadState('networkidle'); 
      await this.page.waitForTimeout(1000); 
  
      const bodyText = await this.page.textContent('body'); 
      const salaryMatches = bodyText?.match(/(\d{2,3}(?:,\d{3})*)/g);
  
      if (!salaryMatches) {
        console.error(` No salary found on job ${i + 1}`);
        return false;
      }
  
      const hasEnoughSalary = salaryMatches.some(raw => {
        const number = parseInt(raw.replace(/,/g, ''), 10);
        return number >= minSalary;
      });
  
      if (!hasEnoughSalary) {
        console.error(` Job ${i + 1} does not meet minimum salary of ${minSalary}`);
        return false;
      }
  
      
    
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(1000); 
    }
  
    return true;
  }
  
  // Save the first job and return its title
async saveFirstJobAndGetTitle(): Promise<string> {
    const firstJobCard = this.jobCards.first();
    const jobTitleLocator = firstJobCard.locator('h3'); // Update this if your title uses another tag
    const title = await jobTitleLocator.innerText();
  
    await firstJobCard.click();
    await this.page.getByRole('button', { name: 'Save' }).click();
  
    return title;
  }
  
  // Navigate to "My Jobs"
  async goToMyJobs() {
    await this.page.getByRole('link', { name: 'Jobs' }).click();
    await this.page.getByRole('button', { name: 'My jobs' }).click();
  }
  
  // Get all saved job titles
  async getSavedJobTitles(): Promise<string[]> {
    return await this.page.locator('[data-testid^="job-item-"] h3').allTextContents(); // Update selector if needed
  }
  

  
}
