export const config: WebdriverIO.Config = {
    runner: 'local',
    port: 4723,
    specs: ['./test/specs/**/*.ts'],
    capabilities: [{
        platformName: 'Android',
        'appium:deviceName': 'emulator-5554', 
        'appium:platformVersion': '15.0',  
        'appium:automationName': 'UiAutomator2',
        'appium:app': "D:/Mohamed/BDE/Software Engineering/LinkUp Repo/Cross/APK File/app-debug.apk",  
        'appium:noReset': true,
    }],
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        timeout: 60000
    }
};
