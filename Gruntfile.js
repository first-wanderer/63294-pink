module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),   

    sass: {
      style: {
        files: {
          'css/style.css': 'sass/style.scss'
        }
      }
    },

    lintspaces: {
      test: {
        src: [
          '*.html',
          'js/*.js',
          'less/*.less',
          'sass/*.sass'
        ],
        options: {
          editorconfig: '.editorconfig'
        }
      }
    },

    githooks: {
      test: {
        'pre-commit': 'lintspaces:test',
      }
    }
  });

  grunt.loadTasks('grunt');

  grunt.registerTask('test', ['lintspaces:test']);
  grunt.registerTask('bower-install', [ 'bower-install-simple' ]);
  grunt.registerTask('build', [    
    'clean:build',
    'copy:build',
    'less',
    'autoprefixer',
    'cmq',
    'cssmin',
    'imagemin',
    'svginject',
    'concat',
    'uglify:libs',
    'uglify:script'
  ]);
  grunt.registerTask('combing', [    
    'csscomb',
    'jshint',
    'jscs'
  ]);

  if (grunt.file.exists(__dirname, 'less', 'style.less')) {
    grunt.registerTask('gosha', ['less:style', 'copy:gosha', 'clean:gosha']);
  } else if (grunt.file.exists(__dirname, 'sass', 'style.scss')) {
    grunt.registerTask('gosha', ['sass:style', 'copy:gosha', 'clean:gosha']);
  } else {
    grunt.registerTask('gosha', ['copy:gosha', 'clean:gosha']);
  }
};
