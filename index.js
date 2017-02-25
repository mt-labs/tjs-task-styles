'use strict';

module.exports = function(gelf, name) {

	// Module name
	name = name || 'styles';

	// Task names
	var task = {
		build:  'build:' + name,
		watch:  'watch:' + name,
	};


	/**
	 * Default configuration.
	 */
	gelf.config(name, function(config, get) {

		var isProd = (get('env') === 'prod');

		return {
			src: 'app/Resources/styles/**/*.scss',
			concat: null,
			dest: 'web/css',
			watch: get('watch'),
			watchSrc: null,
			sass: {
				outputStyle: isProd ? 'compressed' : 'expanded',
				sourceComments: !isProd,
			},
		};

	});


	/**
	 * Task: Build styles.
	 */
	gelf.task(task.build, function() {

		var config = gelf.config(name);

		var autoprefixer = require('gulp-autoprefixer');
		var concat = require('gulp-concat');
		var noop = require('gulp-util').noop;
		var sass = require('gulp-sass');
		var sourcemaps = require('gulp-sourcemaps');

		return gelf.src(config.src)
			.pipe(sourcemaps.init())
			.pipe(sass(config.sass))
			.pipe(autoprefixer())
			.pipe(config.concat ? concat(config.concat) : noop())
			.pipe(sourcemaps.write('.'))
			.pipe(gelf.dest(config.dest))
			.pipe(gelf.notify.done(task.build))
		;

	});


	/**
	 * Task: Watch styles.
	 */
	gelf.task(task.watch, function() {

		var config = gelf.config(name);

		gelf.watch(config.watchSrc || config.src, config.watch, [task.build]);

	});


	return name;

};
