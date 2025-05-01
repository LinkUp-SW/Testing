import registerPage from '../pageobjects/register.page';

const validCredentials = {
    email: 'mohamedhazemwwe@gmail.com',
    password: 'abc-ABC-12',
    existingEmail: 'mathys@tel.com',
    firstName: 'Donald',
    lastName: 'Trump',
    phoneNumber: '1234567890',

}

describe('Login Screen Test', () => {
    // add before each
    beforeEach(async () => {
       await registerPage.clickJoinButton();
    });
    it.only('Login with valid credentials', async () => {
        await registerPage.signUp(validCredentials.email, validCredentials.password, validCredentials.firstName, validCredentials.lastName, validCredentials.phoneNumber);
    });
    it('Login with invalid credentials', async () => {
        await registerPage.signUp(validCredentials.existingEmail, validCredentials.password, validCredentials.firstName, validCredentials.lastName, validCredentials.phoneNumber);
    }); 
});
