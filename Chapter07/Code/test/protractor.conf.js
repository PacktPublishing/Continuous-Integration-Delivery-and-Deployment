exports.config = {
    baseUrl: 'file://C:/Users/sander.rossel/Desktop/ci-book/Chapter 5/Code/',
    onPrepare: function() {
        browser.resetUrl = 'file://';
        browser.ignoreSynchronization = true;
        
        var jasmineReporters = require('jasmine-reporters');
        return browser.getProcessedConfig().then(function(config) {
            var browserName = config.capabilities.browserName;
 
            var junitReporter = new jasmineReporters.JUnitXmlReporter({
                savePath: 'selenium-junit/',
                consolidateAll: false,
                filePrefix: browserName + '-',
                modifySuiteName: function(generatedSuiteName, suite) {
                    return browserName + ' - ' + generatedSuiteName;
                }
            });
            jasmine.getEnv().addReporter(junitReporter);
            
            jasmine.getEnv().addReporter(new jasmineReporters.TerminalReporter({
                verbosity: 3,
                color: true,
                showStack: true
            }));
        });
    },
    framework: 'jasmine',
    specs: ['selenium-tests.js'],
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