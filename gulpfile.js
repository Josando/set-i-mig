var gulp = require('gulp');
var browserify = require('gulp-browserify');
var spawn = require('child_process').spawn;
var node;

/**
 * $ gulp
 * description: browserify client side
 */
gulp.task('browserify', function() {
  return gulp.
    src('./frontend/javascript/main.js').
    pipe(browserify()).
    pipe(gulp.dest('./frontend/bin'));
});

/**
 * $ gulp
 * description: start the development environment
 */
gulp.task('watch', function() {
  gulp.run('server');
  gulp.watch(['./frontend/javascript/*.js',
            './frontend/javascript/patterns/singleton/*.js',
            './frontend/javascript/controllers/*.js'],
             ['browserify'],function() {
                 gulp.run('server');
             });
});

/**
 * $ gulp server
 * description: launch the server. If there's a server already running, kill it.
 */
gulp.task('server', function() {
  if (node) node.kill();
  node = spawn('node', ['backend/index.js'], {stdio: 'inherit'});
  node.on('close', function (code) {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  });
});
