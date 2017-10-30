module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['browserify', 'jasmine', 'mocha', 'chai'],
    files: [
        'mocha-tests.js',
        '../node_modules/angular/angular.js',
        '../node_modules/angular-mocks/angular-mocks.js',
        'spec/*.js',
        '../prod/scripts/*.js'
    ],
    preprocessors: {
        '../prod/scripts/*.js': ['browserify'],
        'mocha-tests.js': ['browserify']
    },
    browserify: {
        debug: true,
        transform: ['brfs']
    },
    reporters: ['progress', 'junit'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['IE', 'IE9', 'Edge', 'Chrome', 'Firefox'],
    customLaunchers: {
        IE9: {
            base: 'IE',
            'x-ua-compatible': 'IE=EmulateIE9'
        }
    },
    singleRun: true,
    concurrency: Infinity,
    junitReporter: {
        outputDir: 'junit',
        suite: 'Web Shop',
        useBrowserName: true
    }
  })
};
