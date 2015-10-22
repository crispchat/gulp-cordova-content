import os from 'os';
import path from 'path';
import fs from 'fs';
import test from 'ava';
import tempWrite from 'temp-write';
import gutil from 'gulp-util';
import pify from 'pify';
import fn from './';

const fixture = `<?xml version='1.0' encoding='utf-8'?><widget></widget>`;

function author(name, email, website) {
    let file;

	return tempWrite(fixture, 'config.xml')
		.then(function (config) {
			file = config;

			return new Promise(function (resolve) {
				const stream = fn(name, email, website);

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

test('name', async t => {
	t.is(await author('Sam Verschueren'), [
		'<?xml version=\'1.0\' encoding=\'utf-8\'?>',
		'<widget>',
        '    <author>Sam Verschueren</author>',
		'</widget>',
		''
	].join(os.EOL));
});

test('name and email', async t => {
	t.is(await author('Sam Verschueren', 'sam.verschueren@gmail.com'), [
		'<?xml version=\'1.0\' encoding=\'utf-8\'?>',
		'<widget>',
        '    <author email="sam.verschueren@gmail.com">Sam Verschueren</author>',
		'</widget>',
		''
	].join(os.EOL));
});

test('name, email and website', async t => {
	t.is(await author('Sam Verschueren', 'sam.verschueren@gmail.com', 'https://github.com/SamVerschueren'), [
		'<?xml version=\'1.0\' encoding=\'utf-8\'?>',
		'<widget>',
        '    <author email="sam.verschueren@gmail.com" href="https://github.com/SamVerschueren">Sam Verschueren</author>',
		'</widget>',
		''
	].join(os.EOL));
});
