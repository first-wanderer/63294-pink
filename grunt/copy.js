module.exports = function(grunt) {

  grunt.config('copy', {
    gosha: {
      files: [{
        expand: true,
        src: [
          '*.html',
          'css/**',
          'img/**',
          'js/**'
        ],
        dest: 'gosha'
      }]
    },
    build: {
      files: [{
        expand: true,
        cwd: 'source',
        src: [
        'img/**',
        'js/script.js',
        '*.html'
        ],
        dest: 'build'
      }]
    },
    watchhtml: {
      files: [{
        expand: true,
        cwd: 'source',
        src: ['*.html'],
        dest: 'build'
      }]
    },
    watchscript: {
      files: [{
        expand: true,
        cwd: 'source',
        src: ['js/script.js'],
        dest: 'build'
      }]
    }
  });

};
