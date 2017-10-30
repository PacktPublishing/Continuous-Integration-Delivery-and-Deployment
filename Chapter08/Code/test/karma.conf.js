module.exports = function(config) {
  var istanbul = require('browserify-istanbul');

  config.set({
    basePath: '',
    frameworks: ['browserify', 'jasmine'],
    files: [
        '../node_modules/angular/angular.js',
        '../node_modules/angular-mocks/angular-mocks.js',
        'spec/*.js',
        '../scripts/*.js'
    ],
    preprocessors: {
        '../scripts/*.js': ['browserify'],
        'spec/*.js': ['browserify']
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
            { type : 'cobertura', subdir: 'cobertura' },
            { type : 'lcov', subdir: 'lcov' }
        ],
        dir : 'coverage/',
        check: {
            global: {
                statements: 0,
                branches: 0,
                functions: 0,
                lines: 0,
                includes: ['../scripts/order.js']
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
    singleRun: true,
    concurrency: Infinity,
    junitReporter: {
        outputDir: 'junit',
        suite: 'Web Shop',
        useBrowserName: true
    }
  });
};
