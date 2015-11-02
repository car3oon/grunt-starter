module.exports = function(grunt) {
  grunt.initConfig({
    browserSync: {
      dev: {
        bsFiles: {
          src: [
            "css/*.css",
            "js/*.js",
            "*.html"
          ]
        },
        options: {
          open: false,
					server: {
						baseDir: "./"
	    			// index: "index.html"
					},
          reloadOnRestart: true,
          watchTask: true
        }
      }
    },
    copy: {
      production: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: "components/bootstrap-sass/assets/fonts/bootstrap",
            dest: "fonts/",
            src: [
              "*"
            ]
          },
          {
            expand: true,
            dot: true,
            cwd: "components/components-font-awesome/fonts",
            dest: "fonts/",
            src: [
              "*"
            ]
          }
        ]
      }
    },
    postcss: {
      options: {
        map: true,
        processors: [
					require('autoprefixer')({
						browsers: ['last 2 versions']
					}),
          require("csswring")
        ]
      },
      prod: {
        src: [
          "css/styles.css"
        ]
      }
    },
    sass: {
      options: {
        sourceMap: true,
        includePaths: ["components/"]
      },
      dist: {
        files: {
          "css/styles.css": "scss/styles.scss"
        }
      }
    },
    uglify: {
      options: {
        mangle: false,
        sourceMap: true
      },
      dev: {
        files: {
          "js/scripts.js": [
            "components/jquery/dist/jquery.js",
            "js_src/scripts.js"
          ]
        }
      }
    },
    watch: {
      options: {
        atBegin: true,
        interrupt: false,
        livereload: true,
        spawn: false
      },
      sass: {
        files: ["scss/**/*.scss"],
        tasks: ["sass", "postcss"]
      },
      uglify: {
        files: ["js_src/**/*.js"],
        tasks: ["uglify"]
      }
    }
  });

  require("load-grunt-tasks")(grunt);

  grunt.registerTask("build", ["copy", "sass", "postcss", "uglify"]);
  grunt.registerTask("default", ["browserSync", "watch"]);
};
