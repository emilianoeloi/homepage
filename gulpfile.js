var gulp = require('gulp');
var gutil = require('gulp-util');
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var del = require("del");
var fs = require("fs");

var paths = {
  styles: './src/styles/**/*.css',
  scripts: './src/scripts/**/*.js',
  scriptsVendor: './src/scripts/vendor/**/*.js',
  srcHTML: './src/**/*.html',
  buildJS: './public/js',
  buildJSVendor: './public/js/vendor',
  buildCSS: './public/css',
  buildHTML: './public',
};

gulp.task('scripts_vendor', function(){
  gulp.src(paths.scriptsVendor)
  .pipe(uglify())
  .pipe(gulp.dest(paths.buildJSVendor));
});

gulp.task('scripts', ['scripts_vendor'], function() {
  gulp.src(paths.scripts)
    .pipe(uglify())
    .pipe(concat('all.min.js'))
    .pipe(gulp.dest(paths.buildJS));
});

gulp.task('styles', function(){
  gulp.src(paths.styles)
    .pipe(concat('all.min.css'))
    .pipe(gulp.dest(paths.buildCSS));
});

gulp.task('html', function(){
  gulp.src(paths.srcHTML)
      .pipe(gulp.dest(paths.buildHTML));
});

gulp.task('compile', ['styles', 'scripts', 'html']);

gulp.task('default', ['compile'], function(){
  gulp.watch(paths.styles, ['styles']);
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.scriptsVendor, ['scripts_vendor']);
  gulp.watch(paths.templates, ['html']);
});
