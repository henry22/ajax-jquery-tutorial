var gulp = require('gulp');
var babel = require('gulp-babel');
var connect = require('gulp-connect');

gulp.task('default', function() {
    return gulp.src('src/*.js')
                .pipe(babel({
                    presets: ['es2015']
                }))
                .pipe(gulp.dest('public/js'))
                .pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch('src/*.js', ['default']);
});