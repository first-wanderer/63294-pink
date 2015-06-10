module.exports = function(grunt) {

  grunt.config('svgmin', {
    options: {
      plugins: [
        {
          removeViewBox: false
        }, {
          removeUselessStrokeAndFill: false
        }
      ]
    },
    dist: {
      files: [{
        expand: true,
        src: ['build/img/**/*.svg']
      }]
    }
  });

};
