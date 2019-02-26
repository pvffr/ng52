// Karma configuration
// Generated on Fri May 26 2017 11:24:18 GMT-0300 (BRT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'bower_components/jquery/dist/jquery.js',
      'bower_components/moment/moment.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-bootstrap/ui-bootstrap.js',
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'bower_components/angular-block-ui/dist/angular-block-ui.js',
      'bower_components/angular-chosen-localytics/dist/angular-chosen.js',
      'bower_components/angular-confirm-modal/angular-confirm.js',
      'bower_components/angular-growl-v2/build/angular-growl.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/angular-moment/angular-moment.js',
      'bower_components/angular-translate/angular-translate.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/angular-ui-switch/angular-ui-switch.js',
      'bower_components/ng-table/dist/ng-table.js',


      'app/js/**/*.module.js',
      'app/js/**/*.service.js',
      'app/js/**/*.js',
      'app/js/**/*.spec.js',
      // 'app/js/**/*.js',
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
