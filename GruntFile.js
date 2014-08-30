module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        bower: {
            install: {}
        },

        browserify: {
            build: {
                src: 'src/javascript/main.js',
                dest: 'temp/javascript/main.js'
            }
        },

        csslint: {
            options: {
                csslintrc: '.csslintrc'
            },
            build: {
                options: {
                    import: 2
                },
                src: ['temp/style/main.css']
            }
        },

        cssmin: {
            build: {
                src: 'temp/style/main.css',
                dest: 'build/style/main.min.css'
            }
        },

        jshint: {
            build: ['src/javascript/main.js']
        },

        less: {
            build: {
                options: {
                    paths: ['src/less'],
                    cleancss: false
                },
                files: {
                    'temp/style/main.css': 'src/less/layout.less'
                }
            }
        },

        uglify: {
            build: {
                files: {
                    'build/javascript/main.min.js': ['temp/javascript/main.js']
                }
            }
        },

        watch: {
            files: [
                'src/less/*.less',
                'src/javascript/*.js'
            ],
            tasks: [
                'less:build',
                'cssmin:build',
                'browserify:build',
                'jshint:build',
                'uglify:build'
            ]
        }
    });

    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', [
        'bower:install',
        'less:build',
        'csslint:build',
        'cssmin:build',
        'browserify:build',
        'jshint:build',
        'uglify:build'
    ]);
};