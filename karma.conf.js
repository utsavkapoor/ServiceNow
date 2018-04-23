// Karma configuration
// Generated on Sun Apr 22 2018 22:42:18 GMT-0700 (MST)

module.exports = function(config) {
    config.set({
        preprocessors: {
            "./app/views/*.html": ["ng-html2js"]
        },
        ngHtml2JsPreprocessor: {
            moduleName: "templates"
        },
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: "",

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ["jasmine"],

        // list of files / patterns to load in the browser
        files: [
            "./node_modules/angular/angular.js",
            "./node_modules/angular-ui-router/release/angular-ui-router.js",
            "./node_modules/angular-google-chart/ng-google-chart.js",
            "./node_modules/angular-mocks/angular-mocks.js",
            "./app/app.js",
            "./app/js/routes.js",
            "./app/js/service/data.service.js",
            "./app/js/service/barChart.service.js",
            "./app/js/controller/AppController.controller.js",
            "./app/js/directive/star.directive.js",
            "./test/TestFile.js",
            "./app/views/*.html"
        ],

        // list of files / patterns to exclude
        exclude: [],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ["progress"],

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
        browsers: ["Chrome"],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    });
};
