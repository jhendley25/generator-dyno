var gulp            = require('gulp'),
    // this is an arbitrary object that loads all gulp plugins in package.json. 
    $ = require("gulp-load-plugins")(),
    express = require('express'),
    path = require('path'),
    tinylr = require('tiny-lr'),
    app             = express(),
    server          = tinylr();

gulp.task('compass', function() {
    gulp.src('./src/stylesheets/*.scss')
        .pipe($.plumber())
        .pipe($.compass({
            css: 'dist/stylesheets',
            sass: 'src/stylesheets'
        }))
        .pipe(gulp.dest('dist/stylesheets'))
        .pipe( $.livereload( server ));
});

gulp.task('coffee', function() {
  return gulp.src('src/scripts/main.coffee', { read: false })
    .pipe($.plumber())
    .pipe($.browserify({
      debug: true,
      insertGlobals: false,
      transform: ['coffeeify'],
      extensions: ['.coffee']
    }))
    .pipe( $.rename('app.js') )
    .pipe( gulp.dest('dist/scripts') )
    .pipe( $.livereload( server ) );
});

gulp.task('images', function() {
  return gulp.src('./src/images/*')
    .pipe(gulp.dest('./dist/images'))
})

gulp.task('templates', function() {
  return gulp.src('src/*.jade')
    .pipe($.plumber())
    .pipe($.jade({
      pretty: true
    }))
    .pipe( gulp.dest('dist/') )
    .pipe( $.livereload( server ));
});

gulp.task('express', function() {
  app.use(express.static(path.resolve('./dist')));
  app.listen(1337);
  $.util.log('Listening on port: 1337');
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
gulp.task('default', ['coffee','compass','templates', 'images', 'express','watch']);