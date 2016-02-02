import os from 'os';
import path from 'path';
import fs from 'fs';
import test from 'ava';
import tempWrite from 'temp-write';
import gutil from 'gulp-util';
import pify from 'pify';
import fn from './';

const fixture = `<?xml version='1.0' encoding='utf-8'?><widget></widget>`;

function content(src) {
    let file;

	return tempWrite(fixture, 'config.xml')
		.then(function (config) {
			file = config;

			return new Promise(function (resolve) {
				const stream = fn(src);

				stream.on('data', function () {

				});

				stream.on('end', function (data) {
					resolve(fs.readFileSync(file).toString());
				});

				stream.write(new gutil.File({
					cwd: path.dirname(file),
					base: path.dirname(file),
					path: path.dirname(file),
					contents: new Buffer(fixture)
				}));

				stream.end();
			});
		})
		.then(function (result) {
			fs.unlinkSync(file);

			return result;
		});
}

test('content', async t => {
	t.is(await content('test.html'), [
		'<?xml version=\'1.0\' encoding=\'utf-8\'?>',
		'<widget>',
        '    <content src="test.html" />',
		'</widget>',
		''
	].join(os.EOL));
});

