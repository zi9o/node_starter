const gulp = require('gulp');
const gnodemon = require('gulp-nodemon');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const eslint = require('gulp-eslint');

gulp.task('lint', function() {
  gulp.src('./**/**/*.js')
    // eslint() attaches the lint output to the "eslint" property
    // of the file object so it can be used by other modules.
    .pipe(eslint())
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format())
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failAfterError last.
    .pipe(eslint.failAfterError());
});

const dirs = {
  src: 'src/**/**/*.js',
  dest: 'lib',
};


gulp.task('build', () => {
  return gulp
    .src(dirs.src)
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(babel({presets: ['@babel/preset-flow']}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(dirs.dest));
});

gulp.task('watch', () => {
  gulp.watch(dirs.src, ['build']);
});


gulp.task('debug', function() {
  const stream = gnodemon({
    script: 'bin/www',
    ext: 'js',
    ignore: ['.idea/*', 'node_modules/*', 'test/*'],
    watch: [dirs.src],
    tasks: ['build'],
    exec: 'node --inspect=0.0.0.0:9230',
    verbose: true,
    stdout: true,
  });
  stream.on('restart', function() {
    console.log('restarted!');
  }).on('crash', function() {
    console.error('Application has crashed!\n');
    stream.emit('restart', 10);  // restart the server in 10 seconds
  });
});

gulp.task('default', ['debug']);
