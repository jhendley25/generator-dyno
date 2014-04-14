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
      name: 'coffescriptOption',
      message: 'Would you like to Include Coffeescript?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.coffescriptOption = props.coffescriptOption;

      done();
    }.bind(this));
  },

  app: function () {
    this.mkdir('src');
    this.mkdir('src/scripts');

    if (!this.coffescriptOption) {
      this.template('_main.js', 'src/scripts/main.js')
      this.template('_example.js', 'src/scripts/example.js')
      this.copy('_gulpfileJavascript.js', 'gulpfile.js');
      this.template('_index-js.jade', 'src/index.jade')
    } else {
      this.template('_main.coffee', 'src/scripts/main.coffee')
      this.template('_example.coffee', 'src/scripts/example.coffee')
      this.copy('_gulpfileCoffee.js', 'gulpfile.js');
      this.template('_index-coffee.jade', 'src/index.jade')
    }
    
    this.mkdir('src/stylesheets');
    this.template('_main.scss', 'src/stylesheets/main.scss')

    this.copy('_package.json', 'package.json');
    this.copy('gitignore', '.gitignore');
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = DynoGenerator;