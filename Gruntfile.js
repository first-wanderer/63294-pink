module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    less: {
      style: {
        files: {
          'css/style.css': 'less/style.less'
        }
      }
    },

    csscomb: {
      options: {
         config: 'csscomb.json'
      },
      style: {
        expand: true,
        src: ["less/**/*.less"]
      }
    },

    autoprefixer: {    
      options: {
        browsers: ['last 2 version', 'ie 10']
      },
      style: {
        src: 'css/style.css'
      }
    },

    cmq: {
      style: {
        files: {
          'css/style.css': ['css/style.css']
        }
      }
    },

    cssmin: {    
      style: {
        options: {
          keepSpecialComments: 0,
          report: 'gzip'
        },      
        files: {
          'css/style.min.css': ['css/style.css']
        }
      }
    },

    imagemin: {
      images: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          src: ["img/**/*.{png,jpg,gif,svg}"]
        }]
      }
    },

    htmlmin: {      
      options: {
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        caseSensitive: true,
        keepClosingSlash: false
      },
      html: {
        files: {
        "index.min.html": "index.html"
        }
      }
    }

    sass: {
      style: {
        files: {
          'css/style.css': 'sass/style.scss'
        }
      }
    },

    lintspaces: {
      test: {
        src: [
          '*.html',
          'js/*.js',
          'less/*.less',
          'sass/*.sass'
        ],
        options: {
          editorconfig: '.editorconfig'
        }
      }
    },

    githooks: {
      test: {
        'pre-commit': 'lintspaces:test',
      }
    },

    copy: {
      gosha: {
        files: [{
          expand: true,
          src: [
            '*.html',
            'css/**',
            'img/**',
            'js/**'
          ],
          dest: 'gosha',
        }]
      }
    },

    svginject: {
      all : {
        options: {},
        files: {
           'js/SVGinject.js': ['img/use-svg/*.svg'],
        }
      }
    },

    'bower-install-simple': {
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
    },

    clean: {
      gosha: [
        'gosha/img/README',
        'gosha/js/README'
      ]
    }
  });

  grunt.registerTask('test', ['lintspaces:test']);
  grunt.registerTask('bower-install', [ 'bower-install-simple' ]);

  grunt.registerTask('build', [
    'less',
    'autoprefixer',
    'cmq',
    'cssmin'
  ]);

  if (grunt.file.exists(__dirname, 'less', 'style.less')) {
    grunt.registerTask('gosha', ['less:style', 'copy:gosha', 'clean:gosha']);
  } else if (grunt.file.exists(__dirname, 'sass', 'style.scss')) {
    grunt.registerTask('gosha', ['sass:style', 'copy:gosha', 'clean:gosha']);
  } else {
    grunt.registerTask('gosha', ['copy:gosha', 'clean:gosha']);
  }
};
