/**
 * name : updateMovie.js
 * Location : /norris/test/app/services/MapSvc/
 * 
 * History :      
 * Version       Date           Programmer 
 * =================================================
 *  0.0.1     2015/05/13       Merlo Gianluca
 * -------------------------------------------------
 *  Codifica modulo
 * =================================================
 */

'use strict';

describe('TU77 - MapSvc.updateMovie()', function() {
  
  var MapSvc; 
  
  var point = {id: "test", latitude: 34.397, longitude: 150.644};
  var markers = {};
  var data = { type: "movie"
             , newPoints: [{latitude: 45.747905, longitude: 11.913599, id: "test"},
                           {latitude: 45.947905, longitude: 11.913599, id: "aaa"},
                           {latitude: 45.347905, longitude: 11.913599, id: "fggf"},                    
                           {latitude: 46.147905, longitude: 11.913599, id: "xxf"}]
             };
  var data2 = { type: "movie"
              , newPoints: [{latitude: 45.747905, longitude: 11.913599, id: "vvvvv"},
                            {latitude: 45.947905, longitude: 11.913599, id: "aaa"},
                            {latitude: 45.347905, longitude: 11.913599, id: "fggf"},                    
                            {latitude: 46.147905, longitude: 11.913599, id: "xxf"}]
              };
  
  var mapOptions = {
      center: { lat: -34.397, lng: 150.644},
      zoom: 8
    };

  var dummyElement = document.createElement('div');
  var map;

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
    map = new google.maps.Map(dummyElement, mapOptions);
    var x = point.id;
    markers.x = MapSvc.createMarker(point, map);
  });
  
  it('Should update the map', function () {
    MapSvc.updateMovie(markers, data, map);
    expect(markers).toBeDefined();
  });
  
  it('Should remove the existing markers', function () {
    MapSvc.updateMovie(markers, data2, map);
    expect(markers).toBeDefined();
  });
});
