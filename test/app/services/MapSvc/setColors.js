/**
 * name : setColors.js
 * Location : /norris/test/app/services/MapSvc/
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

describe('TU81 - MapSvc.setColors()', function() {
  
  var MapSvc;
  
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
  
  beforeEach(inject(function (_MapSvc_) {
    MapSvc = _MapSvc_;  
  }));
  
  
  it('Should return colors data', function () {
    var value = MapSvc.setColors(colors);
    expect(value).toBeDefined();
  });
  
  it('Should correctly return colors in HEX format', function() {
    var value = MapSvc.setColors(colors);
    expect(value[0]).toBe("#FFFFFF");
    expect(value[1]).toBe("#FFFFFF");
    expect(value[3]).not.toBeDefined();
  });
  
});
