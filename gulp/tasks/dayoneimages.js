var gulp = require('gulp');
var config = require('../config').dayoneimages;
var flatten = require('gulp-flatten');

gulp.task('dayoneimages', function() {
  return gulp.src(config.src)
  .pipe(flatten())
  .pipe(gulp.dest(config.dest));
});
