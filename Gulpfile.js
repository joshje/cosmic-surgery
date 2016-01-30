var gulp = require('gulp');
var plumber = require('gulp-plumber');
var notify = require("gulp-notify");
var webpack = require('webpack-stream');
var sass = require('gulp-sass');

gulp.task('sass', function () {
  gulp.src('src/sass/**/*.scss')
  .pipe(sass().on('error', notify.onError("Error: <%= error.message %>")))
  .pipe(gulp.dest('dist/css'));
});

gulp.task('js', function() {
  return gulp.src('src/js/main.js')
  .pipe(plumber({
    errorHandler: notify.onError("Error: <%= error.message %>")
  }))
  .pipe(webpack({
    output: {
      filename: 'main.js',
    }
  }))
  .pipe(gulp.dest('dist/js'));
});

gulp.task('watch', ['default'], function () {
  gulp.watch('src/**/*.scss', ['sass']);
  gulp.watch('src/**/*.js', ['js']);
});


gulp.task('build', ['sass', 'js']);
gulp.task('default', ['build']);
