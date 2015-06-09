module.exports = function(grunt) {

  grunt.config('jshint', {
    options: {
      reporter: require('jshint-stylish')
    },    
    all: ['Gruntfile.js', 'grunt/**/*.js', 'sourse/js/script.js']    
  });
 
};
