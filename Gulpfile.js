var gulp = require('gulp');
var plumber = require('gulp-plumber');
var notify = require("gulp-notify");
var webpack = require('webpack-stream');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');

gulp.task('sass', function () {
  gulp.src('src/sass/main.scss')
  .pipe(sass().on('error', notify.onError("Error: <%= error.message %>")))
  .pipe(gulp.dest('dist/css'));
});

gulp.task('js', function() {
  return gulp.src('src/js/main.js')
  .pipe(plumber({
    errorHandler: notify.onError("Error: <%= error.message %>")
  }))
  .pipe(webpack({
    devtool: 'source-map',
    output: {
      filename: 'main.js'
    },
    module: {
      loaders: [
        { test: /\.handlebars$/, loader: 'handlebars-loader' }
      ]
    }
  }))
  .pipe(gulp.dest('dist/js'));
});

gulp.task('images', function() {
  return gulp.src('src/images/*')
  .pipe(imagemin({
    svgoPlugins: [{removeViewBox: false}]
  }))
  .pipe(gulp.dest('dist/images'));
});

gulp.task('watch', ['default'], function () {
  gulp.watch('src/**/*.scss', ['sass']);
  gulp.watch(['src/**/*.js', 'views/partials/**/*.handlebars'], ['js']);
  gulp.watch('src/images/*', ['images']);
});


gulp.task('build', ['sass', 'js', 'images']);
gulp.task('default', ['build']);
