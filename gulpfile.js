'use strict';

var gelf = require('tjs-gelf');


/**
 * Task: Default.
 */
gelf.task('default', ['dump:tasks']);


/**
 * Task module: Simple test.
 */
gelf.load(require('./index'), function(config) {

	config.src       = 'test/main.scss';
	config.watchSrc  = 'test/**/*.scss';
	config.dest      = 'dist';

});
