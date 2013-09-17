module.exports = function(grunt) {

  // Load all Grunt tasks automatically
  // but avoid grunt-template-* ones
  require('matchdep').filterDev('grunt-!(template)').forEach(grunt.loadNpmTasks);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    bower: {
      target: {
        rjsConfig: 'build/dev/requirejs-config.js'
      },
      options: {
        baseUrl: 'build/dev/js'
      }
    },

    copy: {
      dev: {
        files: [
          { expand: true, cwd: 'src/config/', src: ['requirejs-config.js'], dest: 'build/dev/' },
          { expand: true, cwd: 'src/js/', src: ['**/*.js'], dest: 'build/dev/js/' },
          { expand: true, cwd: 'src/html/', src: ['**/*.html'], dest: 'build/dev/' }
        ]
      }
    },

    uglify: {
      requirejs: {
        files: {
          'prod/js/lib/require.js': ['src/js/lib/require.js']
        }
      }
    },

    // Parse CSS and add vendor prefixes to CSS rules using
    // values from the Can I Use database.
    autoprefixer: {
      dev: {
        files: {
          'build/dev/css/main.css': 'build/dev/css/main.css'
        }
      },
      prod: {
        files: {
          'build/prod/css/main.css': 'src/css/main.css'
        }
      }
    },

    requirejs: {
      compile: {
        options: {
          name: 'main',
          baseUrl: 'src/js/',
          mainConfigFile: 'src/js/main.js',
          out: 'build/prod/js/main.js'
        }
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        ignores: ['src/js/lib/**/*.js']
      },
      grunt: ['./Gruntfile.js'],
      src: ['src/js/**/*.js']
    },

    connect: {
      test : {
        port : 8000
      }
    },

    jasmine: {
      test: {
        src: 'build/dev/js/**/*.js',
        options: {
          specs: 'test/spec/*Spec.js',
          helpers: 'test/spec/*Helper.js',
          host: 'http://127.0.0.1:8000/',
          keepRunner: false,
          template: require('grunt-template-jasmine-requirejs'),
          templateOptions: {
            version: 'bower_components/requirejs/require.js',
            requireConfigFile: 'build/dev/requirejs-config.js',
            requireConfig: {
              baseUrl: 'build/dev/js'
            }
          }
        }
      }
    },

    watch: {
      options: {
        // Trigger a live reload when watch targets are triggered. Requires
        // a script tag in your HTML.
        // https://github.com/gruntjs/grunt-contrib-watch#enabling-live-reload-in-your-html
        livereload: true
      },

      html: {
        files: ['src/html/**/*'],
        tasks: ['copy:dev']
      },

      // TODO: Is there a better way to prevent multiple triggerings of the
      // watch when you process & overwrite a file than to use a debounceDelay?
      dev_autoprefix: {
        files: ['build/dev/css/**/*.css'],
        tasks: ['autoprefixer:dev'],
        options: {
          debounceDelay: 1000
        }
      },

      prod_autoprefix: {
        files: ['build/prod/css/**/*.css'],
        tasks: ['autoprefixer:prod'],
        options: {
          debounceDelay: 1000
        }
      },

      js: {
        files: ['src/js/**/*.js'],
        tasks: ['jshint']
      }
    }   

  });

  // Default task(s).
  grunt.registerTask('default', ['copy:dev', 'jshint', 'bower', 'autoprefixer:dev', 'connect', 'jasmine']);

  //grunt.registerTask('server', ['connect:dev', 'watch']);
  //grunt.registerTask('prod-server', ['connect:prod', 'watch']);
  //grunt.registerTask('prod', ['copy:prod', 'uglify:requirejs', 'requirejs', 'sass_directory_import', 'sass:prod', 'autoprefixer:prod']);

};