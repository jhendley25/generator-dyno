'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var DynoGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // have Yeoman greet the user
    this.log(this.yeoman);

    // replace it with a short and sweet description of your generator
    this.log(chalk.magenta('You\'re using the fantastic Dyno generator: \n Coffeescript, Jade Templates, Browserify, and Gulp'));

    var prompts = [{
      type: 'confirm',
      name: 'Welcome',
      message: 'Would you like to continue?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.someOption = props.someOption;

      done();
    }.bind(this));
  },

  app: function () {
    this.mkdir('src');

    this.template('_index.jade', 'src/index.jade')

    this.mkdir('src/scripts');
    this.template('_main.coffee', 'src/scripts/main.coffee')
    this.template('_example.coffee', 'src/scripts/example.coffee')
    
    this.mkdir('src/stylesheets');
    this.template('_main.scss', 'src/stylesheets/main.scss')

    this.copy('_package.json', 'package.json');
    this.copy('_gulpfile.js', 'gulpfile.js');
    this.copy('gitignore', '.gitignore');
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = DynoGenerator;