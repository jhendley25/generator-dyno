'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var path = require('path');
var mkdirp = require('mkdirp');
var yosay = require('yosay');
var semver = require('semver');
var self;

var DynoGenerator = yeoman.generators.Base.extend({
  init: function () {
    self = this;
    this.pkg = require('../package.json');
  },

  askFor: function () {
    var done = this.async();

    this.log(yosay('I scaffold you the best web apps with Coffeescript, Jade, Browserify and Gulp.'));

    var prompts = [{
      type: 'input',
      name: 'projectName',
      message: 'What\'s the name of the project?',
      default: path.basename(process.cwd()),
      filter: function (value) {
        return self._.camelize(self._.slugify(self._.humanize(value)));
      }
    }, {
      type: 'input',
      name: 'projectVersion',
      message: 'What\'s the version of the project?',
      default: '0.0.1',
      validate: function (value) {
        if (value == semver.valid(value)) {
          return true;
        } else {
          return "Please use a semantic version number (http://semver.org/)"
        }
      }
    }, {
      type: 'confirm',
      name: 'coffeescriptOption',
      message: 'Would you like to include Coffeescript?',
      default: true
    }, {
      type: 'confirm',
      name: 'bowerOption',
      message: 'Would you like to include Bower for dependency management?',
      default: true
    }, {
      type: 'list',
      name: 'styleOption',
      message: 'What css preprocessor do you want to use?',
      choices: [
        { name: 'Sass', value: 'sass' },
        { name: 'SCSS', value: 'scss' }
      ]
    }, {
      type: 'list',
      name: 'templateOption',
      message: 'What would you like to use for templating?',
      choices: [
        { name: 'Pure HTML', value: 'html' },
        { name: 'Jade', value: 'jade' }
      ]
    }];

    this.prompt(prompts, function (props) {
      this.projectName = this._.str.camelize(props.projectName, true);
      this.projectVersion = props.projectVersion;
      this.coffeescriptOption = props.coffeescriptOption;
      this.bowerOption = props.bowerOption;
      this.templateOption = props.templateOption;
      this.styleOption = props.styleOption;

      done();
    }.bind(this));
  },

  app: function () {
    mkdirp('src');
    mkdirp('src/scripts');

    if (!this.coffeescriptOption) {
      this.template('_main.js', 'src/scripts/main.js');
      this.template('_example.js', 'src/scripts/example.js');
    } else {
      this.template('_main.coffee', 'src/scripts/main.coffee');
      this.template('_example.coffee', 'src/scripts/example.coffee');
    }

    this.template('_index.'+this.templateOption, 'src/index.'+this.templateOption);
    this.copy('_gulpfile.js', 'gulpfile.js');

    mkdirp('src/images');
    this.copy('dyno-logo.png', 'src/images/dyno-logo.png');

    mkdirp('src/stylesheets');
    this.template('_main.'+this.styleOption, 'src/stylesheets/main.'+this.styleOption);

    this.template('_package.json', 'package.json');

    if(this.bowerOption) {
      this.template('_bower.json', 'bower.json');
      this.copy('_bowerrc', '.bowerrc');
    }
    this.copy('gitignore', '.gitignore');
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
  },

  end: function () {
    this.installDependencies({
      bower: this.bowerOption,
      skipInstall: this.options['skip-install']
    });
  }
});

module.exports = DynoGenerator;
