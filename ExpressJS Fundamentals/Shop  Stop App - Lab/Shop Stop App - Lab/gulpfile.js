const gulp = require('gulp');
const minifyCss = require('gulp-rename');
const rename = require('gulp-rename');

gulp.task('minify-css', () => {
    gulp.src('content/styles/*.css')
        .pipe(minifyCss())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('content/styles'))
})