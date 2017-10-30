var gulp = require('gulp'),
    size = require('gulp-size'),
    minify = require('gulp-minify'),
    glob = require('glob'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    path = require('path'),
    rename = require('gulp-rename'),
    es = require('event-stream'),
    buffer = require('vinyl-buffer');

gulp.task('browserify', function (done) {
    glob('wwwroot/js/*.js', function (err, files) {
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
                    extname: '.bundle.debug.js',
                    dirname: ''
                }))
                .pipe(gulp.dest(path.dirname(file) + '/bundles'))
                .pipe(size({
                    title: 'Before minification',
                    showFiles: true
                }))
                .pipe(minify({
                    ext:{
                        min:'.js'
                    },
                    noSource: true
                }))
                .pipe(size({
                    title: 'After minification',
                    showFiles: true
                }))
                .pipe(rename(function (file) {
                    file.basename = file.basename.replace('.debug', '');
                }))
                .pipe(gulp.dest(path.dirname(file) + '/bundles'));
        });
        es.merge(tasks).on('end', done);
    });
})
.task('default', ['browserify']);