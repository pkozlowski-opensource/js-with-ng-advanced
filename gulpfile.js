//various build dependencies
var gulp = require('gulp');
var gutil = require('gulp-util');
var template = require('gulp-template');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var ngHtml2Js = require("gulp-ng-html2js");
var lodash = require('lodash');

//unit testing with karma dependency
var karma = require('karma').server;

//www server dependencies
var path = require('path');
var connect = require('connect');
var http = require('http');

//Karma runner configuration
function karmaExit(exitCode) {
  gutil.log('Karma has exited with ' + exitCode);
  process.exit(exitCode);
}

var karmaDefaultConf = {
  browsers: ['Chrome'],
  files: [
    'exercises/lib/jquery-1.10.2.js',
    'exercises/lib/moment.js',
    'exercises/lib/angular.js',
    'exercises/lib/angular-mocks.js',
    'exercises/lib/jasmine-matchers.js',
    'exercises/**/solution/*.js',
    'exercises/**/solution/*.tpl.html'
  ],
  exclude: [
    'exercises/**/solution/server.js'
  ],
  frameworks: ['jasmine'],
  preprocessors: {
    '**/*.html': ['ng-html2js']
  },
  ngHtml2JsPreprocessor: {
    cacheIdFromPath: function(filepath) {
      return path.basename(filepath);
    },
    moduleName: 'templates'
  }
};

gulp.task('test', function () {
  karma.start(lodash.assign({}, karmaDefaultConf, {singleRun: true}), karmaExit);
});

gulp.task('tdd', function () {
  karma.start(lodash.assign({}, karmaDefaultConf), karmaExit);
});

gulp.task('lint', function() {
  gulp.src('exercises/**/solution/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

//Gulp tasks
gulp.task('default', ['lint', 'test']);

gulp.task('www', function () {

  var port = 8005;
  var rootDir = path.join(__dirname, 'exercises');

  var app = connect();
  app.use(connect.static(rootDir));
  app.use(connect.directory(rootDir));

  gutil.log('Starting WWW server at http://localhost:' + port);
  http.createServer(app).listen(port);
});

gulp.task('ngtpls', function () {
  gulp.src('exercises/**/solution/*.tpl.html')
    .pipe(ngHtml2Js({
      moduleName: 'templates',
      rename: path.basename
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('./complete'));
});
