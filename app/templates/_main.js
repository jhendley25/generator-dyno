// this is the main file that pulls in all other modules
// you can require() bower components too!
var example = require("./example");
example.welcome();<% if (installUnderscore) { %>
var _ = require("underscore");<% } %><% if (installJquery) { %>
var $ = require("jquery");<% } %>