import LoginPage from '../pageobjects/login.page';

describe('Login Screen Test', () => {
    it('Login with valid credentials', async () => {
        await LoginPage.login('darwin@nunez.com', 'abc-ABC-12');
    });
    it('Login with invalid credentials', async () => {
        await LoginPage.login('darwin@nunez.com', 'abc-ABC-1234');
    }); 
});
