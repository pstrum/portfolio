var gulp = require('gulp');
var config = require('../config').scripts;

gulp.task('scripts', function(callback) {
  return gulp.src(config.src)
  .pipe(gulp.dest(config.dest));
});
