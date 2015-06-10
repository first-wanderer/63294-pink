module.exports = function(grunt) {

  grunt.config('jscs', {
    src: ['Gruntfile.js', 'grunt/**/*.js', 'sourse/js/script.js'],
    options: {
      preset: 'google',
      requireCurlyBraces: ['if']
    }
  });

};
