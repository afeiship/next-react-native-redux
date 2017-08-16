(function() {

  'use strict';

  const gulp = require('gulp');
  const config = require('./config');
  const $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'gulp.*', 'del']
  });

  gulp.task('scripts', function () {
    return gulp.src('src/**/*')
      .pipe(gulp.dest('dist'))
      .pipe($.size({title: '[ minimize size ]:'}));
  });

}());
