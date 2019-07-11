const gulp = require('gulp');
const ts = require('gulp-typescript');
const tslint = require("gulp-tslint");
const del = require("del");

gulp.task('clean:dist', function () {
  return del('./dist/*', { force: true });
});

/**
 * TS Lint
 */

const lintConfig = {
  configuration: "./tslint.json",
  formatter: "verbose",
};
const lintReportConfig = {
  emitError: false,
  summarizeFailureOutput: true,
  reportLimit: 10,
};

gulp.task('tslint:prod', function () {
  return gulp.src('./src/**/*.ts')
    .pipe(tslint(lintConfig))
    .pipe(tslint.report({
      ...lintReportConfig,
      emitError: true,
    }));
});
gulp.task('tslint:dev', function () {
  return gulp.src('./src/**/*.ts')
    .pipe(tslint(lintConfig))
    .pipe(tslint.report(lintReportConfig));
});

/**
 * TS Compilator
 */

const tsProject = ts.createProject('./tsconfig.json');

gulp.task('build', gulp.series(function () {
  return gulp.src('./src/**/*.ts')
    .pipe(tsProject())
    .pipe(gulp.dest('./dist'));
}));

gulp.task('build:prod', gulp.series('tslint:prod', 'clean:dist', 'build'));
gulp.task('build:dev', gulp.series('tslint:dev', 'build'));

gulp.task('watch', gulp.series('clean:dist', 'build:dev', function () {
  return gulp.watch('./src/**/*.ts', gulp.series('build:dev'));
}));

/**
 * Publish
 */

gulp.task('prepublish:prod', function () {
  return gulp.src([ './package.json', './README.md' ])
    .pipe(gulp.dest('./dist'));
});

gulp.task('publish', gulp.series('build:prod', 'prepublish:prod'));
