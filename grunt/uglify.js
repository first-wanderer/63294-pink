module.exports = function(grunt) {

  grunt.config('uglify', {
   libs: {
      src: 'build/js/libs.js',
      dest: 'build/js/libs.min.js'
    },
    script: {
      src: 'build/js/script.js',
      dest: 'build/js/script.min.js'
    }
  });
 
};
