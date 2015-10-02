module.exports = function(grunt) {
    return {

        clientsrc: {
            files: [
                '<%= eslint.clientsrc %>'
            ],
            tasks: [
                'lint',
                'webpack',
                'test',
            ]
        },

        serversrc: {
            files: [
                '<%= eslint.serversrc %>'
            ],
            tasks: [
                'lint',
                'test',
            ]
        },

        shared: {
            files: [
                '<%= eslint.shared %>'
            ],
            tasks: [
                'lint',
                'test',
            ]
        },

        tests: {
            files: [
                '<%= eslint.test %>'
            ],
            tasks: [
                'lint',
                'test',
            ]
        }
    };
};
