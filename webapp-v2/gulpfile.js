var gulp = require('gulp');
var path = require('path');
var mock = require('n-mock');
var sass = require('gulp-ruby-sass');
var watch = require('gulp-watch');
var webpack = require('gulp-webpack');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;


var PATH = {
    js: {
        src: './develop/js/app.js',
        dest: './release/js/'
    },
    scss: {
        src: './develop/scss/usage/app.scss',
        dest: './release/css/'
    },
    server: {
        root: './',
        watch: ['./develop/scss/usage/page/*.scss', './develop/js/widgets/*.js', './develop/views/*.html']
    }
};

//default
gulp.task('default', ['css', 'js', 'server'], function () {

});
//sass
gulp.task('js', function () {
    return gulp.src(PATH.js.src)
        .pipe(webpack({
            output: {
                filename: 'bundle.js',
                publicPath: "./release/imgs/"
            },
            module: {
                loaders: [
                    { test: /\.html$/, loader: 'html' },
                    {
                        test: /\.(png|jpg)$/,
                        loader: 'url-loader?limit=10000&name=../imgs/[name].[ext]'
                    }
                ]
            }
        }))
        .pipe(gulp.dest(PATH.js.dest))
        .pipe(reload({stream: true}));
});
//sass
gulp.task('css', function () {
    return sass(PATH.scss.src)
        .pipe(gulp.dest(PATH.scss.dest))
        .pipe(reload({stream: true}));
});

// server
gulp.task('server', function () {
    //指定服务目录
    browserSync.init({
        server: PATH.server.root,
        middleware: [
            mock(__dirname + '/mocks')
        ]
    });
    //监听文件变动
    watch(PATH.server.watch[0], function () {
        runSequence('css');
        browserSync.reload();
    });
    watch(PATH.server.watch[1], function () {
        runSequence('js');
        browserSync.reload();
    });
    watch(PATH.server.watch[2], function () {
        runSequence('js');
        browserSync.reload();
    });
});
