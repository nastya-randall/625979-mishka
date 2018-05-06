"use strict";

module.exports = function(grunt) {
  require("load-grunt-tasks")(grunt);

  grunt.initConfig({
    copy: {
      build: {
        files: [{
          expand: true,
          cwd: "source",
          src: [
            "fonts/**/*.{woff,woff2}",
            "img/**",
            "js/**",
            "*.html"
          ],
          dest: "build"
        }]
      }
    },

    clean: {
      build: ["build"]
    },

    sass: {
      style: {
        files: {
          "build/css/style.css": "source/sass/style.scss"
        }
      }
    },

    postcss: {
      style: {
        options: {
          processors: [
            require("autoprefixer")()
          ]
        },
        src: "build/css/*.css"
      }
    },

    csso: {
      style: {
        options: {
          report: "gzip"
        },
        files: {
          "build/css/style.min.css": ["build/css/style.css"]
        }
      }
    },

    svgstore: {
      options: {
        includeTitleElement: false
      },
      sprite: {
        files: {
          "build/img/sprite.svg": ["source/img/spr-*.svg"]
        }
      }
    },

    posthtml: {
      options: {
        use: [
          require("posthtml-include")()
        ]
      },
      html: {
        files: [{
          expand: true,
          src: ["source/*.html"],
          dest: "build"
        }]
      }
    },

    imagemin: {
      images: {
        options: {
          optimizationLevel: 3,
          progressive: true
        },
        files: [{
          expand: true,
          src: ["source/img/**/*.{png,jpg,svg}"]
        }]
      }
    },

    cwebp: {
      images: {
        options: {
          q:90
        },
        files: [{
          expand: true,
          src: ["source/img/**/*.{png,jpg}"]
        }]
      }
    },

    browserSync: {
      server: {
        bsFiles: {
          src: [
            "build/*.html",
            "build/css/*.css"
          ]
        },
        options: {
          server: "build/",
          watchTask: true,
          notify: false,
          open: true,
          cors: true,
          ui: false
        }
      }
    },

    watch: {
      html: {
        files: ["source/*.html"],
        tasks: ["posthtml"]
      },
      style: {
        files: ["source/sass/**/*.{scss,sass}"],
        tasks: ["sass", "postcss", "csso"]
      }
    }
  });

  grunt.registerTask("serve", ["browserSync", "watch"]);

  grunt.registerTask("build", [
    "clean",
    "copy",
    "sass",
    "postcss",
    "csso",
    "svgstore",
    "posthtml"
  ]);
};
