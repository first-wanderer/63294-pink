module.exports = function(grunt) {

  grunt.config('bower-install-simple', {
   options: {
      color: true,
      directory: 'bower_components'
    },
    'prod': {
      options: {
        production: true
      }
    },
    'dev': {
      options: {
        production: false
      }
    }
  });
 
};
