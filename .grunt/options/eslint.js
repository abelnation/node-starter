module.exports = function(grunt) {
    return {
        options: {
            sourceMap: true,
            configFile: '.eslintrc',
        },

        clientsrc: [
            '<%= paths.client %>/*.{es6,jsx}',
            '<%= paths.client %>/**/*.{es6,jsx}',
            '!<%= paths.src %>/client/js/**'
        ],

        serversrc: [
            '<%= paths.servers %>/*.{es6,jsx}',
            '<%= paths.servers %>/**/*.{es6,jsx}',
        ],

        shared: [
            '<%= paths.shared %>/*.{es6,jsx}',
            '<%= paths.shared %>/**/*.{es6,jsx}',
        ],

        test: [
            '<%= paths.src %>/test/*.{es6,jsx}',
            '<%= paths.src %>/test/**/*.{es6,jsx}'
        ],
    };
}
