exports.config = {
    baseUrl: 'file://C:/Users/sander.rossel/Desktop/ci-book/Chapter 5/Code/',
    onPrepare: function() {
        browser.resetUrl = 'file://';
        browser.ignoreSynchronization = true;
        browser.driver.manage().window().setSize(1024, 768);
    },
    framework: 'mocha',
    mochaOpts: {
        reporter: "nyan",
    },
    specs: ['selenium-mocha-tests.js'],
    seleniumServerJar: 'selenium-server-standalone-3.1.0.jar',
    seleniumServerPort: 4444,
    //seleniumAddress: 'http://localhost:4444/wd/hub',
    multiCapabilities: [{
        browserName: 'chrome'
    //}, {
    //    browserName: 'MicrosoftEdge'
    //}, {
    //    browserName: 'firefox'
    }]
    //directConnect: true
};