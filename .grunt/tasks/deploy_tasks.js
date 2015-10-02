module.exports = function(grunt) {

    grunt.registerTask('deploy', function(deployEnv) {
            if (!deployEnv) {
                deployEnv = "stage"
            }
            grunt.task.run([
                'lint',
                'build',
                'rsync:' + deployEnv,
            ]);
        }
    );

};
