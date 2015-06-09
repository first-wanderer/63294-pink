module.exports = function(grunt) {

  grunt.config('imagemin', {
    images: {
      options: {
        optimizationLevel: 3
      },
      files: [{
        expand: true,
        src: ['build/img/**/*.{png,jpg,gif,svg}']
      }]
    }
  });
 
};
