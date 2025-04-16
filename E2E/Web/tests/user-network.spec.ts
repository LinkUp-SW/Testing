import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { NetworkPage } from '../pages/user-network-page';
import { only } from 'node:test';

test('User can send connection request to another user', async ({ page }) => {
   
    const loginPage = new LoginPage(page);
    const networkPage = new NetworkPage(page);
    
    
    await loginPage.gotoLoginPage();
    await loginPage.login('darwin@nunez.com', 'abc-ABC-12');
    
    const isLoggedIn = await loginPage.isLoggedIn();
    expect(isLoggedIn).toBeTruthy();
    
    await networkPage.goToUserProfile('Roaa-Mohamed48');
    await networkPage.sendConnectionRequest();
    const isRequestSent = await networkPage.isConnectionRequestSent();
    expect(isRequestSent).toBeTruthy();
});



test('User can withdraw a sent connection request', async ({ page }) => {
  
    const loginPage = new LoginPage(page);
    const networkPage = new NetworkPage(page);

    
    await loginPage.gotoLoginPage();
    await loginPage.login('darwin@nunez.com', 'abc-ABC-12');

    expect(await loginPage.isLoggedIn()).toBeTruthy();

   
    await networkPage.goToUserProfile('Roaa-Mohamed48');

  
    await networkPage.cancelConnectionRequest();

   
    const isWithdrawn = await networkPage.isConnectionRequestWithdrawn();
    expect(isWithdrawn).toBeTruthy();
});

test('User can follow another user', async ({ page }) => {
    
    const loginPage = new LoginPage(page);
    const networkPage = new NetworkPage(page);

    await loginPage.gotoLoginPage();
    await loginPage.login('samam0362@gmail.com', 'Pass_123');

    
    expect(await loginPage.isLoggedIn()).toBeTruthy();

    
    await networkPage.goToUserProfile('Sama-Eid74');

    
    await networkPage.clickMoreButton();

    
    await networkPage.followUser();

   
    const isFollowing = await networkPage.isFollowSuccessful();
    expect(isFollowing).toBeTruthy();
});

test('User can unfollow another user', async ({ page }) => {
    
    const loginPage = new LoginPage(page);
    const networkPage = new NetworkPage(page);

  
    await loginPage.gotoLoginPage();
    await loginPage.login('samam0362@gmail.com', 'Pass_123');

 
    expect(await loginPage.isLoggedIn()).toBeTruthy();

    
    await networkPage.goToUserProfile('Sama-Eid74');

   
    await networkPage.clickMoreButton();

 
    await networkPage.unfollowUser();

    const isUnfollowed = await networkPage.isUnfollowSuccessful();
    expect(isUnfollowed).toBeTruthy();
});

test('User can accept a connection request', async ({ page }) => {
    
    const loginPage = new LoginPage(page);
    const networkPage = new NetworkPage(page);

    await loginPage.gotoLoginPage();
    await loginPage.login('roaa@gmail.com', 'Pass_123');

    
    expect(await loginPage.isLoggedIn()).toBeTruthy();

    
    await networkPage.goToMyNetwork();

    
    await networkPage.acceptConnectionRequest();

    
    await networkPage.goToConnections();
    const isConnected = await networkPage.isUserInConnections('Ghada Tarek');
    expect(isConnected).toBeTruthy();
});

test('User can ignore a connection request', async ({ page }) => {
    
    const loginPage = new LoginPage(page);
    const networkPage = new NetworkPage(page);

    await loginPage.gotoLoginPage();
    await loginPage.login('ghada@gmail.com', 'Pass_123');

    expect(await loginPage.isLoggedIn()).toBeTruthy();

    
    await networkPage.goToMyNetwork();

   
    await networkPage.ignoreConnectionRequest();

    
    const isRequestIgnored = await networkPage.isConnectionRequestIgnored();
    expect(isRequestIgnored).toBeTruthy();
});

test.only('User can remove a connection', async ({ page }) => {
    
    const loginPage = new LoginPage(page);
    const networkPage = new NetworkPage(page);

    await loginPage.gotoLoginPage();
    await loginPage.login('ghada@gmail.com', 'Pass_123');

    
    expect(await loginPage.isLoggedIn()).toBeTruthy();

    
    await networkPage.goToMyNetwork();
    await networkPage.goToConnections();
    
    
    await networkPage.visitUserFromConnections('Darwin Núñez');
    
    
    await networkPage.removeConnection();
    
    
    const isRemoved = await networkPage.isConnectionRemoved();
    expect(isRemoved).toBeTruthy();
});