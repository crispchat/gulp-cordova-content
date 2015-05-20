# gulp-cordova-author

> Sets the author of the cordova project

## Installation

```bash
npm install --save-dev gulp-cordova-author
```
## Usage

```JavaScript
var gulp = require('gulp'),
    create = require('gulp-cordova-create'),
    author = require('gulp-cordova-author');

gulp.task('build', function() {
    return gulp.src('dist')
        .pipe(create())
        .pipe(author('Sam Verschueren', 'sam.verschueren@gmail.com'));
});
```

This will set the author properties in the `config.xml` file.

## API

### author(name [, email [, website]])

#### name

*Required*  
Type: `string`

The name of the author.

#### email

Type: `string`

The email address of the author.

#### website

Type: `string`

The website of the author.

## Related

See [`gulp-cordova`](https://github.com/SamVerschueren/gulp-cordova) for the full list of available packages.

## Contributors

- Sam Verschueren [<sam.verschueren@gmail.com>]

## License

MIT © Sam Verschueren