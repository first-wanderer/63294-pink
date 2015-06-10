module.exports = function(grunt) {

  grunt.config('less', {
    style: {
      files: {
        'build/css/style.css': ['source/less/style.less']
      }
    }
  });

};
