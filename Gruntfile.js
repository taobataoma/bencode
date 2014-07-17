/*
 * gpageinsights
 * https://github.com/Weborrent/bencode
 *
 * Copyright (c) 2014 Weborrent
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({            

    mocha_istanbul:{
      coverage : {
        src : 'tests/node', // the folder, not the files
        options : {
          mask : '*test.js',
          timeout : 30000,
          reporter : 'spec',
          coverageFolder : 'tests/node/coverage',
          check : {
            lines : 70,
            statements : 70
          }
        }
      },
      coveralls : {
        src : 'tests/node', // the folder, not the files
        options : {
          mask : '*test.js',
          timeout : 30000,
          reporter : 'spec',
          coverage : true,
          coverageFolder : 'tests/node/coverage',
          check : {
            lines : 70,
            statements : 70
          }
        }
      }    
    }  
  });
  
  grunt.event.on('coverage', function(lcov, done) {
	  if(process.env.TRAVIS_PULL_REQUEST === false || 
			  process.env.TRAVIS_PULL_REQUEST === 'false'){
		  return done();
	  }
    require('coveralls').handleInput(lcov, function(err) {
      if (err) {
        return done(err);
      }
      done();
    });
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-mocha-istanbul');
  
  grunt.registerTask('testCoveralls', ['mocha_istanbul:coveralls']);
  // To run unit with coverage report
  grunt.registerTask('testCoverage', ['mocha_istanbul:coverage' ]);

  grunt.registerTask('default', testCoverage);
  //grunt.option('force', true);

};
