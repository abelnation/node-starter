module.exports = function(grunt) {

    grunt.registerTask('lint', [
        'eslint',
    ]);

    grunt.registerTask('build', [
        'webpack',
    ]);

    grunt.registerTask('docs', [

    ]);
};
