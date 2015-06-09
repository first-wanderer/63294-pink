module.exports = function(grunt) {

  grunt.config('jscs', {
    src: 'source/js/script.js',
    options: {
      preset: 'google',        
      requireCurlyBraces: [ 'if' ]
    }
  });
 
};
