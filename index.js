'use strict';

/**
 * Sets the content of the cordova project.
 *
 * @author Sam Verschueren	  <sam.verschueren@gmail.com>
 * @since  20 May 2015
 */

// module dependencies
var path = require('path');
var through = require('through2');
var gutil = require('gulp-util');
var Config = require('cordova-config');

// export the module
module.exports = function (src) {
	return through.obj(function (file, enc, cb) {
		try {
			// Load the config.xml file
			var config = new Config(path.join(file.path, 'config.xml'));

			// Sets the content properties
			config.setContent(src);

			// Write the config file
			config.write(function () {
				this.push(file);

				// Call the callback
				cb();
			}.bind(this));
		} catch (err) {
			// Oh no, something happened!
			cb(new gutil.PluginError('gulp-cordova-content', err.message));
		}
	});
};
