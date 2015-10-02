module.exports = function(grunt) {
    return {
        options: {
            require: 'babel/register',
            compilers: 'jsx:babel/register,es6:babel/register',
            reporter: 'spec',
        },

        unit: {
            options: {
                captureFile: '<%= paths.test_results %>/unit_test_results.tap',
            },
            src: [
                '<%= paths.test %>/unit/*{S,s}pec.{es6,js,jsx}',
                '<%= paths.test %>/unit/**/*{S,s}pec.{es6,js,jsx}',
            ]
        },

        functional: {
            options: {
                captureFile: '<%= paths.test_results%>/functional_test_results.tap',
            },
            src: [
                '<%= paths.test %>/functional/*{S,s}pec.{es6,js,jsx}',
                '<%= paths.test %>/functional/**/*{S,s}pec.{es6,js,jsx}',
            ]
        }
    };
}
