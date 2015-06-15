module.exports = function(grunt) {
  //initialize configuration object
  grunt.initConfig({ pkg: grunt.file.readJSON('package.json')
                   , jshint: { files: ['lib/**/*.js']
                             , options: { laxcomma: true // options here to override JSHint defaults
                                        , laxbreak: true
                                        , node: true
                                        , globals: { console: true
                                                   , module: true
                                                   , document: true
                                                   }
                                        }
                             }
                   , mochaTest: { test: { options: { reporter: 'spec'
                                                   , captureFile: 'mochaResult.txt' // Optionally capture the reporter output to a file
                                                   , quiet: false // Optionally suppress output to standard out (defaults to false)
                                                   , clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false)
                                                   }
                                        , src: ['test/lib/**/*.js']
                                        } 
                                }
                   , mocha_istanbul: { target: { src: ['test/lib/**/*.js']
                                               , options: { coverage: true
                                                          , dryRun: false
                                                          // , root: './test'
                                                          // , root: './tasks'
                                                          , print: 'detail'
                                                          , check: { lines: 1 }
                                                          //, mochaOptions: ['--bail','--debug-brk']
                                                          , istanbulOptions: ['--default-excludes']
                                                          , reporter: 'spec'
                                                          , reportFormats: ['html']
                                                          }
                                                }
                                     }
                   });
  
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-mocha-istanbul');
  
  //this would be run by typing "grunt test" on the command line
  //grunt.registerTask('test', ['mochaTest']);
  
  //the default task can be run just by typing "grunt" on the command line

  grunt.registerTask('default', ['mocha_istanbul']);
  grunt.registerTask('mocha2file', ['mochaTest']);
  grunt.registerTask('runJShint', ['jshint']);
  
};