// Thanks to @chriskjaer for this great gulpfile!
// https://gist.github.com/chriskjaer/8634047

var gulp        = require('gulp'),
    gutil       = require('gulp-util'),
    sass        = require('gulp-sass'),
    compass     = require('gulp-compass'),
    minifyCSS   = require('gulp-minify-css'),
    uglify      = require('gulp-uglify'),
    jade        = require('gulp-jade'),
    concat      = require('gulp-concat'),
    livereload  = require('gulp-livereload'), // Livereload plugin needed: https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei
    tinylr      = require('tiny-lr'),
    express     = require('express'),
    app         = express(),
    marked      = require('marked'), // For :markdown filter in jade
    path        = require('path'),
    rename      = require('gulp-rename'),
    browserify  = require('gulp-browserify'),
    server      = tinylr();


// --- Basic Tasks ---
// gulp.task('css', function() {
//   return gulp.src('./src/stylesheets/*.scss')
//     .pipe(compass({
//       css: 'dist/stylesheets',
//       sass: 'src/stylesheets',
//       image: 'dist/images'
//     }))
//     .pipe( csso() )
//     .pipe( gulp.dest('dist/stylesheets/') )
//     .pipe( livereload( server ));
// });

gulp.task('compass', function() {
    gulp.src('./src/stylesheets/*.scss')
        .pipe(compass({
            css: 'dist/stylesheets',
            sass: 'src/stylesheets'
        }))
        .pipe(minifyCSS())
        .pipe(gulp.dest('dist/stylesheets'))
        .pipe( livereload( server ));
});


// gulp.task('js', function() {
//   return gulp.src('src/scripts/*.js')
//     .pipe( uglify() )
//     .pipe( concat('all.min.js'))
//     .pipe( gulp.dest('dist/scripts/'))
//     .pipe( livereload( server ));
// });

gulp.task('coffee', function() {
  return gulp.src('src/scripts/main.coffee', { read: false })
    .pipe(browserify({
      transform: ['coffeeify'],
      extensions: ['.coffee']
    }))
    .pipe( rename('app.js') )
    .pipe( gulp.dest('dist/scripts') )
    .pipe( livereload( server ) );
});

gulp.task('templates', function() {
  return gulp.src('src/*.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe( gulp.dest('dist/') )
    .pipe( livereload( server ));
});

gulp.task('express', function() {
  app.use(express.static(path.resolve('./dist')));
  app.listen(1337);
  gutil.log('Listening on port: 1337');
});

gulp.task('watch', function () {
  server.listen(35729, function (err) {
    if (err) {
      return console.log(err);
    }

    gulp.watch('src/stylesheets/*.scss',['compass']);

    gulp.watch('src/scripts/*.coffee',['coffee']);

    gulp.watch('src/*.jade',['templates']);
    
  });
});

// Default Task
gulp.task('default', ['coffee','compass','templates','express','watch']);