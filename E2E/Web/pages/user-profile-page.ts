import { Page } from '@playwright/test';

export class UserProfile {
    // Page instance
    public readonly page: Page;
    
    // URL
    private readonly profileURL = 'http://localhost:5173/user-profile/Darwin-N%C3%BA%C3%B1ez57';
    
    // Page elements
    private readonly edit_profile_outer_button;
    private readonly edit_profile_inner_button;
    private readonly upload_photo_button;
    private readonly delete_photo_button;
    private readonly save_photo_button;
    private readonly save_changes_button;
    private readonly cancel_changes_button;
    private readonly edit_cover_photo_outer_button; // TODO: ADD ID
    private readonly edit_cover_photo_inner_button;
    private readonly uplaod_cover_photo_button;
    private readonly delete_cover_photo_button;
    private readonly save_cover_photo_button; // TODO: ADD ID
    private readonly cancel_cover_photo_button;
    private readonly add_bio_button;
    private readonly save_bio_button;
    private readonly add_skill_button; // TODO: ADD ID

    

    constructor(page: Page) {
        this.page = page;
        this.edit_profile_outer_button = page.locator('#edit-profile-button');
        this.edit_profile_inner_button = page.locator('#edit-button');
        this.upload_photo_button = page.locator('#upload-button');
        this.delete_photo_button = page.locator('#delete-button');
        this.save_photo_button = page.locator('#save-button');
        this.save_changes_button = page.locator('#editor-save-button');
        this.cancel_changes_button = page.locator('#editor-cancel-button');
        this.edit_cover_photo_outer_button = page.getByRole('button', { name: 'Edit cover photo' });
        this.edit_cover_photo_inner_button = page.locator('#edit-cover-photo-btn');
        this.uplaod_cover_photo_button = page.locator('#upload-cover-photo-btn');
        this.delete_cover_photo_button = page.locator('#delete-cover-photo-btn');
        this.save_cover_photo_button = page.getByRole('button', { name: 'Save' })
        this.cancel_cover_photo_button = page.locator('#cancel-btn');
        this.add_bio_button = page.locator('#empty-about-add-button');
        this.save_bio_button = page.locator('#about-submit-button');

        
    }

    gotoSignUpPage = async () => await this.page.goto(this.profileURL);
}
   

