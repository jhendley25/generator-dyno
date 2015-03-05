# generator-dyno

> [Yeoman](http://yeoman.io) generator


## Getting Started

### What is Dyno?

Dyno is a Yeoman generator that provides a nice set of defaults for ground-up web development. It scaffolds out a barebones webapp with cool tech:
- [Coffeescript](http://coffeescript.org/) (optional, but seriously awesome)
- [Browserify](http://browserify.org/) for dependency management
- [Gulp](http://gulpjs.com/) for running tasks
- [BrowserSync](http://browsersync.io/) for keeping things in sync while developing
- [Jade](http://jade-lang.com/) instead of that pesky html
- [Compass](http://compass-style.org/) and [Sass](http://sass-lang.com/) for styling

### What is Yeoman?

Trick question. It's not a thing. It's this guy:

![](http://i.imgur.com/JHaAlBJ.png)

Basically, he wears a top hat, lives in your computer, and waits for you to tell him what kind of application you wish to create.

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

```
$ npm install -g yo
```

### Yeoman Generators

Yeoman travels light. He didn't pack any generators when he moved in. You can think of a generator like a plug-in. You get to choose what type of application you wish to create, such as a Backbone application or even a Chrome extension.

To install generator-dyno from npm, run:

```
$ npm install -g generator-dyno
```

Finally, initiate the generator:

```
$ yo dyno
```

Once everything is ready, start the local server:

```
$ gulp serve
```

If you are ready to deploy the code you have written just build the code using:

```
$ gulp build
```

### Getting To Know Yeoman

Yeoman has a heart of gold. He's a person with feelings and opinions, but he's very easy to work with. If you think he's too opinionated, he can be easily convinced.

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).


## License

MIT
