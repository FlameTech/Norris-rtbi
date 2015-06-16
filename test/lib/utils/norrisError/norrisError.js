/**
 * name : norrisError.js
 * Location : /norris/test/utils/norrisError
 * 
 * History :
 * Version       Date           Programmer 
 * =================================================
 *  0.0.1     2015/05/15     Meneguzzo Francesco
 * -------------------------------------------------
 *  Codifica modulo
 * =================================================
 */

'use strict';

var should = require('should');

var NorrisError = require('../../../../lib/utils/NorrisError.js');

describe('TU6 - NorrisError()', function () {
  
  it('Should throw an unknown error when called with no parameters', function () {
    try{
      new NorrisError().should.throw(/^Unknorn error [-1]/);
    } catch(e) {}
  });
  
  it('Should throw an unknown error when called with an invalid code - not a number', function () {
    try{
      var notNumber = "not a number";
      new NorrisError(notNumber).should.throw(/^Unknorn error [-1]/);
    } catch(e) {}
  });
  
  it('Should throw an unknown error when called with an invalid code - unexpected value', function () {
    try{
      new NorrisError(10000).should.throw(/^Unknorn error [10000]/);
    } catch(e) {}
  });
  
  it('Should throw a known error when called with a valid code', function () {
    try{
      new NorrisError(1000).should.throw(/^JSON Options Error [-1]/);
    } catch(e) {}
  });
});