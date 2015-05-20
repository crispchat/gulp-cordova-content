'use strict';

/**
 * Sets the author of the cordova project.
 *
 * @author Sam Verschueren      <sam.verschueren@gmail.com>
 * @since  20 May 2015
 */

// module dependencies
var path = require('path'),
    through = require('through2'),
    gutil = require('gulp-util'),
    Config = require('cordova-config');

// export the module
module.exports = function(name, email, website) {

    var project;

    return through.obj(function(file, enc, cb) {
        project = file;

        // Pipe the file to the next step
        this.push(file);

        cb();
    }, function(cb) {
        try {
            // Load the config.xml file
            var config = new Config(path.join(project.path, 'config.xml'));

			// Sets the author properties
            config.setAuthor(name, email, website);

            // Write the config file
            config.write(function() {
				// Call the callback
				cb();
			});
        }
        catch(err) {
			// Oh no, something happened!
            cb(new gutil.PluginError('gulp-cordova-author', err.message));
        }
    });
};