import { Page } from '@playwright/test';

export class UserProfile {
    // Page instance
    public readonly page: Page;
    
    // Page elements
    private readonly edit_profile_outer_button;
    private readonly edit_profile_inner_button;
    private readonly upload_photo_button;
    private readonly delete_photo_button;
    private readonly save_photo_button;
    private readonly save_changes_button;
    private readonly edit_cover_photo_outer_button; 
    private readonly edit_cover_photo_inner_button;
    private readonly upload_cover_photo_button;
    private readonly delete_cover_photo_button;
    private readonly save_cover_photo_button; 
    private readonly add_bio_button;
    private readonly save_bio_button;
    private readonly add_skill_button; 
    private readonly add_experience_button; 
    private readonly experience_job_tile;
    private readonly experience_employment_type;
    private readonly experience_organization_name;
    private readonly experience_start_month;
    private readonly experience_start_year;
    private readonly experience_end_month;
    private readonly experience_end_year;
    private readonly experience_location;
    private readonly experience_location_type;
    private readonly experience_description;
    private readonly experience_submit_button;
    private readonly delete_experience_button;
    private readonly add_education_button;
    private readonly education_school;
    private readonly education_degree;
    private readonly field_of_study;
    private readonly education_start_month;
    private readonly education_start_year;
    private readonly education_end_month;
    private readonly education_end_year;
    private readonly education_grade;
    private readonly activities;
    private readonly deleteEducation_button;
    private readonly delete_skill_button;
    private readonly skill_name;
    private readonly upload_resume_button;

    

    constructor(page: Page) {
        this.page = page;
        this.edit_profile_outer_button = page.locator('#edit-profile-button');
        this.edit_profile_inner_button = page.locator('#edit-button');
        this.upload_photo_button = page.locator('#upload-button');
        this.delete_photo_button = page.locator('#delete-button');
        this.save_photo_button = page.locator('#save-button');
        this.save_changes_button = page.locator('#editor-save-button');
        this.edit_cover_photo_outer_button = page.locator('#edit-cover-photo');
        this.edit_cover_photo_inner_button = page.locator('#edit-cover-photo-btn');
        this.upload_cover_photo_button = page.locator('#upload-cover-photo-btn');
        this.delete_cover_photo_button = page.locator('#delete-cover-photo-btn');
        this.save_cover_photo_button = page.locator('#save-cover-photo-button');
        this.add_bio_button = page.locator('#empty-about-add-button');
        this.save_bio_button = page.locator('#about-submit-button');
        this.add_skill_button = page.locator('#add-skill-button'); 
        this.add_experience_button = page.locator('#experience-add-button');
        this.experience_job_tile = page.locator('#experience-job-title');
        this.experience_employment_type = page.locator('#experience-add-dialog-content');
        this.experience_organization_name = page.locator('#organization-name');
        this.experience_start_month = page.locator('#start-date-month-trigger');
        this.experience_start_year = page.locator('#start-date-year-trigger');
        this.experience_end_month = page.locator('#end-date-month-trigger');
        this.experience_end_year = page.locator('#end-date-year-trigger');
        this.experience_location = page.locator('#job-location');
        this.experience_location_type = page.locator('#location-type');
        this.experience_description = page.locator('#job-description');
        this.experience_submit_button = page.locator('#experience-submit-button');
        this.experience_employment_type = page.locator('#employment-type');
        this.delete_experience_button = page.locator('#experience-delete-button-1');
        this.add_education_button = page.locator('#education-add-button');
        this.education_school = page.locator('#school');
        this.education_degree = page.locator('#degree');
        this.field_of_study = page.locator('#field_of_study');
        this.education_start_month = page.locator('#start-date-month-trigger');
        this.education_start_year = page.locator('#start-date-year-trigger');
        this.education_end_month = page.locator('#end-date-month-trigger');
        this.education_end_year = page.locator('#end-date-year-trigger');
        this.education_grade = page.locator('#grade');
        this.activities = page.locator('#activities_and_socials');
        this.deleteEducation_button = page.locator('#education-delete-button-1');
        this.add_skill_button = page.locator('#add-skill-button');
        this.delete_skill_button = page.locator('#skill-delete-button-0');
        this.skill_name = page.locator('#skill-name');
        this.upload_resume_button = page.locator('#upload-resume-btn');
        
    }
    gotoProfilePage = async () => {
    await this.page.locator('#profile-card-avatar-border').click(); 
    };
    async uploadProfilePicture(filePath: string) {
        await this.edit_profile_outer_button.click();
        const fileChooserPromise = this.page.waitForEvent('filechooser');
        await this.upload_photo_button.click();
        const fileChooser = await fileChooserPromise;
        await fileChooser.setFiles(filePath);
        await this.save_changes_button.click();
        await this.save_photo_button.click();
        await this.page.waitForTimeout(5000);
    }
    async deleteProfilePicture() {
        await this.edit_profile_outer_button.click();
        await this.delete_photo_button.click();
        await this.page.waitForTimeout(5000);
    }
    async uploadCoverPhoto(filePath: string) {
        await this.edit_cover_photo_outer_button.click();
        const fileChooserPromise = this.page.waitForEvent('filechooser');
        await this.upload_cover_photo_button.click();
        const fileChooser = await fileChooserPromise;
        await fileChooser.setFiles(filePath);
        await this.save_cover_photo_button.click();
        await this.page.waitForTimeout(5000);
    }
    async deleteCoverPhoto() {
        await this.edit_cover_photo_outer_button.click();
        await this.delete_cover_photo_button.click();
        await this.page.waitForTimeout(5000);
    }
    async addExperience(title : string, employment_type : string, company : string, start_month, start_year, end_month, end_year, location, location_type,
        description) {
            await this.add_experience_button.click();
            await this.experience_job_tile.fill(title);
            await this.experience_employment_type.click();
            await this.page.getByRole('option', { name: employment_type }).click();
            await this.experience_organization_name.fill(company);
            await this.page.getByRole('listitem').click();
            await this.experience_start_month.click();
            await this.page.getByRole('option', { name: start_month }).click();
            await this.experience_start_year.click();
            await this.page.getByRole('option', { name: start_year }).click();
            await this.experience_end_month.click();
            await this.page.getByRole('option', { name: end_month }).click();
            await this.experience_end_year.click();
            await this.page.getByRole('option', { name: end_year }).click();
            await this.experience_location.fill(location);
            await this.experience_location_type.click();
            await this.page.getByRole('option', { name: location_type }).click();
            await this.experience_description.fill(description);
            await this.experience_submit_button.click();
            await this.page.waitForTimeout(2000);
    }
    async deleteExperience() {
        await this.delete_experience_button.click();
        await this.page.getByRole('button', { name: 'Delete' }).click(); // confirmation button
    }
    async addEducation(school: string, degree: string, filed_of_study: string, start_month: string, start_year: string, end_month: string, end_year: string, 
        grade: string, activities: string) {
        await this.add_education_button.click();
        await this.education_school.fill(school);
        await this.page.getByRole('listitem').click();
        await this.education_degree.fill(degree);
        await this.field_of_study.fill(filed_of_study);
        await this.education_start_month.click();
        await this.page.getByRole('option', { name: start_month }).click();
        await this.education_start_year.click();
        await this.page.getByRole('option', { name: start_year }).click();
        await this.education_end_month.click();
        await this.page.getByRole('option', { name: end_month }).click();
        await this.education_end_year.click();
        await this.page.getByRole('option', { name: end_year }).click();
        await this.education_grade.fill(grade);
        await this.activities.fill(activities);
        await this.page.getByRole('button', { name: 'Save Education' }).click();
    }
    async deleteEducation() {
        await this.deleteEducation_button.click();
        await this.page.getByRole('button', { name: 'Delete' }).click(); // confirmation button
    }
    async addSkill(skill: string) {
        await this.add_skill_button.click();
        await this.skill_name.fill(skill);
        await this.page.getByRole('button', { name: 'Add Skill' }).click(); // confirmation button
    }
    async addSkill_with_compnay(skill: string, company: string) {
        await this.add_skill_button.click();
    }
    async deleteSkill() {
        await this.delete_skill_button.click();
        await this.page.getByRole('button', { name: 'Delete' }).click(); // confirmation button
    }
    async uploadResume(filePath: string, isValid: boolean) {
        await this.page.getByRole('button', { name: 'Add profile section' }).click();
        await this.page.getByRole('button', { name: 'Recommended' }).click();
        await this.page.getByRole('button', { name: 'Add Resume' }).click();
        // Trigger file chooser and set file
        const [fileChooser] = await Promise.all([
            this.page.waitForEvent('filechooser'),
            this.page.getByText('Drag and drop your resume').click()
        ]);
        await fileChooser.setFiles(filePath);
        if (isValid) await this.upload_resume_button.click();
        
    }
}
