'use strict';

var _ = require("underscore");
var timer = require("grunt-timer");

var loadConfig = require("./.grunt/helpers/loadConfig");

module.exports = function (grunt) {

    // Project configuration.
    require("load-grunt-tasks")(grunt);

    // Enable task timer
    timer.init(grunt, { friendlyTime: true });

    // Load rest of tasks from ./grunt/tasks/*.js
    grunt.loadTasks('.grunt/tasks');

    // our main app config file
    var pkg = grunt.file.readJSON('package.json');

    var config = {
        pkg: pkg,
        name: "<% pkg.title || pkg.name %>",
        paths: pkg.paths,
        env: process.env,
    };

    // Load task config objects from ./grunt/options/*.js
    grunt.util._.extend(config, loadConfig(grunt, './.grunt/options/'));
    grunt.initConfig(config);

    grunt.registerTask('default', [ /* 'devUpdate', */ 'concurrent:dev' ]);
};
