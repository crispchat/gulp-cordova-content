# gulp-cordova-content [![Build Status](https://travis-ci.org/SamVerschueren/gulp-cordova-author.svg?branch=master)](https://travis-ci.org/SamVerschueren/gulp-cordova-content)

> Sets the content of the cordova project

## Installation

```bash
npm install --save-dev gulp-cordova-content
```
## Usage

```JavaScript
var gulp = require('gulp'),
    create = require('gulp-cordova-create'),
    content = require('gulp-cordova-content');

gulp.task('build', function() {
    return gulp.src('dist')
        .pipe(create())
        .pipe(content('index.min.html'));
});
```

This will set the author properties in the `config.xml` file.

## API

### content(src)

#### src

*Required*  
Type: `string`

The src if the main html file

## Related

See [`gulp-cordova`](https://github.com/SamVerschueren/gulp-cordova) for the full list of available packages.

## Contributors

- Sam Verschueren [<sam.verschueren@gmail.com>]

## License

MIT © Sam Verschueren
