/**
 * name : buildPath.js
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

describe('TU74 - MapSvc.buildPath()', function() {
  
  var MapSvc; 
  
  var path = [[45.392378, 11.863538],[45.425850, 11.949263]];
  var path2 = [[37.774994, -122.419496], [37.630848, -122.412078]]
  var color = "#FFFFFF";
  var polylines = [];
  var method1 = "driving";
  var method2 = "walking";
  var method3 = "bicycling";
  var method4 = "transit";

  var mapOptions = {
      center: { lat: -34.397, lng: 150.644},
      zoom: 8
    };
    
  var dummyElement = document.createElement('div');
  var map = new google.maps.Map(dummyElement, mapOptions);

  var flag = false;
  
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
  
  beforeEach(function() {
    polylines = [];
    flag = false;
  });
  
  it('Should create a new driving pathline', function(done) {
    MapSvc.buildPath(path, color, map, polylines, method1);
    setTimeout(function() {
      if(polylines.length!=0)
        flag = true;
      expect(flag).toBe(true);
      done();
      }, 6000);
  }, 10000);
  
  it('Should create a new walking pathline', function(done) {
    MapSvc.buildPath(path, color, map, polylines, method2);
    setTimeout(function() {
      if(polylines.length!=0)
        flag = true;
      expect(flag).toBe(true);
      done();
      }, 6000);
  }, 10000);
  
  it('Should create a new bicycling pathline', function(done) {
    MapSvc.buildPath(path2, color, map, polylines, method3);
    setTimeout(function() {
      if(polylines.length!=0)
        flag = true;
      expect(flag).toBe(true);
      done();
      }, 6000);
  }, 10000);
  
  it('Should create a new transit pathline', function(done) {
    MapSvc.buildPath(path, color, map, polylines, method4);
    setTimeout(function() {
      if(polylines.length!=0)
        flag = true;
      expect(flag).toBe(true);
      done();
      }, 6000);
  }, 10000);
});