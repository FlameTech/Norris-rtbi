/**
 * name : updateInPlace.js
 * Location : /norris/test/presentationLayer/mapChart
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

var proxyquire = require('proxyquire');
var should = require('should');

var updateCheck = undefined;

var stub = {
  '../businessLayer/MapChartController.js': {
    updateInPlace: function(id, point, latitude, longitude) {
      updateCheck = {};
      updateCheck.id = id;
      updateCheck.point = point;
      updateCheck.latitude = latitude;
      updateCheck.longitude = longitude;
    },
    createMapChart: function() { return 2; }
  }
}

var mapChart = proxyquire('../../../../lib/presentationLayer/MapChart.js', stub);

describe('TU11 - mapChart.updateInPlace()', function() {
  
  it('Should execute correctly when called with any parameter', function() {
    var graph = new mapChart();
    graph.updateInPlace("point", "latitude", "longitude");
    should.exist(updateCheck);
    updateCheck.id.should.be.exactly(2);
    updateCheck.point.should.be.exactly("point");
    updateCheck.latitude.should.be.exactly("latitude");
    updateCheck.longitude.should.be.exactly("longitude");
  });
});