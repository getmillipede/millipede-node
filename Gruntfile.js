module.exports = function (grunt) {
    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        jscs: {
            all: {
                files: {
                    src: [
                        'Gruntfile.js',
                        'lib/**/*.js',
                        'test/**/*.js',
                        'index.js'
                    ]
                }
            }
        },

        // ## //

        jshint: {
            options : {
                jshintrc: true
            },
            all: {
                files: {
                    src: [
                        'Gruntfile.js',
                        'lib/**/*.js',
                        'test/**/*.js',
                        'index.js'
                    ]
                }
            }
        }
    });

    grunt.registerTask('default', [
        'test'
    ]);

    grunt.registerTask('test', [
        'jscs:all',
        'jshint:all'
    ]);
};
