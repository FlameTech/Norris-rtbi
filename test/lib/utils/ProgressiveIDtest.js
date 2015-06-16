/**
 * New node file
 */

'use strict';

var should = require('should');
var ProgressiveID = require('../../../lib/utils/ProgressiveID.js');
describe('TU32 - ProgressiveID', function (){
  it('Should return a progressive series if called multiple times', function (){
    var array = {};
    for(var i = 0; i < 5; i++)
      array[i] = ProgressiveID();
    array[0].should.be.exactly(0);
    array[1].should.be.exactly(1);
    array[2].should.be.exactly(2);
    array[3].should.be.exactly(3);
    array[4].should.be.exactly(4);
  });
});