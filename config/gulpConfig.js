(function () {

    'use strict';

    var GLOBS = {
        css: '**/*.css',
        js: '**/*.js',
        scss: '**/*.scss',
        tpl: '**/*.tpl.html'
    };

    var DIST_DIR = './dist/',
        SRC_DIR = './src/';

    var directories = {

        dist: {
            root: DIST_DIR
        }
    };

    var files = {

        dist: {
            js: 'app.js',
            css: 'app.css',
            index: 'index.html'
        },

        src: {
            index: SRC_DIR + 'index.html',
            js: SRC_DIR + GLOBS.js,
            scss: SRC_DIR + GLOBS.scss
        }

    };

    module.exports = {

        directories: directories,

        files: files
    };

})();