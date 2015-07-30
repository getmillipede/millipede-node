module.exports = function (grunt) {
    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    var config = {
        artifacts: process.env.CIRCLE_ARTIFACTS || 'reports',
        reports: process.env.CIRCLE_TEST_REPORTS || 'reports'
    };

    grunt.initConfig({
        c: config,

        // ## //

        jscs: {
            all: {
                files: {
                    src: [
                        'Gruntfile.js',
                        'bin/millipede',
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
                        'bin/millipede',
                        'lib/**/*.js',
                        'test/**/*.js',
                        'index.js'
                    ]
                }
            }
        },

        // ## //

        jsdoc : {
            dist : {
                src: [
                    'package.json',
                    'README.md',
                    'Gruntfile.js',
                    'bin/millipede',
                    'lib/**/*.js',
                    'test/**/*.js',
                    'index.js'
                ],
                options: {
                    destination: 'doc',
                    configure: 'jsdoc.conf.json'
                }
            }
        },

        // ## //

        mochaTest: {
            spec: {
                options: {
                    reporter: 'spec',
                    require: [
                        'test/bootstrap/node'
                    ]
                },
                src: [
                    'test/*.test.js'
                ]
            },

            junit: {
                options: {
                    reporter: 'mocha-jenkins-reporter',
                    reporterOptions: {
                        'junit_report_path': '<%= c.reports %>/unit/junit.xml'
                    },
                    require: [
                        'test/bootstrap/node'
                    ]
                },
                src: [
                    'test/*.test.js'
                ]
            },

            coverage: {
                options: {
                    reporter: 'mocha-lcov-reporter',
                    quiet: true,
                    captureFile: '<%= c.artifacts %>/coverage.lcov'
                },
                src: ['test/**/*.js']
            }
        }

    });

    grunt.registerTask('default', [
        'test'
    ]);

    grunt.registerTask('test', [
        'jscs:all',
        'jshint:all',
        'mochaTest:spec',
        'mochaTest:coverage'
    ]);

    grunt.registerTask('ci', [
        'jscs:all',
        'jshint:all',
        'mochaTest:junit',
        'mochaTest:coverage'
    ]);
};
