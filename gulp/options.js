'use strict';

var minimist = require('minimist');
var defaults = require('defaults');

var options = minimist(process.argv.slice(2));

options = defaults(options, {
	debug: true,
	watch: false,
	minify: false,
	env: 'development'
});

if (options.production) {
	options.debug = false;
	options.minify = true;
	options.env = 'production';
}

module.exports = options;