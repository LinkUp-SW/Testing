export const config: WebdriverIO.Config = {
    runner: 'local',
    port: 4723,
    specs: ['./test/specs/**/*.ts'],
    capabilities: [{
        platformName: 'Android',
        'appium:deviceName': 'emulator-5554',  // Change based on your emulator/device
        'appium:platformVersion': '15.0',  // Your Android version
        'appium:automationName': 'UiAutomator2',
        'appium:app': "D:/Mohamed/BDE/Software Engineering/LinkUp Repo/Cross/APK File/app-release.apk",  
        'appium:noReset': true,
    }],
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        timeout: 60000
    }
};
