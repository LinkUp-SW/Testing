import { test, expect } from '@playwright/test';
import { FeedPage } from '../pages/feed-page';
import { LoginPage } from '../pages/login-page';
import path from 'path';


const validCredentials = {
    email: 'samam0362@gmail.com',
    password: 'Pass_123', 
    text_post: 'Testing post',
    updated_text_post: 'Testing post updated',
    document_path: path.join(__dirname, '../Assets/Testing_Document.pdf'), 
    image_path: path.join(__dirname, '../Assets/Testing_image.jpeg'),
    video_path: path.join(__dirname, '../Assets/Testing_Video.mp4'),
    comment_text: 'Testing comment',
    updated_comment_text: 'Testing comment updated',
    save_post_text: 'Testing Save post'
};

test.describe('Feed Page Testcases', () => {
    let feedPage: FeedPage;

    test.beforeEach(async ({ page }) => {
        test.setTimeout(60000); 

        let loginPage = new LoginPage(page);
        await loginPage.gotoLoginPage();
        await loginPage.login(validCredentials.email, validCredentials.password);
        
        feedPage = new FeedPage(page);
        await feedPage.gotoFeedPage();
    });

    test('Create text post', async () => {
        await feedPage.createTextPost(validCredentials.text_post);
        
    });

    test('Upload document post', async () => {
        await feedPage.createDocumentPost(validCredentials.document_path);
    });

    test('Upload image post', async () => {
        await feedPage.createImagePost(validCredentials.image_path);
        });

    test('Upload video post', async () => {
        await feedPage.createVideoPost(validCredentials.video_path);
        
    });

    test('Edit a text post', async () => {
        
        await feedPage.createTextPost(validCredentials.text_post, true);
        
        
        await feedPage.editPost(validCredentials.updated_text_post);
        
    });

    test('Delete a text post', async () => {
        
        await feedPage.createTextPost(validCredentials.text_post, true);
        
       
        await feedPage.deletePost();
        
    });

    test('Add comment with text ', async () => {
       
        await feedPage.createTextPost(validCredentials.text_post, true);
        
        await feedPage.addTextComment(validCredentials.comment_text);
        
    });
    
    test('Edit a comment on a post', async () => {

        await feedPage.createTextPost(validCredentials.text_post, true);
        
       
        await feedPage.addTextComment(validCredentials.comment_text);
        
        
        await feedPage.editComment(validCredentials.updated_comment_text);
        
    });
    
    test('Delete a comment from a post', async () => {
        
        await feedPage.createTextPost(validCredentials.text_post, true);
        
        await feedPage.addTextComment(validCredentials.comment_text);
        
        await feedPage.deleteComment();
        
    });

    test('Save a post and check in saved posts', async () => {
    
        await feedPage.createTextPost(validCredentials.save_post_text, true);
         
        await feedPage.savePost();
        
        await feedPage.checkSavedPosts(validCredentials.save_post_text);
    });
});