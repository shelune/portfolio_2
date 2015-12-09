var gulp = require('gulp'),
    changed = require('gulp-changed'),
    imagemin = require('gulp-imagemin'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    autoprefix = require('gulp-autoprefixer'),
    minifyCSS = require('gulp-minify-css'),
    browserSync = require('browser-sync').create(),
    minifyHTML = require('gulp-minify-html');


gulp.task('imagemin', function() {
    var imgSrc = './img/**/*',
        imgDst = './build/img';

    gulp.src(imgSrc)
        .pipe(changed(imgDst))
        .pipe(imagemin())
        .pipe(gulp.dest(imgDst));
});

gulp.task('minifyHTML', function() {
    var htmlSrc = './*.html',
        htmlDst = './build';
    gulp.src(htmlSrc)
        .pipe(changed(htmlDst))
        .pipe(minifyHTML())
        .pipe(gulp.dest(htmlDst));
});

gulp.task('scripts', function() {
    gulp.src(['./js/**/*.js'])
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./build/js/'));
});

gulp.task('styles', function () {
    gulp.src(['./css/*.css'])
        .pipe(concat('main.css'))
        .pipe(autoprefix('last 2 versions'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./build/css/'));
});

gulp.task('browser-sync', ['imagemin', 'minifyHTML', 'styles', 'scripts'], function () {
    var files = [
        './*.html',
        './css/*.css',
        './js/**/*.js',
        './img/**/*.{png, jpg}'
    ];

    browserSync.init(files, {
        server: {
            baseDir: './'
        }
    });

    gulp.watch(files, browserSync.reload());
});

gulp.task('default', ['imagemin', 'minifyHTML', 'styles', 'scripts']);
