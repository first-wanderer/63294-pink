module.exports = function(grunt) {

  grunt.config('csscomb', {
    options: {
      config: 'csscomb.json'
    },
    style: {
      expand: true,
      src: ['source/less/**/*.less']
    }
  });

};
