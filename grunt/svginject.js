module.exports = function(grunt) {

  grunt.config('svginject', {
    all : {
      options: {},
      files: {
        'source/js/SVGinject.js': ['build/img/use-svg/*.svg'],
      }
    }
  });

};
