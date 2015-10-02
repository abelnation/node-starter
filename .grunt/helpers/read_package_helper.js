var _ = require('underscore');

module.exports = function(grunt) {
    var pkg = grunt.file.readJSON('./package.json');
    var pkg_overrides = {};
    try {
        pkg_overrides = grunt.file.readJSON('./package_overrides.json');
    }
    catch (err) {
        console.log("No package overrides specified");
    }
    var pkg = _.defaults(pkg_overrides, pkg);
    if (!pkg.hosts) {
        pkg.hosts = {};
    }
    if (!pkg.hosts.dev) {
        pkg.hosts.dev = "NO_HOST_GIVEN";
    }

    return  pkg;
};
