module.exports = function(grunt) {

    // Grunt task for unit test
    grunt.registerTask('test-unit', [
        'mochaTest:unit'
    ]);

    grunt.registerTask('test-functional', [
        'mochaTest:functional'
    ]);

    grunt.registerTask('test-integration', [
    ]);

    grunt.registerTask('test', [
        'test-unit',
        'test-functional'
        // 'test-integration',
    ]);
};
