module.exports = function(config) {
  var istanbul = require('browserify-istanbul');

  config.set({
    basePath: '',
    frameworks: ['browserify', 'jasmine', 'mocha', 'chai'],
    files: [
        'mocha-tests.js',
        '../node_modules/angular/angular.js',
        '../node_modules/angular-mocks/angular-mocks.js',
        'spec/*.js',
        '../scripts/*.js'
    ],
    preprocessors: {
        '../scripts/*.js': ['browserify'],
        'mocha-tests.js': ['browserify']
    },
    browserify: {
        debug: true,
        configure: function(bundle){
            bundle.on('prebundle', function(){
                bundle
                    .transform('brfs')
                    .transform(istanbul({
                        defaultIgnore: true
                    }));
            });
        }
    },
    reporters: ['progress', 'junit', 'coverage'],
    coverageReporter: {
        reporters: [
            { type : 'html', subdir: 'html' },
            { type : 'cobertura', subdir: 'cobertura' }
        ],
        dir : 'coverage/',
        check: {
            global: {
                statements: 50,
                branches: 50,
                functions: 50,
                lines: 50,
                excludes: ['../scripts/repository.js']
            },
            each: {
                lines: 10,
                excludes: [],
                overrides: {
                    '../scripts/shopping-cart.js': {
                        statements: 100
                    }
                }
            }
        }
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    customLaunchers: {
        IE9: {
            base: 'IE',
            'x-ua-compatible': 'IE=EmulateIE9'
        }
    },
    singleRun: false,
    concurrency: Infinity,
    junitReporter: {
        outputDir: 'junit',
        suite: 'Web Shop',
        useBrowserName: true
    }
  });
};
