function loadConfig(grunt, path) {
  var glob = require('glob');
  var _ = require('underscore');
  var config = {};

  glob.sync('*', {
    cwd: path
  }).forEach(function(option) {
    grunt.log.debug("Loading config from: " + option);

    var result = require('../../' + path + option)(grunt);
    var key = option.replace(/\.(js|coffee)$/, '');

    if (_.has(result, '_multiconfig')) {
      _.each(result, function(value, innerKey) {
        grunt.log.debug("  key: " + innerKey);
        config[innerKey] = value;
      });
    } else {
      grunt.log.debug("  key: " + key);
      config[key] = result;
    }
  });

  return config;
}

module.exports = loadConfig;
