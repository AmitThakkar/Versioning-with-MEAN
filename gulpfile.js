/**
 * Created by Amit Thakkar on 04/05/15.
 */
(function (require) {
    'use strict';
    var gulp = require('gulp'),
        browserify = require('gulp-browserify'),
        uglify = require('gulp-uglify'),
        gulpif = require('gulp-if'),
        open = require('gulp-open'),
        runSequence = require('run-sequence'),
        livereload = require('gulp-livereload'),
        minifyHTML = require('gulp-minify-html'),
        inject = require('gulp-inject'),
        rename = require('gulp-rename'),
        replace = require('gulp-replace'),
        rimraf = require('rimraf'),
        gulpNgConfig = require('gulp-ng-config');

    var isDevelopmentEnvironment = false,
        srcFolder = 'client/src/',
        destFolder = 'build/src/',
        temp = 'temp/',
        javascriptTasks = [
            {
                taskName: 'angular-amd',
                srcFiles: [srcFolder + 'angular-amd.js'],
                dest: destFolder
            },
            {
                taskName: 'home.javascript',
                srcFiles: [srcFolder + 'components/home/home.controller.js'],
                dest: destFolder + 'components/home'
            }
        ],
        htmlTasks = [
            {
                taskName: 'home.html',
                srcFiles: [srcFolder + 'components/home/_home.html'],
                dest: destFolder + 'components/home/'
            }
        ],
        now = '-' + Date.now(),
        environment = 'production',
        renameFunction = function (path) {
            path.basename += now;
        };
    gulp.task('config.json', function () {
        return gulp.src(srcFolder + 'environment.config.json')
            .pipe(gulpNgConfig('angular-amd', {
                createModule: false,
                wrap: '(function(angular) {<%= module %>})(angular);',
                environment: environment
            }))
            .pipe(gulp.dest(temp));
    });
    gulp.task('index.html', function () {
        return gulp.src(srcFolder + '../index.html')
            .pipe(inject(gulp.src(destFolder + 'angular-amd*.js', {read: false}), {relative: true}))
            .pipe(gulpif(!isDevelopmentEnvironment, minifyHTML()))
            .pipe(gulp.dest('./build/'));
    });
    gulp.task('assets', function () {
        return gulp.src('app/assets/**/*')
            .pipe(gulp.dest('build/assets'));
    });
    gulp.task('clear', function (callback) {
        rimraf('./build', callback);
    });
    gulp.task('clear.temp', function (callback) {
        rimraf(temp, callback);
    });
    gulp.task('setDevEnvironment', function () {
        isDevelopmentEnvironment = true;
    });
    var taskNames = [];
    javascriptTasks.forEach(function (javascriptTask) {
        taskNames.push(javascriptTask.taskName);
        gulp.task(javascriptTask.taskName, function () {
            return gulp.src(javascriptTask.srcFiles)
                .pipe(browserify())
                .pipe(replace('{{now}}', now))
                .pipe(gulpif(!isDevelopmentEnvironment, uglify()))
                .pipe(rename(renameFunction))
                .pipe(gulp.dest(javascriptTask.dest))
                .pipe(gulpif(isDevelopmentEnvironment, livereload()));
        });
    });
    htmlTasks.forEach(function (htmlTask) {
        taskNames.push(htmlTask.taskName);
        gulp.task(htmlTask.taskName, function () {
            return gulp.src(htmlTask.srcFiles)
                .pipe(gulpif(!isDevelopmentEnvironment, minifyHTML()))
                .pipe(rename(renameFunction))
                .pipe(gulp.dest(htmlTask.dest))
                .pipe(gulpif(isDevelopmentEnvironment, livereload()));
        })
    });
    gulp.task('browserify', function (callback) {
        runSequence('config.json', taskNames, 'index.html', 'assets', callback);
    });
    gulp.task('open', function () {
        var options = {
            url: 'http://localhost:9000/build/'
        };
        gulp.src('./build/index.html')
            .pipe(open('', options));
    });
    gulp.task('watch', function () {
        livereload.listen();
        gulp.watch(srcFolder + '*.js', ['angular-amd']);
        gulp.watch(srcFolder + 'shared/*.js', ['angular-amd']);
        gulp.watch(srcFolder + 'components/**/*.main.js', ['angular-amd']);
        gulp.watch(srcFolder + 'components/home/*.html', ['home.html']);
        gulp.watch(srcFolder + 'components/home/*.js', ['home.javascript']);
    });
    gulp.task('dev', function (callback) {
        environment = 'development';
        runSequence('clear', 'clear.temp', 'setDevEnvironment', 'browserify', 'open', 'watch', callback);
    });
    gulp.task('qa', function (callback) {
        environment = 'qa';
        runSequence('clear', 'clear.temp', 'browserify', 'clear.temp', callback);
    });
    gulp.task('default', function (callback) {
        runSequence('clear', 'clear.temp', 'browserify', 'clear.temp', callback);
    });
})(require);