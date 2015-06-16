// Karma configuration
// Generated on Thu Jun 04 2015 16:30:50 GMT+0200 (CEST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine','jasmine-matchers'],


    // list of files / patterns to load in the browser
    files: [
	    //3rd Party Code
	    'app/bower_components/jquery/dist/jquery.js',
	    'app/bower_components/angular/angular.js',
	    'app/bower_components/angular-mocks/angular-mocks.js',
	    'app/bower_components/angular-resource/angular-resource.js',
	    'https://maps.google.com/maps/api/js',
	    'app/bower_components/socket.io-client/socket.io.js',
	    //App Code
	    'app/scripts/app.js',
	    'app/scripts/*.js',
	    'app/scripts/services/*.js',
	    'app/scripts/controllers/*.js',
	    //Tests
	    'test/app/services/**/*.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'app/scripts/*.js': ['coverage'],
      'app/scripts/services/*.js': ['coverage'],
      'app/scripts/controllers/*.js': ['coverage']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress','coverage'],
    
    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,
    
    browserNoActivityTimeout: 10000
  });
};
