const gulp = require('gulp');
const ts = require('gulp-typescript');
const babel = require('gulp-babel');
const rollup = require('gulp-rollup');
const env = require('gulp-env');
const replace = require('rollup-plugin-replace');
var destination = './dist/server/';
const tsProj = ts.createProject('./src/server/tsconfig.json');

function builddev() {
  return gulp.watch('./src/server/**/*.ts', { ignoreInitial: false }, () => {
    gulp
      .src('./src/server/**/*.ts')
      .pipe(tsProj())
      .pipe(babel())
      .pipe(gulp.dest(destination));
  });
}

gulp.task('buildconfig', () => {
  gulp
    .src('./src/server/**/*.js')
    .pipe(
      rollup({
        // any option supported by Rollup can be set here.
        // input: './src/server/app.js',
        format: 'cjs',
        input: './src/server/config/env.js',
        plugins: [
          replace({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
          })
        ]
      })
    )
    .pipe(gulp.dest(destination));
});

gulp.task('buildprod', () => {
  gulp
    .src('./src/server/**/*.js')
    .pipe(
      babel({
        babelrc: false,
        ignore: './src/server/config/env.js',
        plugins: [
          'transform-decorators-legacy',
          'babel-plugin-transform-es2015-modules-commonjs'
        ]
      })
    )
    .pipe(gulp.dest(destination));
});

const _flag = process.env.NODE_ENV == 'production';

let _task = ['builddev'];
if (_flag) {
  _task = ['buildconfig', 'buildprod'];
}
gulp.task('default', builddev);
