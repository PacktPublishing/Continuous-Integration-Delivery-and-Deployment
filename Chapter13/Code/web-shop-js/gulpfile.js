var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    gutil = require('gulp-util'),
    karma = require('karma').Server,
    istanbul = require('gulp-istanbul'),
    jasmineNode = require('gulp-jasmine-node'),
    del = require('del'),
    size = require('gulp-size'),
    minify = require('gulp-minify'),
    htmlmin = require('gulp-htmlmin'),
    cleancss = require('gulp-clean-css'),
    glob = require('glob'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    path = require('path'),
    rename = require('gulp-rename'),
    es = require('event-stream'),
    htmlreplace = require('gulp-html-replace'),
    buffer = require('vinyl-buffer'),
    concat = require('gulp-concat'),
    replace = require('gulp-replace');

var browsers = gutil.env.browsers ? gutil.env.browsers.split(',') : undefined;

gutil.log(gutil.colors.cyan('Environment: '), gutil.colors.blue(gutil.env.env));
gutil.log(gutil.colors.cyan('Environment: '), gutil.colors.blue(browsers));

gulp.task('clean', function () {
    del(['prod/*', 'scripts/bundles/*']);
})
.task('js', ['clean'], function (done) {
    var minifyOpts = require('./minify.conf.js');
    glob('{./scripts/*.js,./test/spec/order-spec.js}', function (err, files) {
        if (err) {
            done(err);
        }
        
        var tasks = files.map(function (file) {
            return browserify({
                    entries: [file],
                    debug: true
                })
                .bundle()
                .pipe(source(file))
                .pipe(buffer())
                .pipe(rename({
                    extname: '.bundle.js',
                    dirname: ''
                }))
                .pipe(gulp.dest(path.dirname(file) + '/bundles'))
                .pipe(size({
                    title: 'Before minification',
                    showFiles: true
                }))
                .pipe(minify(minifyOpts))
                .pipe(size({
                    title: 'After minification',
                    showFiles: true
                }))
                .pipe(gulp.dest('prod/scripts'));
        });
        es.merge(tasks).on('end', done);
    });
})
.task('css', ['clean'], function () {
    return gulp.src('css/*.css')
        .pipe(concat('all.css'))
        .pipe(cleancss({
            compatibility: 'ie9'
        }))
        .pipe(gulp.dest('prod/css'));
})
.task('html', ['clean'], function () {
    return gulp.src(['views/*.ejs'])
        .pipe(replace('href="views\\', 'href="'))
        .pipe(replace('href="..\\"', 'href="'))
        .pipe(htmlreplace({
            css: [
                'node_modules/bootstrap/dist/css/bootstrap.min.css',
                'css/all.css'
            ],
            node_modules: [
                'node_modules/angular/angular.min.js',
                'node_modules/jquery/dist/jquery.min.js',
                'node_modules/bootstrap/dist/js/bootstrap.min.js'
            ],
            js: {
                src: 'scripts',
                tpl: '<script src="%s/%f.bundle.js"></script>'
            }
        }))
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('prod/views'));
})
.task('lint', function () {
    return gulp.src('scripts/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
})
.task('test', ['build'], function (done) {
    new karma({
        configFile: __dirname + '/test/karma.conf.js',
        singleRun: true,
        browsers: browsers ? browsers : ['PhantomJS']
    }, function (err) {
        if (err > 0) {
            return done(new gutil.PluginError('karma', 'Karma tests failed.'));
        }
        return done();
    }).start();
})
.task('test-min', ['build'], function (done) {
    new karma({
        configFile: __dirname + '/test/karma.min.conf.js',
        browsers: browsers ? browsers : ['PhantomJS']
    }, function (err) {
        if (err > 0) {
            return done(new gutil.PluginError('karma', 'Karma tests failed.'));
        }
        return done();
    }).start();
})
.task('istanbul-setup', ['build'], function () {
    return gulp.src('scripts/order.js')
        .pipe(istanbul())
        .pipe(istanbul.hookRequire());
})
.task('test-node', ['istanbul-setup'], function () {
    return gulp.src('test/spec/order-spec.js')
        .pipe(jasmineNode({
            reporter: [
                new jasmine.JUnitXmlReporter(__dirname + '/node-junit', true, true),
                new jasmine.TerminalVerboseReporter({
                    color: true,
                    includeStackTrace: true
                })
            ]
        }))
        .pipe(istanbul.writeReports({
            reporters: ['cobertura', 'lcov', 'html'],
            reportOpts: {
                html: { dir: 'coverage/html' }
            }
        }));
})
.task('build', ['js', 'css', 'html'])
.task('default', ['lint', 'test', 'test-node']);

if (gutil.env.env !== 'prod') {
    gulp.watch(['css/*.css', 'views/*.ejs'], ['build']);
    gulp.watch('scripts/*.js', ['default']);
}