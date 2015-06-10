module.exports = function(grunt) {

  grunt.config('concat', {
    dist: {
      src: [
        'source/js/SVGinject.js',
        'bower_components/picturefill/dist/picturefill.min.js',
        'bower_components/mustache.js/mustache.min.js',
        'bower_components/moment/min/moment.min.js',
      ],
      dest: 'build/js/libs.js',
    }
  });

};
