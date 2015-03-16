var gulp            = require('gulp'),
    // this is an arbitrary object that loads all gulp plugins in package.json.
    $           = require('gulp-load-plugins')(),
    path        = require('path'),
    browserSync = require('browser-sync'),
    reload      = browserSync.reload,
    del         = require('del');

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: "./dist"
    }
  });
});

gulp.task('compass', function() {
  return gulp.src('./src/stylesheets/*.scss')
    .pipe($.plumber())
    .pipe($.compass({
      css: 'dist/stylesheets',
      sass: 'src/stylesheets'
    }))
    .pipe(gulp.dest('dist/stylesheets'))
});

gulp.task('clean', function(cb) {
  del('./dist', cb);
});

gulp.task('js', function() {
  return gulp.src('src/scripts/*.js')
    .pipe($.plumber())
    .pipe( $.browserify({
      debug: true
    }))
    .pipe( $.uglify() )
    .pipe( $.rename('app.js'))
    .pipe( gulp.dest('dist/scripts/'));
});

gulp.task('images', function() {
  return gulp.src('./src/images/*')
    .pipe($.imagemin({
      progressive: true
    }))
    .pipe(gulp.dest('./dist/images'))
})

gulp.task('templates', function() {
  return gulp.src('src/*.jade')
    .pipe($.plumber())
    .pipe($.jade({
      pretty: true
    }))
    .pipe( gulp.dest('dist/') )
});

gulp.task('build', ['clean', 'compass', 'js', 'templates', 'images']);

gulp.task('serve', ['build', 'browser-sync'], function () {
  gulp.watch('src/stylesheets/*.scss',['compass', reload]);
  gulp.watch('src/scripts/*.js',['js', reload]);
  gulp.watch('src/images/**/*',['images', reload]);
  gulp.watch('src/*.jade',['templates', reload]);
});

gulp.task('default', ['serve']);
