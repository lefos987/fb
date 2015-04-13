(function () {

    'use strict';

    var del = require('del'),
        gulp = require('gulp'),
        gUtil = require('gulp-util'),
        jshint = require('gulp-jshint'),
        jshintStylish = require('jshint-stylish'),
        scss = require('gulp-sass');

    var files = require('./config/gulpConfig').files,
        directories = require('./config/gulpConfig').directories;

    var definitions = [];
    var define = function (name, description, isWorkflow) {
        definitions.push({ name: name, description: description, isWorkflow: isWorkflow });
    };


    /*************************************************************/
    define('help','show help info for each gulp task and workflow');
    /*************************************************************/
    gulp.task('help',function(){

        gUtil.log('----------------------------------------');
        gUtil.log('GULP Tasks and Workflows: ');
        gUtil.log('----------------------------------------');

        var columnSpace = "                      ";
        Object.keys(definitions).map(function(key){
            var def = definitions[key],
                name = gUtil.colors.yellow(def.name + columnSpace.substring(0, 20 - def.name.length)),
                description = gUtil.colors.white(def.description);
            if (def.isWorkflow) {
                gUtil.log('----------------------------------------');
            }
            gUtil.log(name + ' : ' + description);
        });

    });

    /*  *   *   *   *   *   *   *   *   *

     T A S K S

     *  *   *   *   *   *   *   *   *   */

    /*************************************************************/
    define('clean','clean up dist folder by removing all files');
    /*************************************************************/
    gulp.task('clean', function() {

        return del(directories.dist.root);
    });

    /*************************************************************/
    define('clean:css','clean stylesheets from dist folder');
    /*************************************************************/
    gulp.task('clean:css', function() {

        return del(directories.dist.root + files.dist.css);
    });

    /*************************************************************/
    define('clean:index','clean index.html from dist folder');
    /*************************************************************/
    gulp.task('clean:index', function() {

        return del(directories.dist.root + files.dist.index);
    });

    /*************************************************************/
    define('clean:js','clean scripts from dist folder');
    /*************************************************************/
    gulp.task('clean:js', function() {

        return del(directories.dist.root + files.dist.js);
    });

    /*************************************************************/
    define('index','copy index.html to dist folder');
    /*************************************************************/
    gulp.task('index', ['clean:index'], function() {

        return gulp.src(files.src.index)
            .pipe(gulp.dest(directories.dist.root));
    });

    /*************************************************************/
    define('js','copy js scripts to dist folder');
    /*************************************************************/
    gulp.task('js', ['clean:js'], function() {

        return gulp.src(files.src.js)
            .pipe(jshint())
            .pipe(jshint.reporter(jshintStylish))
            .pipe(jshint.reporter('fail'))
            .pipe(gulp.dest(directories.dist.root));
    });

    /*************************************************************/
    define('jshint','hint all js code');
    /*************************************************************/
    gulp.task('jshint', function() {

        return gulp.src(files.src.js)
            .pipe(jshint())
            .pipe(jshint.reporter(jshintStylish))
            .pipe(jshint.reporter('fail'));
    });

    /*************************************************************/
    define('scss','compile all scss files down to a single css file');
    /*************************************************************/
    gulp.task('scss', ['clean:css'], function() {

        return gulp.src(files.src.scss)
            .pipe(scss())
            .pipe(gulp.dest(directories.dist.root));
    });

    /*************************************************************/
    define('watch','watch files for changes');
    /*************************************************************/
    gulp.task('watch', function() {

        gulp.watch(files.src.js, ['js']);
        gulp.watch(files.src.scss, ['scss']);
        gulp.watch(files.src.index, ['index']);
    });


    /*  *   *   *   *   *   *   *   *   *

     W O R K F L O W S

     *  *   *   *   *   *   *   *   *   */

    /*************************************************************/
    define('develop', 'use it when developing', true);
    /*************************************************************/
    gulp.task('develop', ['clean', 'index', 'scss', 'js', 'watch']);


    /*************************************************************/
    define('release', 'use it to build the final dist folder', true);
    /*************************************************************/
    gulp.task('release', ['clean', 'index', 'scss', 'js']);



})();