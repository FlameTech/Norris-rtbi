/**
 * name : rgbToHex.js
 * Location : /norris/test/app/services/ColorsSvc/
 * 
 * History :
 * Version       Date           Programmer 
 * =================================================
 *  0.0.1     2015/05/13       Andrea Faggin
 * -------------------------------------------------
 *  Codifica modulo
 * =================================================
 */

'use strict';

describe('TU81 - ColorsSvc.rgbToHex()', function() {
  
  var ColorsSvc;
  
  var red = 200;
  var green = 100;
  var blue = 8;
  
  beforeEach(angular.mock.module('Services'));
  
  beforeEach(inject(function (_ColorsSvc_) {
    ColorsSvc = _ColorsSvc_;  
  }));
  
  it('Should start with #', function () {
    var value = ColorsSvc.rgbToHex(red,green,blue);
    expect(value).toBeDefined();
    expect(value).toStartWith("#");
  });
  
  it('Should convert red to HEX', function () {
    var value = ColorsSvc.rgbToHex(red,green,blue);
    expect(value.substr(1,2)).toEqual('c8');
  });
  
  it('Should convert green to HEX', function () {
    var value = ColorsSvc.rgbToHex(red,green,blue);
    expect(value.substr(3,2)).toEqual('64');
  });
  
  it('Should convert blue to HEX', function () {
    var value = ColorsSvc.rgbToHex(red,green,blue);
    expect(value.substr(5,2)).toEqual('08');
  });
  
  it('Should return HEX color', function () {
    var value = ColorsSvc.rgbToHex(red,green,blue);
    expect(value).toEqual('#c86408');
  });
});
