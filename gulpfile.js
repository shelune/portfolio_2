var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    del = require('del'),
    autoprefix = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    gulpIf = require('gulp-if'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    notify = require('gulp-notify'),
    runSequence = require('run-sequence'),
    useref = require('gulp-useref'),
    browserSync = require('browser-sync');

gulp.task('useref', function () {
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest('build'))
        .pipe(notify('Useref completed!'))
});

gulp.task('images', function () {
    var imgSrc = 'app/img/**/*.+(png|jpg|gif|svg)',
        imgDst = 'build/img';
    return gulp.src(imgSrc)
        .pipe(cache(imagemin()))
        .pipe(gulp.dest(imgDst))
});

gulp.task('fonts', function () {
    var fontSrc = 'app/fonts/**/*',
        fontDst = 'build/fonts';

    return gulp.src(fontSrc)
        .pipe(gulp.dest(fontDst))
});

gulp.task('clean', function () {
    return del.sync('build');
});

gulp.task('browserSync', function () {
    var files = [
        'app/**/*.html',
        'app/css/**/*.css',
        'app/js/**/*.js',
        'app/images/**/'
    ];
    browserSync({
        server: {
            baseDir: 'app'
        },
    })
});

gulp.task('watch', function () {
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/css/**/*.css', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('build', function () {
    runSequence('clean', ['useref', 'images', 'fonts']);
});

gulp.task('default', function () {
    runSequence(['browserSync', 'watch']);
});
