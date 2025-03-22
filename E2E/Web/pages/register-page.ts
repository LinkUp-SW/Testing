import { Page } from '@playwright/test';

export class RegisterPage {
    // Page instance
    public readonly page: Page;
    
    // URL
    private readonly signUpURL = 'http://localhost:5173/signup';
    
    // Page elements
    private readonly email_textbox;
    private readonly password_textbox;
    private readonly continue_button;
    private readonly googleSignInButton;
    private readonly login_link;
    private readonly first_name_textbox;
    private readonly last_name_textbox;
    private readonly country_dropdown;
    private readonly city_dropdown;
    private readonly job_title_textbox;
    private readonly isStudent_button;
    private readonly school_or_college_textbox;
    private readonly start_year_dropdown;
    private readonly end_year_dropdown;
    private readonly is_above_16_button;
    private readonly birth_day_dropdown;
    private readonly birth_month_dropdown;
    private readonly birth_year_dropdown;
    private readonly employment_type_dropdown;
    private readonly company_textbox;
    private readonly otp_field;
    private readonly resend_otp;

    constructor(page: Page) {
        this.page = page;
        this.email_textbox = page.locator('#email');
        this.password_textbox = page.locator('#password');
        this.continue_button = page.locator('#continue-button');
        this.googleSignInButton = page.locator('#continue-with-google-button');
        this.login_link = page.locator('#login-now-link');
        this.first_name_textbox = page.locator('#first-name');
        this.last_name_textbox = page.locator('#last-name');
        this.country_dropdown = page.locator('#country');
        this.city_dropdown = page.locator('#city');
        this.job_title_textbox = page.locator('#job-title');
        this.isStudent_button = page.locator('#i-am-student-button');
        this.school_or_college_textbox = page.locator('#school-name');
        this.start_year_dropdown = page.locator('#school-start-year');
        this.end_year_dropdown = page.locator('#school-end-year');
        this.is_above_16_button = page.locator('#is-above-16');
        this.birth_day_dropdown = page.locator('#birth-day');
        this.birth_month_dropdown = page.locator('#birth-month');
        this.birth_year_dropdown = page.locator('#birth-year');
        this.employment_type_dropdown = page.locator('#employee-type');
        this.company_textbox = page.locator('#recent-company');
        this.otp_field = page.locator('#otp-field');
        this.resend_otp = page.locator('#resend-otp-button');
        
    }

    gotoSignUpPage = async () => await this.page.goto(this.signUpURL);

    async SignUp(email: string, password: string) {
        await this.email_textbox.fill(email);
        await this.password_textbox.fill(password);
        await this.continue_button.click();
    }
    
    async enterName(firstName: string, lastName: string) {
        await this.first_name_textbox.fill(firstName);
        await this.last_name_textbox.fill(lastName);
        this.continue_button.click();
    }

    async enterCountryAndCity(country: string, city: string) {
        await this.country_dropdown.selectOption({ label: country });
        await this.city_dropdown.selectOption({ label: city });
        this.continue_button.click();
    }

    async enterJobDetails(jobTitle: string, employment_type : string, company: string) {
        await this.job_title_textbox.fill(jobTitle);
        await this.employment_type_dropdown.selectOption({ label: employment_type });
        await this.company_textbox.fill(company);
        this.continue_button.click();
    }

    async enterStudentDetailsAbove16(school: string, startYear: string, endYear: string) {
        await this.isStudent_button.click();
        await this.school_or_college_textbox.fill(school);
        await this.start_year_dropdown.selectOption({ label: startYear }); // # TODO test with invalid years
        await this.end_year_dropdown.selectOption({ label: endYear });
        this.continue_button.click();
    }

    async enterStudentDetailsBelow16(school: string, startYear: string, endYear: string, birthDay: string, birthMonth: string, birthYear: string) {
        await this.isStudent_button.click();
        this.is_above_16_button.click();
        await this.school_or_college_textbox.fill(school);
        await this.start_year_dropdown.selectOption({ label: startYear });
        await this.end_year_dropdown.selectOption({ label: endYear });
        await this.birth_day_dropdown.selectOption({ label: birthDay });
        await this.birth_month_dropdown.selectOption({ label: birthMonth });
        await this.birth_year_dropdown.selectOption({ label: birthYear });
        this.continue_button.click();
    }

    async handleOTP() {

    }

}

