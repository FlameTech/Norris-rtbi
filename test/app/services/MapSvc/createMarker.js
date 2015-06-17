/**
 * name : createMarker.js
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

describe('TU73 - MapSvc.createMarker()', function() {
  
  var MapSvc; 
  
  var point = {id: "test", latitude: 34.397, longitude: 150.644};
  
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
  
  it('Should create a marker', function () {
    var value = MapSvc.createMarker(point, map);
    expect(value).toBeDefined();
  }); 
  
  it('Should correctly set position', function () {
    var value = MapSvc.createMarker(point, map);
    expect(value.position).toBeDefined();
    expect(value.position.A).toBe(34.397);
    expect(value.position.F).toBe(150.644);
  });
  
  it('Should correctly set marker ID', function () {
    var value = MapSvc.createMarker(point, map);
    expect(value.title).toBeDefined();
    expect(value.title).toEqual("test");
  });
  
});
