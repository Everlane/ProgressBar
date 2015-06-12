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
          'dist/<%= pkg.name %>.js': 'build/<%= pkg.name %>.js'
        }
      }
    },
    watch: {
      files: ['src/<%= pkg.name %>.coffee'],
      tasks: ['default']
    },
    coffee: {
      compile: {
        options: {
          bare: true
        },
        files: {
          'build/<%= pkg.name %>.js': 'src/<%= pkg.name %>.coffee'
        }
      }
    }
  });

  grunt.registerTask('default', ['coffee', 'babel', 'uglify']);

};