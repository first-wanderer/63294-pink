module.exports = function(grunt) {

  grunt.config('autoprefixer', {
    options: {
      browsers: ['last 2 version', 'ie 10']
    },
    style: {
      src: 'build/css/style.css'
    }
  });

};
