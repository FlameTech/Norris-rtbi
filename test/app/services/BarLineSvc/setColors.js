/**
 * name : setColors.js
 * Location : /norris/test/app/services/BarLineSvc/
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

describe('TU79 - BarLineSvc.setColors()', function() {
  
  var BarLineSvc;
  
  var colors = [{red:0,green:0,blue:0},{red:0,green:0,blue:0},{red:0,green:0,blue:0}];
  
  beforeEach(angular.mock.module('Services'));
  
  beforeEach(function () {
    var colorsMock = { 
        rgbToHex: function (r,g,b) {
            return "#FFFFFF";
        }
    };
    angular.mock.module(function ($provide) { 
        $provide.value('ColorsSvc', colorsMock);
    });
  });
  
  beforeEach(inject(function (_BarLineSvc_) {
    BarLineSvc = _BarLineSvc_;  
  }));
  
  
  it('Should return colors data', function () {
    var value = BarLineSvc.setColors(colors);
    expect(value).toBeDefined();
  });
  
  it('Should correctly return colors in HEX format', function() {
    var value = BarLineSvc.setColors(colors);
    expect(value[0]).toBe("#FFFFFF");
    expect(value[1]).toBe("#FFFFFF");
    expect(value[3]).not.toBeDefined();
  });
  
});
