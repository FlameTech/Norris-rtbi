/**
 * name : createPolyline.js
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

describe('TU72 - MapSvc.createPolyline()', function() {
  
  var MapSvc; 
  
  var pathLine = [{lat:0.000, lng:0.000},{lat:34.000,lng:36.000}];
  var color = "#FFFFFF";
  var mapOptions = {
      center: { lat: -34.397, lng: 150.644},
      zoom: 8
    };
  
  var dummyElement = document.createElement('div');
  
  var map = new google.maps.Map(dummyElement, mapOptions);
  
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
  
  it('Should create a path', function () {
    var value = MapSvc.createPolyline(pathLine, color, map);
    expect(value).toBeDefined();
    expect(value.getPath()).toBeDefined();
    expect(value.getPath().j[1].A).toBe(34);
    expect(value.getPath().j[1].F).toBe(36);
  }); 
  
  it('Should set path color', function () {
    var value = MapSvc.createPolyline(pathLine, color, map);
    expect(value).toBeDefined();
    expect(value.strokeColor).toEqual('#FFFFFF');
  }); 
  
});
