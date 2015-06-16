/**
 * name : hexColorParse.js
 * Location : /norris/test/utils/colorManager
 * 
 * History :
 * Version       Date           Programmer 
 * =================================================
 *  0.0.1     2015/05/13     Meneguzzo Francesco
 * -------------------------------------------------
 *  Codifica modulo
 * =================================================
 */

'use strict';

var should = require('should');

var colorManager = require('../../../../lib/utils/ColorManager.js');

describe('TU88 - colorManager.colorGenerator(num)', function () {
  
  it('Should return an empty object when called with a parameter which is not a string', function () {
    var parsedColor = colorManager.hexColorParse(["not a string"]);
    parsedColor.should.be.empty;
  });
  
  it('Should return an emtpy object when called with a wrong string', function() {
    var parsedColor = colorManager.hexColorParse("not an hexadecimal color string");
    parsedColor.should.be.empty;
  });
  
  it('Should return an RGB color when called with a valid string starting with #', function() {
    var parsedColor = colorManager.hexColorParse("#FFFFFF");
    parsedColor.red.should.be.exactly(255);
    parsedColor.green.should.be.exactly(255);
    parsedColor.blue.should.be.exactly(255);
  });
  
  it('Should return an RGB color when called with a valid string not starting with #', function() {
    var parsedColor = colorManager.hexColorParse("FFFFFF");
    parsedColor.red.should.be.exactly(255);
    parsedColor.green.should.be.exactly(255);
    parsedColor.blue.should.be.exactly(255);
  });
});