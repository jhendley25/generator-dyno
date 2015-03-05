/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var asset = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;

describe('dyno generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('dyno:app', [
        '../../app'
      ]);
      done();
    }.bind(this));
  });

  it('creates files in root', function (done) {
    assert.file([
      'gulpfile.js',
      'package.json',
      'bower.json',
      '.bowerrc',
      '.gitignore',
      '.editorconfig',
      '.jshintrc'
    ]);
  });

  it('creates files in /src', function (done) {
    assets.file([
      'src/scripts/main.js',
      'src/scripts/example.js',
      'src/index.jade',
      'src/stylesheets/main.scss'
    ]);
  });

  it('has right dependencies', function (done) {
    assert.fileContent([
      ['package.json': '"browser-sync": "^1.8.1"'],
      ['package.json': '"browserify": "^3.41.0"'],
      ['package.json': '"coffeeify": "^0.6.0"'],
      ['package.json': '"gulp": "^3.5.0"'],
      ['package.json': '"gulp-browserify": "^0.5.0"'],
      ['package.json': '"gulp-compass": "~1.1.8"'],
      ['package.json': '"gulp-concat": "~2.1.7"'],
      ['package.json': '"gulp-jade": "~0.3.0"'],
      ['package.json': '"gulp-load-plugins": "^0.5.1"'],
      ['package.json': '"gulp-minify-css": "^0.3.1"'],
      ['package.json': '"gulp-plumber": "^0.6.2"'],
      ['package.json': '"gulp-rename": "^1.2.0"'],
      ['package.json': '"gulp-sass": "~0.4.1"'],
      ['package.json': '"gulp-uglify": "~0.1.0"'],
      ['package.json': '"gulp-util": "~2.2.12"'],
      ['package.json': '"marked": "~0.3.0"'],
    ]);
  });
});
