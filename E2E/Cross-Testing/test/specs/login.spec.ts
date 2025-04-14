import LoginPage from '../pageobjects/login.page';

describe('Login Screen Test', () => {
    it('should login using email and password', async () => {
        await LoginPage.login('tawoni7574@amgens.com', 'abc-ABC-12');
    });
});
