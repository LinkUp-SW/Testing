import { Page } from '@playwright/test';

export class FeedPage {
    public readonly page: Page;
    
    // URL
    private readonly feedURL = 'http://localhost:5173/feed';
    private readonly savedPostsURL = 'http://localhost:5173/saved-posts';
    
    // Page elements
    private readonly startPostButton;
    private readonly postTextarea;
    private readonly postButton;
    private readonly addDocumentButton;
    private readonly addMediaButton;
    private readonly chooseFileButton;
    private readonly uploadFromComputerButton;
    private readonly doneButton;
    private readonly nextButton;
    private readonly successToast;
    private readonly postOptionsButton;
    private readonly editPostButton;
    private readonly deletePostButton;
    private readonly confirmDeleteButton;
    private readonly updateSuccessToast;
    private readonly deleteSuccessToast;
    private readonly viewPostLink;

    // Comment elements
    private readonly commentButton;
    private readonly commentTextarea;
    private readonly submitCommentButton;
    private readonly commentSuccessToast;
    private readonly commentOptionsButton;
    private readonly editCommentButton;
    private readonly editCommentTextarea;
    private readonly saveCommentButton;
    private readonly updateCommentSuccessToast;
    private readonly deleteCommentButton;
    private readonly deleteCommentSuccessToast;
    // Save post elements
    private readonly savePostButton;
    private readonly saveSuccessToast;
    private readonly viewSavedPostsLink;

    constructor(page: Page) {
        this.page = page;
        this.startPostButton = page.getByRole('button', { name: 'Start a post' });
        this.postTextarea = page.getByRole('textbox', { name: 'What do you want to talk' });
        this.postButton = page.getByRole('button', { name: 'Post' });
        this.addDocumentButton = page.locator('#add-document-button');
        this.addMediaButton = page.locator('#add-media-button');
        this.chooseFileButton = page.getByRole('button', { name: 'Choose file' });
        this.uploadFromComputerButton = page.getByRole('button', { name: 'Upload from computer' });
        this.doneButton = page.getByRole('button', { name: 'Done' });
        this.nextButton = page.getByRole('button', { name: 'Next' });
        this.successToast = page.getByText('Post successfully created');
        this.postOptionsButton = page.locator('header').filter({ hasText: /·/ }).getByRole('img').nth(1);
        this.editPostButton = page.getByRole('button', { name: 'Edit Post' });
        this.deletePostButton = page.getByRole('button', { name: 'Delete Post' });
        this.confirmDeleteButton = page.getByRole('button', { name: 'Delete' });
        this.updateSuccessToast = page.getByText('Post updated successfully');
        this.deleteSuccessToast = page.getByText('Post deleted successfully!');
        this.viewPostLink = page.getByRole('link', { name: 'View post' });
        this.commentButton = page.getByRole('button', { name: 'Comment' }).first();
        this.commentTextarea = page.getByRole('textbox', { name: 'Add a comment...' });
        this.submitCommentButton = page.getByRole('button', { name: 'Comment' }).nth(1);
        this.commentSuccessToast = page.getByText('Comment added successfully!');
        this.commentOptionsButton = page.getByRole('navigation').filter({ hasText: /a few seconds ago/ }).getByRole('button');
        this.editCommentButton = page.getByRole('button', { name: 'Edit' });
        this.editCommentTextarea = page.getByRole('textbox', { name: 'Edit your comment...' });
        this.saveCommentButton = page.getByRole('button', { name: 'Save' });
        this.updateCommentSuccessToast = page.getByText('Comment updated successfully!');
        this.deleteCommentButton = page.getByRole('button', { name: 'Delete' });
        this.deleteCommentSuccessToast = page.getByText('Comment deleted successfully!');
        this.savePostButton = page.getByRole('button', { name: 'Save' });
        this.saveSuccessToast = page.getByText('Post saved. View saved posts');
        this.viewSavedPostsLink = page.getByText('View saved posts');
    }

    gotoFeedPage = async () => {
        await this.page.goto(this.feedURL);
        await this.page.waitForLoadState('domcontentloaded');
    };

    gotoSavedPostsPage = async () => {
        await this.page.goto(this.savedPostsURL);
        await this.page.waitForLoadState('domcontentloaded');
    };


    async createTextPost(postText: string, navigateToPost: boolean = false) {
        await this.startPostButton.click();
        await this.postTextarea.fill(postText);
        await this.postButton.click();
        
        
        await this.successToast.waitFor({ state: 'visible' });
        
       
        if (navigateToPost) {
            await this.viewPostLink.click();
        } else {
            await this.successToast.click(); 
        }
    }

    async createDocumentPost(filePath: string) {
        await this.startPostButton.click();
        await this.addDocumentButton.click();
        
        const fileChooserPromise = this.page.waitForEvent('filechooser');
        await this.chooseFileButton.click();
        const fileChooser = await fileChooserPromise;
        await fileChooser.setFiles(filePath);
        
        await this.doneButton.click();
        await this.postButton.click();
        
        
        await this.successToast.waitFor({ state: 'visible' });
        await this.successToast.click(); 
    }

    async createImagePost(imagePath: string, caption: string = '') {
        await this.startPostButton.click();
        await this.addMediaButton.click();
        
       
        const fileChooserPromise = this.page.waitForEvent('filechooser');
        await this.uploadFromComputerButton.click();
        const fileChooser = await fileChooserPromise;
        await fileChooser.setFiles(imagePath);
        
        await this.nextButton.click();
        
        if (caption) {
            await this.postTextarea.fill(caption);
        }
        
        await this.postButton.click();
        
        await this.successToast.waitFor({ state: 'visible' });
        await this.successToast.click(); 
    }

    async createVideoPost(videoPath: string, caption: string = '') {
        await this.startPostButton.click();
        await this.addMediaButton.click();
        const fileChooserPromise = this.page.waitForEvent('filechooser');
        await this.uploadFromComputerButton.click();
        const fileChooser = await fileChooserPromise;
        await fileChooser.setFiles(videoPath);
        
        await this.nextButton.click();
        
        if (caption) {
            await this.postTextarea.fill(caption);
        }
        
        await this.postButton.click();
        await this.successToast.waitFor({ state: 'visible' });
        await this.successToast.click(); 
    }

    async editPost(updatedText: string) {
        await this.postOptionsButton.click();
        
        await this.editPostButton.click();
        
        await this.postTextarea.fill(updatedText);
        
        await this.postButton.click();
        
        await this.updateSuccessToast.waitFor({ state: 'visible' });
        await this.updateSuccessToast.click(); 
    }

    async deletePost() {
        
        await this.postOptionsButton.click();
        
        await this.deletePostButton.click();
        
        await this.confirmDeleteButton.click();
        
        await this.deleteSuccessToast.waitFor({ state: 'visible' });
        await this.deleteSuccessToast.click(); 
    }

     async addTextComment(commentText: string) {
      
        await this.commentButton.click();
        
        await this.commentTextarea.click();
        await this.commentTextarea.fill(commentText);
        
        await this.submitCommentButton.click();
        
        await this.commentSuccessToast.waitFor({ state: 'visible' });
        await this.commentSuccessToast.click(); 
    }
    
    
    
    async editComment(updatedText: string) {
        await this.commentOptionsButton.click();
       
        await this.editCommentButton.click();
        
        await this.editCommentTextarea.click();
        await this.editCommentTextarea.fill(updatedText);
        
        await this.saveCommentButton.click();
        await this.updateCommentSuccessToast.waitFor({ state: 'visible' });
        await this.updateCommentSuccessToast.click(); 
    }
    
    async deleteComment() {
        await this.commentOptionsButton.click();
        
        await this.deleteCommentButton.click();
        
        await this.page.locator('div[role="dialog"] button.bg-primary:has-text("Delete")').click();
        
        await this.deleteCommentSuccessToast.waitFor({ state: 'visible' });
        await this.deleteCommentSuccessToast.click(); 
    }

    async savePost() {
       
        await this.postOptionsButton.click();
        
        await this.savePostButton.click();
        
        await this.saveSuccessToast.waitFor({ state: 'visible' });
    }
    
    async checkSavedPosts(postText: string) {
        
        await this.viewSavedPostsLink.click();
        
        await this.page.waitForLoadState('domcontentloaded');
        
       
        await this.page.getByRole('link', { name: postText }).first().waitFor({ state: 'visible' });
        
        
        const postExists = await this.page.getByText(postText).count() > 0;
        if (!postExists) {
            throw new Error(`Post with text "${postText}" not found in saved posts.`);
        }
    }
}