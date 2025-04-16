import { Page } from '@playwright/test';

export class NetworkPage {
    // Page instance
    public readonly page: Page;

    // URL format for user profiles
    private readonly userProfileUrlBase = 'http://localhost:5173/user-profile/';

    // Page elements
    private readonly moreButton;
    private readonly connectButton;
    private readonly connectionSentAlert;
    private readonly pendingButton;
    private readonly connectionWithdrawnAlert;
    private readonly followButton;
    private readonly followSuccessAlert;
    private readonly unfollowButton;
    private readonly unfollowSuccessAlert;
    private readonly myNetworkLink;
    private readonly acceptButton;
    private readonly connectionsTab;
    private readonly ignoreButton;
    private readonly invitationsHeading;
    private readonly removeConnectionButton;
    private readonly confirmRemoveButton;
    private readonly connectionRemovedAlert;



    constructor(page: Page) {
        this.page = page;
        this.moreButton = page.getByRole('button', { name: 'More' });
        this.connectButton = page.getByRole('button', { name: 'Connect' });
        this.connectionSentAlert = page.getByText('Connection request sent');
        this.pendingButton = page.getByRole('button', { name: 'Pending' });
        this.connectionWithdrawnAlert = page.getByText('Connection request withdrawn successfully');
        this.followButton = page.getByRole('button', { name: 'Follow' });
        this.followSuccessAlert = page.getByText('You are now following this user');
        this.unfollowButton = page.getByRole('button', { name: 'Unfollow' });
        this.unfollowSuccessAlert = page.getByText('You have unfollowed this user');
        this.myNetworkLink = page.getByRole('link', { name: 'My Network' });
        this.acceptButton = page.getByRole('button', { name: 'Accept' });
        this.connectionsTab = page.getByText('Connections (0)');
        this.connectionsTab= page.getByText('Connections (1)');
        this.ignoreButton = page.getByRole('button', { name: 'Ignore' });
        this.invitationsHeading = page.getByRole('heading', { name: /Invitations/ });
        this.removeConnectionButton = page.getByRole('button', { name: 'Remove Connection' });
        this.confirmRemoveButton = page.getByRole('button', { name: 'remove', exact: true });
        this.connectionRemovedAlert = page.getByText('Connection removed successfully');
    }

    async goToUserProfile(username: string) {
        await this.page.goto(`${this.userProfileUrlBase}${username}`);
        await this.page.waitForLoadState('domcontentloaded');
    }

    async sendConnectionRequest() {
       
        
        await this.connectButton.waitFor();
        await this.connectButton.click();
        await this.page.getByRole('listitem').click();
    }

    async isConnectionRequestSent(): Promise<boolean> {
        try {
            await this.connectionSentAlert.waitFor({ timeout: 5000 });
            return true;
        } catch {
            return false;
        }
    }

    async cancelConnectionRequest() {
        await this.pendingButton.waitFor();
        await this.pendingButton.click();
        await this.page.getByRole('listitem').click();
    }

    async isConnectionRequestWithdrawn(): Promise<boolean> {
        try {
            await this.connectionWithdrawnAlert.waitFor({ timeout: 5000 });
            return true;
        } catch {
            return false;
        }
    }

    async goToMyNetwork() {
        await this.myNetworkLink.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async acceptConnectionRequest() {
        await this.acceptButton.waitFor();
        await this.acceptButton.click();
        await this.page.waitForTimeout(1000);
    }

    async goToConnections() {
        await this.connectionsTab.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async isUserInConnections(username: string): Promise<boolean> {
        try {
            await this.page.getByRole('heading', { name: username }).waitFor({ timeout: 5000 });
            return true;
        } catch {
            return false;
        }
    }

    async ignoreConnectionRequest() {
        await this.ignoreButton.waitFor();
        await this.ignoreButton.click();
        await this.page.waitForTimeout(1000);
    }

    async isConnectionRequestIgnored(): Promise<boolean> {
        try {
            await this.ignoreButton.waitFor({ state: 'hidden', timeout: 2000 });
            return true;
        } catch {
            return false;
        }
    }
    
    async removeConnection() {
        await this.removeConnectionButton.waitFor();
        await this.removeConnectionButton.click();
        await this.confirmRemoveButton.waitFor();
        await this.confirmRemoveButton.click();
        await this.page.getByRole('listitem').click();
    }

    async isConnectionRemoved(): Promise<boolean> {
        try {
            await this.connectionRemovedAlert.waitFor({ timeout: 5000 });
            return true;
        } catch {
            return false;
        }
    }

    async visitUserFromConnections(username: string) {
        await this.page.getByRole('heading', { name: username }).click();
        await this.page.waitForLoadState('domcontentloaded');
    }




    async clickMoreButton() {
        await this.moreButton.waitFor();
        await this.moreButton.click();
    }

    async followUser() {
        await this.followButton.waitFor();
        await this.followButton.click();
        await this.page.getByRole('listitem').click();
    }

    async isFollowSuccessful(): Promise<boolean> {
        try {
            await this.followSuccessAlert.waitFor({ timeout: 5000 });
            return true;
        } catch {
            return false;
        }
    }

    async unfollowUser() {
        await this.unfollowButton.waitFor();
        await this.unfollowButton.click();
        await this.page.getByRole('listitem').click();
    }

    async isUnfollowSuccessful(): Promise<boolean> {
        try {
            await this.unfollowSuccessAlert.waitFor({ timeout: 5000 });
            return true;
        } catch {
            return false;
        }
    }
}

