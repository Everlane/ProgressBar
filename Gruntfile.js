module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'dist/<%= pkg.name %>.js',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    babel: {
      options: {
        sourceMap: false,
        modules: 'umd',
        moduleId: 'ProgressBar'
      },
      dist: {
        files: {
          'dist/progress-bar.js': 'src/progress-bar.js'
        }
      }
    },
    watch: {
      files: ['src/progress-bar.js'],
      tasks: ['default']
    },
    coffee: {
      compile: {
        options: {
          bare: true
        },
        files: {
          'src/progress-bar.js': 'src/progress-bar.coffee'
        }
      }
    }
  });

  grunt.registerTask('default', ['babel', 'uglify']);

};