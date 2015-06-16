/**
 * name : colorGeneratorTest.js
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

var colorGenerator = require('../../../../lib/utils/ColorManager.js').colorGenerator;

describe('TU39 - colorManager.colorGenerator(num)', function () {
  
  it('Should execute correctly when return an array with num colors', function () {
    var colors = colorGenerator(97);
    colors.length.should.be.exactly(97);
  });
});