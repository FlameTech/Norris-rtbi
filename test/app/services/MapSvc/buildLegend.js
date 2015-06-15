/**
 * name : buildLegend.js
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

describe('TU75 - MapSvc.buildLegend()', function() {
  
  var MapSvc; 
  
  var position = "top-left";
  var position2 = "top-right";
  var position3 = "bottom-left";
  var position4 = "bottom-right";
  var id = 1;
  
  var dummyLegenDiv = document.createElement('div');
  dummyLegenDiv.innerHTML = "test";
  dummyLegenDiv.setAttribute("id", "mapLegend1");
  document.body.appendChild(dummyLegenDiv);

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
  });
  
  it('Should put the legend in the correct place, top-left', function () {
    MapSvc.buildLegend(map, position, id);
    expect(map.controls[google.maps.ControlPosition.TOP_LEFT].j[0]).toEqual(dummyLegenDiv);
  });
  
  it('Should put the legend in the correct place, top-right', function () {
    MapSvc.buildLegend(map, position2, id);
    expect(map.controls[google.maps.ControlPosition.TOP_RIGHT].j[0]).toEqual(dummyLegenDiv);
  });
  
  it('Should put the legend in the correct place, bottom-left', function () {
    MapSvc.buildLegend(map, position3, id);
    expect(map.controls[google.maps.ControlPosition.BOTTOM_LEFT].j[0]).toEqual(dummyLegenDiv);
  });
  
  it('Should put the legend in the correct place, bottom-right', function () {
    MapSvc.buildLegend(map, position4, id);
    expect(map.controls[google.maps.ControlPosition.BOTTOM_RIGHT].j[0]).toEqual(dummyLegenDiv);
  });
  
  it('Should put the correct legend', function () {
    MapSvc.buildLegend(map, position, 3);
    expect(map.controls[google.maps.ControlPosition.TOP_LEFT].j[0]).not.toEqual(dummyLegenDiv);
  });
  
});
